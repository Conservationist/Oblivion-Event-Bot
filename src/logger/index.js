import winston from "winston";
import appRoot from "app-root-path";
import "winston-daily-rotate-file";

const { combine, timestamp, prettyPrint } = winston.format

const transport = new (winston.transports.DailyRotateFile)({
    filename: `${appRoot}/logs/bot_%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

transport.on('rotate', function (oldFilename, newFilename) {
    // do something fun
});

const logger = winston.createLogger({
    transports: [
        transport
    ],
    format: combine(
        timestamp(),
        prettyPrint()
    )
});
export default logger;
