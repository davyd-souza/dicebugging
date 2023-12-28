import { Inter, Fira_Mono } from 'next/font/google'

export const inter = Inter({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const firaMono = Fira_Mono({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-fira_mono',
})
