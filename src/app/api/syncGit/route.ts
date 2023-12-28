export const runtime = 'nodejs'

export function GET(_: Request) {
	return new Response('I am a Serverless Function', {
		status: 200,
	})
}
