import { calculateMinutesToReadText } from './calculateMinutesToReadText'

export function timeNeededToReadInMinutes(
	textCharactersAmount: number,
): string {
	const timeNeeded = calculateMinutesToReadText(textCharactersAmount / 7000)

	if (timeNeeded === 0) {
		return 'less than 5 min read'
	}

	return `${timeNeeded * 5} min read`
}
