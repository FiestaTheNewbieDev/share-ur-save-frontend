export default function classNames(...args: (string | undefined)[]) {
	return args.filter(Boolean).join(' ');
}
