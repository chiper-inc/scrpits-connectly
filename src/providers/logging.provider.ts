import { Logger } from 'logging-chiper';
import { Config } from '../config.ts';

interface LogInput {
  readonly stt: string;
  readonly message: string;
  readonly context?: string;
  readonly functionName?: string;
  readonly data?: unknown;
}

interface ErrorInput {
  readonly stt: string;
  readonly message: string;
  readonly error: Error;
  readonly context?: string;
  readonly functionName?: string;
  readonly data?: unknown;
}

enum LoggingLevel {
  NONE = 0,
  LOG = 4,
  WARN = 2,
  ERROR = 1,
}
export class LoggingProvider {
  public static NONE = LoggingLevel.NONE;
  public static LOG = LoggingLevel.LOG;
  public static WARN = LoggingLevel.WARN;
  public static ERROR = LoggingLevel.ERROR;
  public static FULL = this.LOG | this.WARN | this.ERROR;

  private readonly loggerBaseData: Partial<LogInput>;
  private readonly level: number = Config.logging.level as unknown as number;

  constructor(loggingOptions?: { context?: string; levels?: number }) {
    const { context = LoggingProvider.name, levels = LoggingLevel.NONE } =
      loggingOptions || {};
    this.level = levels !== LoggingLevel.NONE ? levels : this.level;
    this.loggerBaseData = {
      stt: 'campaign-engine',
      context,
    };
  }

  public log(input: Partial<LogInput>) {
    if (this.level & LoggingProvider.LOG) {
      Logger.getInstance().log({
        ...this.loggerBaseData,
        ...input,
      } as LogInput);
    }
  }

  public error(input: Partial<ErrorInput>) {
    if (this.level & LoggingProvider.ERROR) {
      Logger.getInstance().error({
        ...this.loggerBaseData,
        ...input,
      } as ErrorInput);
    }
  }

  public warn(input: Partial<LogInput>) {
    if (this.level & LoggingProvider.WARN) {
      Logger.getInstance().warn({
        ...this.loggerBaseData,
        ...input,
      } as LogInput);
    }
  }
}
