import { renderCoffee } from '@/utils/renderCoffee'
import { timeNeededToReadInMinutes } from '@/utils/timeNeededToReadInMinutes'
import dayjs from 'dayjs'
import Link from 'next/link'
import { z } from 'zod'

const postsSchema = z
	.object({
		id: z.number(),
		title: z.string(),
		body: z.string(),
		number: z.number(),
		created_at: z.string(),
	})
	.array()

const headers = new Headers({
	Authorization: `Bearer ${process.env.GITHUB_TOKEN || ''}`,
})

export default async function HomePage() {
	const responsePosts = await fetch(
		'https://api.github.com/repos/davyd-souza/dicebugging/issues',
		{
			method: 'GET',
			headers,
		},
	).then((res) => res.json())

	const posts = postsSchema.parse(responsePosts)

	return (
		<main className="max-w-3xl mx-auto px-2 md:px-0">
			{posts.map(({ body, created_at, id, title, number }) => (
				<article key={id} className="grid gap-2">
					<header>
						<h2 className="text-xl text-primary font-bold">{title}</h2>

						<div className="text-xs inline-flex gap-1 text-neutral-400">
							<p>{dayjs(created_at).format('LL').toLowerCase()}</p>

							<span>•</span>

							<p>{`${renderCoffee(body.length)} ${timeNeededToReadInMinutes(
								body.length,
							)}`}</p>
						</div>
					</header>

					<p className="line-clamp-2">{body.slice(0, 300)}</p>

					<Link href={`/post/${number}`} className="font-bold">
						Read more
					</Link>
				</article>
			))}
		</main>
	)
}
