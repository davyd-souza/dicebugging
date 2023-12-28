import {
	defineDocumentType,
	type ComputedFields,
} from 'contentlayer/source-files'
import { spawn } from 'node:child_process'
import { makeSource } from 'contentlayer/source-remote-files'
import rehypeAutolinkHeadings, {
	Options as RehypeAutoLinkHeadginsOptions,
} from 'rehype-autolink-headings'
import rehypePrettyCode, {
	Options as RehypePrettyCodeOptions,
} from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
	},
}

const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: 'posts/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true,
		},
		description: {
			type: 'string',
			required: true,
		},
		created_at: {
			type: 'string',
			required: true,
		},
	},
	computedFields,
}))

const Code = defineDocumentType(() => ({
	name: 'Code',
	filePathPattern: 'codes/**/*.mdx',
	contentType: 'mdx',
}))

const syncContentFromGit = async (contentDir: string) => {
	const syncRun = async () => {
		const gitUrl = `https://${process.env.GITHUB_TOKEN}@github.com/davyd-souza/dicebugging-posts.git`

		await runBashCommand(`
      if [ -d  "${contentDir}/posts" ];
        then
          cd "${contentDir}/posts"; git pull;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir}/posts;
      fi
    `)
	}

	let wasCancelled = false
	let syncInterval: NodeJS.Timeout

	const syncLoop = async () => {
		console.log('Syncing content files from git')

		await syncRun()

		if (wasCancelled) return

		syncInterval = setTimeout(syncLoop, 1_000 * 60 * 10) // 10 minutes
	}

	// Block until the first sync is done
	await syncLoop()

	return () => {
		wasCancelled = true
		clearTimeout(syncInterval)
	}
}

const runBashCommand = (command: string) =>
	new Promise((resolve, reject) => {
		const child = spawn(command, [], { shell: true })

		child.stdout.setEncoding('utf8')
		child.stdout.on('data', (data) => process.stdout.write(data))

		child.stderr.setEncoding('utf8')
		child.stderr.on('data', (data) => process.stderr.write(data))

		child.on('close', (code) => {
			if (code === 0) {
				resolve(void 0)
			} else {
				reject(new Error(`Command failed with exit code ${code}`))
			}
		})
	})

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
	theme: 'dracula',
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }]
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className?.push('line--highlited')
	},
}

const rehypeAutolinkHeadingsOptions: RehypeAutoLinkHeadginsOptions = {
	properties: {
		className: ['subheading-anchor'],
		ariaLabel: 'Link to section',
	},
}

export default makeSource({
	syncFiles: syncContentFromGit,
	contentDirPath: './src/content',
	contentDirInclude: ['posts', 'codes'],
	documentTypes: [Post, Code],
	disableImportAliasWarning: true,
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeAutolinkHeadings,
			// @ts-expect-error
			[rehypePrettyCode, rehypePrettyCodeOptions],
			[rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
		],
	},
})
