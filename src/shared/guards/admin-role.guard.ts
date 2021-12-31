import { Injectable } from '@nestjs/common';
import { RoleGuard } from './role.guard';

@Injectable()
export class AdminRoleGuard extends RoleGuard {
  constructor() {
    super(['admin']);
  }
}
