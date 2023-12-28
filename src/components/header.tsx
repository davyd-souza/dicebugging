import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	return (
		<header className="mx-auto max-w-3xl py-4 px-2 md:px-0 flex justify-between items-center">
			<Link
				href="/"
				className="font-display font-bold text-xl text-primary md:text-2xl hover:cursor-pointer"
			>
				dicebugging
			</Link>

			<Link
				href="/profile"
				className="font-display inline-flex gap-2 items-center font-bold"
			>
				by
				<Image
					src="https://github.com/davyd-souza.png"
					alt=""
					width={64}
					height={64}
					className="size-12 rounded-full"
				/>
			</Link>
		</header>
	)
}
