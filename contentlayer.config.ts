import { defineDocumentType } from 'contentlayer/source-files'
import { spawn } from 'node:child_process'
import { makeSource } from 'contentlayer/source-remote-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    created_at: {
      type: 'string',
      required: true
    }
  },
}))

const syncContentFromGit = async (contentDir: string) => {
  const syncRun = async () => {
    const gitUrl = 'https://github.com/davyd-souza/dicebugging-posts.git'
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

export default makeSource({
  syncFiles: syncContentFromGit,
  contentDirPath: 'src/content',
  contentDirInclude: ['posts'],
  documentTypes: [Post],
  disableImportAliasWarning: true,
})