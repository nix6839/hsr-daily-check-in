export const isDev =
  process.env['NODE_ENV'] === 'development' ||
  process.env['NODE_ENV'] === undefined;
export const isProd = process.env['NODE_ENV'] === 'production';
