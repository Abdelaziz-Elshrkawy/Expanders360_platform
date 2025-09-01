import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { password_pepper, salt_rounds } from 'src/config/env';
@Injectable()
export class PasswordService {
  async createPassword(password: string) {
    return await hash(
      password + password_pepper,
      parseInt(salt_rounds as string),
    );
  }

  async verifyPassword(hashedPassword: string, requestPassword: string) {
    return await compare(requestPassword + password_pepper, hashedPassword);
  }
}
