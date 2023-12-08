import { ZodIssueCode, object, string, enum as zEnum } from 'zod';

import type { ParseParams, ZodErrorMap } from 'zod';

const envSchema = object({
	NODE_ENV: zEnum(['development', 'production']),
	LTOKEN: string().nonempty(),
	LTUID: string().nonempty(),
	LANG: zEnum([
		'zh-cn',
		'zh-tw',
		'de-de',
		'en-us',
		'es-es',
		'fr-fr',
		'id-id',
		'it-it',
		'ja-jp',
		'ko-kr',
		'pt-pt',
		'ru-ru',
		'th-th',
		'tr-tr',
		'vi-vn',
		'',
	])
		.transform((arg) => (arg === '' ? undefined : arg))
		.default('en-us'),
});

const errorMap: ZodErrorMap = (issue, ctx) => {
	const propertyName = issue.path.at(0);

	if (propertyName === 'LTOKEN' || propertyName === 'LTUID') {
		if (
			(issue.code === ZodIssueCode.invalid_type &&
				issue.received === 'undefined') ||
			issue.code === ZodIssueCode.too_small
		) {
			return {
				message: `Please provide the GitHub secret "${propertyName}".`,
			};
		}
	}

	if (propertyName === 'NODE_ENV') {
		if (issue.code === ZodIssueCode.invalid_type) {
			if (issue.received === 'undefined') {
				return {
					message: `Please provide the "${propertyName}" environment variable, ${issue.expected}`,
				};
			}
		}
	}

	if (issue.code === ZodIssueCode.invalid_enum_value) {
		const expectedValues = issue.options
			.map((option) => `'${option}'`)
			.join(' | ');
		return {
			message: `Invalid "${propertyName}". Expected ${expectedValues}, received "${issue.received}"`,
		};
	}

	return { message: ctx.defaultError };
};

const parseEnvSchema = envSchema.parse;
envSchema.parse = (
	data: unknown,
	params?: Partial<Omit<ParseParams, 'errorMap'>>,
) => {
	return parseEnvSchema(data, { ...params, errorMap });
};

export default envSchema;
