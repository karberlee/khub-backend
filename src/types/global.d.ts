import { logger } from '@/common/log4js/log4js.config'

declare global {
  var $: {
    logger: typeof logger
  }
}