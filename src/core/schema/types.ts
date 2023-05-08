import type { infer as zInfer } from 'zod';
import type envSchema from './env-schema.js';

export type Lang = zInfer<typeof envSchema>['LANG'];
