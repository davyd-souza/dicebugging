import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import {
	AnchorHTMLAttributes,
	BlockquoteHTMLAttributes,
	HTMLAttributes,
	ImgHTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from 'react'

import { cn } from '@/lib/cn'

const components = {
	h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={cn(
				'mt-2 scroll-m-20 font-bold text-2xl md:text-3xl',
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={cn(
				'mt-6 md:mt-10 scroll-m-20 border-b pb-1 text-xl md:text-2xl font-bold first:mt-0',
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={cn('mt-8 scroll-m-20 text-lg md:text-xl font-bold', className)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={cn(
				'mt-8 scroll-m-20 text-base md:text-lg font-bold',
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={cn(
				'mt-8 scroll-m-20 text-sm md:text-base font-bold',
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={cn(
				'mt-8 scroll-m-20 text-sm md:text-base font-bold',
				className,
			)}
			{...props}
		/>
	),
	a: ({
		className,
		href,
		...props
	}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<Link
			href={href ?? '#'}
			className={cn('font-medium underline underline-offset-4', className)}
			{...props}
		/>
	),
	p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={cn(
				'text-sm md:text-base leading-6 md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6',
				className,
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
		<ul
			className={cn(
				'my-4 ml-4 list-disc text-sm md:my-6 md:ml-6 md:text-base has-[input[type=checkbox]]:list-none has-[input[type=checkbox]]:ml-0',
				className,
			)}
			{...props}
		/>
	),
	ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
		<ol
			className={cn(
				'my-4 ml-4 list-decimal text-sm md:my-6 md:ml-6 md:text-base',
				className,
			)}
			{...props}
		/>
	),
	li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
		<li className={cn('mt-2', className)} {...props} />
	),
	blockquote: ({
		className,
		...props
	}: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={cn(
				'mt-4 border-l-2 pl-4 italic *:text-muted-foreground md:mt-6 md:pl-6',
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		src,
		...props
	}: ImgHTMLAttributes<HTMLImageElement>) => (
		<img
			className={cn('rounded-md border', className)}
			{...props}
			src={src ?? ''}
			alt={alt ?? 'image alt'}
		/>
	),
	hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
	table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
		<div className="my-4 w-full overflow-y-auto md:my-6">
			<table className={cn('w-full', className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={cn('m-0 border-t p-0 even:bg-muted', className)}
			{...props}
		/>
	),
	th: ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={cn(
				'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={cn(
				'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={cn(
				'mb-3 mt-4 overflow-x-auto rounded-lg p-2 md:mb-4 md:mt-6 md:py-4',
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
		<code
			className={cn(
				'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
				className,
			)}
			{...props}
		/>
	),
	mark: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
		<mark
			className={cn(
				'group/marker border-b [&[data-chars-id=red]]:bg-red-700/80 [&[data-chars-id=red]]:border-b-red-400 [&[data-chars-id=violet]]:bg-violet-700/80 [&[data-chars-id=violet]]:border-b-violet-400 [&[data-chars-id=green]]:bg-green-700/80 [&[data-chars-id=green]]:border-b-green-400 [&[data-chars-id=blue]]:bg-blue-700/80 [&[data-chars-id=blue]]:border-b-blue-400 rounded-sm px-1',
				className,
			)}
			{...props}
		/>
	),
	span: ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
		<span
			className={cn(
				'group-data-[chars-id=red]/marker:!text-red-200 group-data-[chars-id=violet]/marker:!text-violet-200 group-data-[chars-id=green]/marker:!text-green-200 group-data-[chars-id=blue]/marker:!text-blue-200',
				className,
			)}
			{...props}
		/>
	),
	Image,
}

interface MdxProps {
	code: string
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code)

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	)
}
