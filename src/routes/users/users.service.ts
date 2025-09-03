import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/mysql/users.entity';
import { CreateUserDto, UserLoginDto } from 'src/dtos/users.dto';
import { PasswordService } from 'src/shared/services/password.service';
import { isEmailRegistered } from 'src/helpers/helpers';
import { JwtService } from '@nestjs/jwt';
import { Exceptions } from 'src/types/enums';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectSqlRepository(User)
    private usersRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserLoginDto): Promise<
    | {
        email: string;
        role: string;
        // institute_id: number;
        jwt: string;
      }
    | Error
  > {
    const currentUser = await isEmailRegistered(
      this.usersRepository,
      user.email,
    );

    if (
      currentUser &&
      currentUser.password !== null &&
      currentUser.password === user.password
      // (await this.passwordService.verifyPassword(
      //   currentUser.password as string,
      //   user.password,
      // ))
    ) {
      return {
        email: currentUser.email,
        role: currentUser.role,
        // institute_id: currentUser.institute_id,
        jwt: this.jwtService.sign({
          id: currentUser.id,
          email: currentUser.email,
          role: currentUser.role,
        }),
      };
    } else if (currentUser && currentUser.password === null) {
      throw new Error(Exceptions.User_Need_Signed_Up);
    } else {
      throw new Error(Exceptions.Not_Authorized);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await this.passwordService.createPassword(
      createUserDto.password,
    );
    const user = this.usersRepository.create({
      ...createUserDto,
      password: password,
    });
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User | null> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
