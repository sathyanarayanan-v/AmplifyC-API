import * as winston from 'winston';
import * as fs from 'fs';
const { combine } = winston.format;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logFormat = winston.format.printf((info) => {
  return JSON.stringify({
    [info.timeStamp]: {
      level: info.level,
      label: info.label,
      message: info.message,
    },
  });
});
const timeStamp = () => {
  const dateObj = new Date();

  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();
  const ss = dateObj.getSeconds();
  const ms = dateObj.getMilliseconds();
  return `${year}-${month <= 9 ? '0' : ''}${month}-${
    date <= 9 ? '0' : ''
  }${date} ${hh <= 9 ? '0' : ''}${hh}:${mm <= 9 ? '0' : ''}${mm}:${
    ss <= 9 ? '0' : ''
  }${ss}:${ms}`;
};
var logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: process.env.LOG_FILE_ABS_PATH,
      level: 'silly',
    }),
  ],
  format: combine(logFormat),
  exitOnError: false,
});
export const loggerInstance = {
  log: function (
    message,
    level?: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly',
    label?: string,
  ) {
    if (level) {
      logger.log(level, message, {
        timeStamp: timeStamp(),
        level,
        label: label || 'AppLogger',
      });
    } else {
      logger.log('info', message, {
        timeStamp: timeStamp(),
        level,
        label: label || 'AppLogger',
      });
    }
    return;
  },
};
