// https://github.com/tc39/proposal-regex-escaping/blob/d2ff7fe02009f728eb3c2e749e354c72427abd08/polyfill.js#LL4C1-L4C1
const regexCharsRegex = /[\\^$*+?.()|[\]{}]/g;

export default function escapeRegex(str: string): string {
	return str.replace(regexCharsRegex, '\\$&');
}
