import * as log4js from 'log4js'
import * as path from 'path'

log4js.configure({
  appenders: {
    console: {
      type: 'console' // 将日志输出到控制台
    },
    file: {
      type: 'file', // 将日志输出到指定的文件
      filename: 'full.log',
      maxLogSize: 10000000, // 最大日志大小，日志文件达到此大小后将会进行轮转
      backups: 5, // 指定保留的备份文件数量
      compress: true // 启用文件压缩，日志文件在轮转时将被压缩为 .gz 文件，以节省磁盘空间
    },
    dailyFile: {
      type: 'dateFile', // 将日志输出到按日期分割的文件
      filename: path.join(process.cwd(), 'logs/daily.log'), // log输出路径和基础文件名
      // maxLogSize: 10000000, // 最大日志大小，日志文件达到此大小后将会进行轮转
      // backups: 5, // 指定保留的备份文件数量
      pattern: 'yyyy-MM-dd', // 按日期分割log文件，用于生成文件名的日期部分
      alwaysIncludePattern: true, // 是否总是包括日期模式，即使日志文件没有变动
      numBackups: 5, // 保留的最大天数（注意：`daysToKeep` 是 Log4js 6.x 版本新增的属性，用于自动删除过期日志）
      compress: true // 启用文件压缩，日志文件在轮转时将被压缩为 .gz 文件，以节省磁盘空间
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