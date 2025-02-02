import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { EnvironmentService } from '../service/environment.service'
import { CurrentUser } from '../../decorators/user.decorator'
import { CreateEnvironment } from '../dto/create.environment/create.environment'
import { User } from '@prisma/client'
import { AdminGuard } from '../../auth/guard/admin.guard'
import { UpdateEnvironment } from '../dto/update.environment/update.environment'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Environment Controller')
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Post(':projectId')
  async createEnvironment(
    @CurrentUser() user: User,
    @Body() dto: CreateEnvironment,
    @Param('projectId') projectId: string
  ) {
    return await this.environmentService.createEnvironment(user, dto, projectId)
  }

  @Put(':environmentId')
  async updateEnvironment(
    @CurrentUser() user: User,
    @Body() dto: UpdateEnvironment,
    @Param('environmentId') environmentId: string
  ) {
    return await this.environmentService.updateEnvironment(
      user,
      dto,
      environmentId
    )
  }

  @Get(':environmentId')
  async getEnvironment(
    @CurrentUser() user: User,
    @Param('environmentId') environmentId: string
  ) {
    return await this.environmentService.getEnvironment(user, environmentId)
  }

  @Get(':projectId')
  async getEnvironmentsOfProject(
    @CurrentUser() user: User,
    @Param('projectId') projectId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
    @Query('order') order: string = 'asc',
    @Query('search') search: string = ''
  ) {
    return await this.environmentService.getEnvironmentsOfProject(
      user,
      projectId,
      page,
      limit,
      sort,
      order,
      search
    )
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAllEnvironments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'name',
    @Query('order') order: string = 'asc',
    @Query('search') search: string = ''
  ) {
    return await this.environmentService.getAllEnvironments(
      page,
      limit,
      sort,
      order,
      search
    )
  }

  @Delete(':environmentId')
  async deleteEnvironment(
    @CurrentUser() user: User,
    @Param('environmentId') environmentId: string
  ) {
    return await this.environmentService.deleteEnvironment(user, environmentId)
  }
}
