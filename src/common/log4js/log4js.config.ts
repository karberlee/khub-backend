import * as log4js from 'log4js'
import * as path from 'path'

log4js.configure({
  appenders: {
    console: {
      type: 'console' // 将日志输出到控制台
    },
    file: {
      type: 'file', // 将日志输出到指定的文件
      filename: 'full.log'
    },
    dailyFile: {
      type: 'dateFile', // 将日志输出到按日期分割的文件
      filename: path.join(process.cwd(), 'logs/daily.log'), // log输出路径和基础文件名
      pattern: 'yyyy-MM-dd', // 按日期分割log文件，用于生成文件名的日期部分
      alwaysIncludePattern: true // 是否总是包括日期模式，即使日志文件没有变动
    }
  },
  categories: {
    default: { // 默认的日志类别，通常所有日志都使用这个类别
      appenders: ['console', 'dailyFile'], // 指定使用的 appender
      level: 'info' // 指定日志级别（如 info, warn, error）
    },
    onlyConsole: { // 特定的日志类别，可以有不同的 appender 和日志级别
      appenders: ['console'],
      level: 'info'
    }
  },
  levels: {
    TRACE: { value: 100, colour: 'cyan' },
    DEBUG: { value: 200, colour: 'blue' },
    INFO: { value: 300, colour: 'green' },
    WARN: { value: 400, colour: 'yellow' },
    ERROR: { value: 500, colour: 'red' },
    FATAL: { value: 600, colour: 'magenta' }
  }
})

export const logger = log4js.getLogger()