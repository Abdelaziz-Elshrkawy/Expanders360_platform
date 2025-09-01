import { Reflector } from '@nestjs/core';
import { RolesE } from 'src/types/enums';

export const Role = Reflector.createDecorator<RolesE[]>();
