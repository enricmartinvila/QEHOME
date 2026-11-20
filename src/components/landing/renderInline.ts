export interface InlinePart {
	value: string
	slug?: string
}

/** Parses `[[label|slug]]` markers into text and internal-link parts. */
export function renderInline(text: string): InlinePart[] {
	const parts: InlinePart[] = []
	const re = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
	let last = 0
	let match: RegExpExecArray | null
	while ((match = re.exec(text)) !== null) {
		if (match.index > last) parts.push({ value: text.slice(last, match.index) })
		parts.push({ value: match[1], slug: match[2] })
		last = match.index + match[0].length
	}
	if (last < text.length) parts.push({ value: text.slice(last) })
	if (parts.length === 0) parts.push({ value: text })
	return parts
}
