import { TranslationStatus } from '@/types/weglot';

export default function getTranslateClass(translate?: TranslationStatus) {
	return translate === 'translate'
		? 'weglot-translate'
		: translate === 'ignore'
			? 'weglot-ignore'
			: '';
}
