import { logger } from '@/common/log4js/log4js.config'
import * as util from "@/common/utils/util"
import { MailTool } from '@/common/utils/mail'

global.$ = {
  logger,
  util,
  MailTool
}

export {}