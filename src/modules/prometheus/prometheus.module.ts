import { Module } from '@nestjs/common'
import { PrometheusService } from './prometheus.service'
import { PrometheusController } from './prometheus.controller'

@Module({
  controllers: [PrometheusController],
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
