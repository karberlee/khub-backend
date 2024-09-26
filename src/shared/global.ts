import { logger } from '@/common/log4js/log4js.config'
import * as util from "@/common/utils/util"

global.$ = {
  logger,
  util
}

export {}