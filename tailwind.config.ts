import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: 'var(--font-inter)',
				display: 'var(--font-fira_mono)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				primary: 'hsl(var(--primary))',
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				'.noise': {
					filter: 'url(#noiseFilter)',
				},
				'.text-backdrop': {
					textShadow: '2px 2px 0 hsl(var(--primary) / 0.3)',
				},
			})
		}),
	],
}
export default config
