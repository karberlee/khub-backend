import * as NodeCache from 'node-cache'
import * as axios from 'axios'
import { Log4jsService } from '@/common/utils/log4js.service'

declare global {
  var $: {
    logger: Log4jsService
    CodeCache: NodeCache
    axios
  }
}

global.$ = {
  logger: new Log4jsService(),
  CodeCache: new NodeCache( { stdTTL: 300, checkperiod: 600 } ),
  axios
}

export {}