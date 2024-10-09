import { Injectable } from '@nestjs/common'
import { Histogram, Counter, Registry } from 'prom-client'

@Injectable()
export class PrometheusService {
  private readonly register: Registry
  private readonly httpRequestDuration: Histogram<string>
  private readonly httpRequestCount: Counter<string>

  constructor() {
    this.register = new Registry()

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      registers: [this.register],
    })

    this.httpRequestCount = new Counter({
      name: 'http_request_count',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
      registers: [this.register],
    })
  }

  getMetrics() {
    return this.register.metrics()
  }

  observeRequest(method: string, route: string, status: string, duration: number) {
    this.httpRequestDuration.observe({ method, route, status }, duration)
    this.httpRequestCount.inc({ method, route, status })
  }
}
