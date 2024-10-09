import { Controller, Get } from '@nestjs/common'
import { 
  HealthCheckService,
  // HttpHealthIndicator,
  // DiskHealthIndicator,
  // MemoryHealthIndicator,
  MongooseHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus'
import { RunningHealthIndicator } from "./running.health";

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    // private readonly http: HttpHealthIndicator,
    // private readonly disk: DiskHealthIndicator,
    // private readonly memory: MemoryHealthIndicator,
    private readonly mongo: MongooseHealthIndicator,
    private readonly running: RunningHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),                 // http健康检查
      // () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),       // 磁盘健康检查
      // () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),                       // 内存健康检查
      // () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),                         // 内存健康检查
      () => this.mongo.pingCheck('mongodb'),                                               // MongoDB健康检查
      () => this.running.isHealthy('running'),                                             // 运行状态健康检查
    ])
  }
}