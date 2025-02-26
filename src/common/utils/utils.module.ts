import { Module, Global } from '@nestjs/common'
// import { HttpModule } from '@nestjs/axios'
// import { Log4jsService } from './log4js.service'
// import { JWTService } from './jwt.service'
import { UtilsService } from './utils.service'

@Global()
@Module({
  // imports: [HttpModule],
  providers: [
    // Log4jsService,
    // JWTService,
    UtilsService,
  ],
  exports: [
    // Log4jsService,
    // JWTService,
    UtilsService,
  ],
})
export class UtilsModule {}
