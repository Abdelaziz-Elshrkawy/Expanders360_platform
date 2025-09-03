import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Role } from 'src/decorators/classes-methods/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesE } from 'src/types/enums';

@Role([RolesE.ADMIN, RolesE.CLIENT])
@UseGuards(AuthorizationGuard, RoleGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('top-vendors')
  async getTopVendors() {
    return this.analyticsService.getTopVendors();
  }
}
