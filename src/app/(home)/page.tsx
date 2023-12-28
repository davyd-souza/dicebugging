import { renderCoffee } from '@/utils/renderCoffee'
import { timeNeededToReadInMinutes } from '@/utils/timeNeededToReadInMinutes'
import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import Link from 'next/link'

export default async function HomePage() {
	const posts = allPosts

	return (
		<main className="max-w-3xl mx-auto px-2 md:px-0 space-y-8">
			{posts.map(
				({ _id, _raw, body, description, created_at, title, slug }) => (
					<article key={_id} className="grid gap-2">
						<header>
							<h2 className="text-xl text-primary font-bold">{title}</h2>

							<div className="text-xs inline-flex gap-1 text-neutral-400">
								<p>{dayjs(created_at).format('LL').toLowerCase()}</p>

								<span>&bull;</span>

								<p>{`${renderCoffee(
									body.raw.length,
								)} ${timeNeededToReadInMinutes(body.raw.length)}`}</p>
							</div>
						</header>

						<p className="line-clamp-2">{description}</p>

						<Link href={slug} className="font-bold">
							Read more
						</Link>
					</article>
				),
			)}
		</main>
	)
}
