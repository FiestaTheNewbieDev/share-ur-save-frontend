export default function match(input: string, pattern: string | RegExp) {
	if (pattern instanceof RegExp) return pattern.test(input);
	else if (typeof pattern === 'string') return input === pattern;
	else throw new Error('Invalid pattern type');
}
