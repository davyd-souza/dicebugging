import { calculateMinutesToReadText } from './calculateMinutesToReadText'

export function renderCoffee(textCharactersAmount: number) {
	const amountOfCoffees = calculateMinutesToReadText(textCharactersAmount) || 1

	return '☕'.repeat(amountOfCoffees)
}
