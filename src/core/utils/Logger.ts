import { GREEN, RED, RESET } from '@lib/colors.js';

interface LogOptions {
	printer: typeof console.info;
	prefix: string;
	color: string;
}

type Print = (message: unknown) => void;

export default class Logger {
	private static readonly _PREFIX_PADDING = 5;
	private static readonly _logOptions = {
		info: {
			printer: console.info,
			color: GREEN,
			prefix: 'INFO'.padStart(this._PREFIX_PADDING),
		},
		error: {
			printer: console.error,
			color: RED,
			prefix: 'ERROR'.padStart(this._PREFIX_PADDING),
		},
	} satisfies Record<string, Omit<LogOptions, 'message'>>;

	static info(message: unknown): void {
		this._print(message, this._logOptions.info);
	}

	static error(message: unknown): void {
		this._print(message, this._logOptions.error);
	}

	private static _print(message: unknown, logOptions: LogOptions): void {
		const print = this._makePrint(logOptions);

		if (Array.isArray(message)) {
			for (const mes of message) {
				print(mes);
			}
		} else {
			print(message);
		}
	}

	private static _makePrint(logOptions: LogOptions): Print {
		const { printer, color, prefix } = logOptions;

		return function print(message: unknown) {
			const log = color + `[HDCI] ${prefix} ${message}` + RESET;
			printer(log);
		};
	}
}
