import { logger } from '@/common/log4js/log4js.config'
import { utilType } from "@/types/util"

declare global {
  var $: {
    logger: typeof logger
    util: typeof utilType
    MailTool
  }
}