import envSchema from '@core/schema/env-schema.js';
import Logger from '@core/utils/Logger.js';
import dailyCheckIn from '@core/utils/daily-check-in.js';
import { ZodError } from 'zod';

async function main() {
  const { LTOKEN, LTUID, LANG } = envSchema.parse(process.env);

  const body = await dailyCheckIn({ ltoken: LTOKEN, ltuid: LTUID, lang: LANG });
  Logger.info(
    `Daily Check In Page Response Body: ${JSON.stringify(body, null, 2)}`,
  );
  if (body.retcode === 0) {
    Logger.info('Daily check in has been successfully completed.');
  } else {
    throw new Error(body.message);
  }
}

try {
  await main();
} catch (error) {
  Logger.error(errorToLog(error));
  process.exit(1);
}

function errorToLog(error: unknown): string | string[] {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message);
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return JSON.stringify(error, null, 2);
}
