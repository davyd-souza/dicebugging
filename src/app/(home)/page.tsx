import { renderCoffee } from '@/utils/renderCoffee'
import { timeNeededToReadInMinutes } from '@/utils/timeNeededToReadInMinutes'
import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import Link from 'next/link'

export default async function HomePage() {
	const posts = allPosts

	return (
		<main className="max-w-3xl mx-auto px-2 md:px-0 space-y-8">
			{posts.map(({ _id, body, description, created_at, title, slug }) => (
				<Link href={slug} key={_id} className="grid gap-2 group/link">
					<header>
						<h2 className="text-xl text-primary font-bold">{title}</h2>

						<div className="text-xs inline-flex gap-1 text-neutral-400">
							<p>{dayjs(created_at).format('LL').toLowerCase()}</p>

							<span>&bull;</span>

							<p>{`${renderCoffee(body.raw.length)} ${timeNeededToReadInMinutes(
								body.raw.length,
							)}`}</p>
						</div>
					</header>

					<p className="line-clamp-2">{description}</p>

					<p className="relative font-bold w-max">
						Read more
						<span className="absolute h-1 w-0 left-0 bottom-0 bg-primary rounded-sm transition-all group-hover/link:w-full group-focus-visible/link:w-full" />
					</p>
				</Link>
			))}
		</main>
	)
}
