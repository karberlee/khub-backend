import { logger } from '@/common/log4js/log4js.config'
import { MailTool } from '@/common/utils/mail'
import * as NodeCache from 'node-cache'
import * as axios from 'axios'

global.$ = {
  logger,
  MailTool,
  CodeCache: new NodeCache( { stdTTL: 300, checkperiod: 600 } ),
  axios
}

export {}