import { Mdx } from '@/components/mdx'
import { allCodes } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
	const [code] = allCodes

	return (
		<main className="max-w-3xl mx-auto px-2 md:px-0 space-y-4">
			<section className="flex items-center gap-4">
				<Image
					className="rounded-full"
					src="https://github.com/davyd-souza.png"
					width={192}
					height={192}
					alt="Davyd Souza"
				/>

				<div className="flex-1">
					<h2 className="text-primary font-display text-2xl font-bold">
						Davyd Souza
					</h2>
					<p className="text-neutral-400 font-display">🇧🇷 São Paulo</p>
				</div>

				<ul className="flex flex-col gap-4">
					<li>
						<Link
							className="flex gap-2 items-center hover:text-primary transition-colors"
							href="https://twitter.com/odeisouza"
							target="_blank"
						>
							<i className="ri-twitter-x-line text-primary text-lg leading-none" />
							@odeisouza
						</Link>
					</li>
					<li>
						<Link
							className="flex gap-2 items-center hover:text-primary transition-colors"
							href="https://linkedin.com/in/davyd-souza"
							target="_blank"
						>
							<i className="ri-linkedin-line text-primary text-lg leading-none" />
							in/davyd--souza
						</Link>
					</li>
					<li>
						<Link
							className="flex gap-2 items-center hover:text-primary transition-colors"
							href="https://github.com/davyd-souza"
							target="_blank"
						>
							<i className="ri-github-line text-primary text-lg leading-none" />
							@davyd-souza
						</Link>
					</li>
					<li>
						<Link
							className="flex gap-2 items-center hover:text-primary transition-colors"
							href="https://discordapp.com/users/142311279560884224"
							target="_blank"
						>
							<i className="ri-discord-fill text-primary text-lg leading-none" />
							odeidei
						</Link>
					</li>
				</ul>
			</section>

			<div className="space-y-4">
				<p>Front-end Engineer at Tempo Energia.</p>
				<p>
					I love combining the worlds of logic and creative website to make
					eye-catching, accessible, and user-friendly web pages.
				</p>
			</div>

			<Mdx code={code.body.code} />
		</main>
	)
}
