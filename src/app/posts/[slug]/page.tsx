import { Mdx } from '@/components/mdx'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

type PostPageProps = {
	params: {
		slug: string
	}
}

async function getDocFromParams(slug: string) {
	const post = allPosts.find(
		(post) => post._raw.flattenedPath === `posts/${slug}`,
	)

	if (!post) {
		notFound()
	}

	return post
}

export async function generateMetadata({ params }: PostPageProps) {
	const post = await getDocFromParams(params.slug)

	return {
		title: post.title,
		description: post.description,
	}
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getDocFromParams(params.slug)

	return (
		<section className="max-w-3xl mx-auto pb-4 px-2 md:px-0">
			<Mdx code={post.body.code} />
		</section>
	)
}
