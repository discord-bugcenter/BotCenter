import { createLogger, format, Logger, transports, } from 'winston';
const { combine, timestamp, colorize, metadata, simple, errors, align, } =
  format;

/**
 * Create a new Logger
 * @param label - label of the component creating a logger
 * @param shouldPrintDebug - whether or not we should log debug and trace messages
 * @returns
 */
export function newLogger(label: string, shouldPrintDebug: boolean,): Logger {
	return createLogger({
		defaultMeta: {
			kind: label,
		},
		format: combine(
			timestamp(),
			colorize(),
			metadata(),
			simple(),
			errors({
				stack: true,
			},),
			align(),
		),
		level: shouldPrintDebug ? 'debug' : 'info',
		transports: [new transports.Console()],
	},);
}
