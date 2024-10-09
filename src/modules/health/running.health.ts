import { Injectable } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'

@Injectable()
export class RunningHealthIndicator extends HealthIndicator {
  private isRunning: boolean = true

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = this.isRunning
    const result = this.getStatus(key, isHealthy, { running_port: process.env.PORT })

    if (isHealthy) {
      return result
    }
    throw new HealthCheckError('Running check failed', result)
  }
}