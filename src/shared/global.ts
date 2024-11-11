import { logger } from '@/common/log4js/log4js.config'
import * as util from "@/common/utils/util"
import { MailTool } from '@/common/utils/mail'
import * as NodeCache from 'node-cache'

global.$ = {
  logger,
  util,
  MailTool,
  CodeCache: new NodeCache( { stdTTL: 300, checkperiod: 600 } )
}

export {}