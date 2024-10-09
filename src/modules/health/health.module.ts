import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
// import { HttpModule } from '@nestjs/axios'
import { HealthController } from './health.controller'
import { RunningHealthIndicator } from './running.health'

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [RunningHealthIndicator],
})
export class HealthModule {}