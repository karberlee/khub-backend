import { Injectable, NestMiddleware } from '@nestjs/common'
import { PrometheusService } from '@/modules/prometheus/prometheus.service'

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  constructor(private readonly prometheusService: PrometheusService) {}

  use(req: any, res: any, next: () => void) {
    const start = Date.now()
    
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000
      this.prometheusService.observeRequest(req.method, req.path, res.statusCode.toString(), duration)
    })

    next()
  }
}
