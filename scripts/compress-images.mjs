/**
 * Compress WebP images in public/images for web delivery.
 * Resizes to maxWidth and re-encodes until each file is within targetSizeKb.
 *
 * Usage: node scripts/compress-images.mjs
 * Optional: --dry-run  (report only, no writes)
 */
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(__dirname, "../public/images")
const dryRun = process.argv.includes("--dry-run")

const MAX_WIDTH = 1920
const FALLBACK_WIDTH = 1600
const TARGET_MAX_KB = 400
const TARGET_MIN_KB = 150
const START_QUALITY = 78
const MIN_QUALITY = 50

async function encode(input, width, quality) {
	const pipeline = sharp(input).rotate()
	pipeline.resize({
		width,
		withoutEnlargement: true,
	})
	const buffer = await pipeline.webp({ quality, effort: 6 }).toBuffer()
	const outMeta = await sharp(buffer).metadata()
	return {
		buffer,
		quality,
		size: buffer.length,
		width: outMeta.width,
		height: outMeta.height,
	}
}

async function compressFile(filePath) {
	const name = path.basename(filePath)
	const before = (await fs.stat(filePath)).size
	const input = await fs.readFile(filePath)
	const meta = await sharp(input).metadata()

	let best = null

	for (const width of [MAX_WIDTH, FALLBACK_WIDTH]) {
		for (let quality = START_QUALITY; quality >= MIN_QUALITY; quality -= 5) {
			const candidate = await encode(input, width, quality)
			best = candidate
			if (candidate.size / 1024 <= TARGET_MAX_KB) {
				const afterKb = Math.round(candidate.size / 1024)
				const beforeKb = Math.round(before / 1024)
				const note =
					afterKb < TARGET_MIN_KB
						? ` (under ${TARGET_MIN_KB}KB; ok for web)`
						: ""
				console.log(
					`${name}: ${meta.width}x${meta.height} ${beforeKb}KB → ${candidate.width}x${candidate.height} ${afterKb}KB q${quality}${note}`
				)
				if (!dryRun) await fs.writeFile(filePath, candidate.buffer)
				return { before, after: candidate.size }
			}
		}
	}

	const afterKb = Math.round(best.size / 1024)
	const beforeKb = Math.round(before / 1024)
	console.log(
		`${name}: ${meta.width}x${meta.height} ${beforeKb}KB → ${best.width}x${best.height} ${afterKb}KB q${best.quality} (still >${TARGET_MAX_KB}KB)`
	)
	if (!dryRun) await fs.writeFile(filePath, best.buffer)
	return { before, after: best.size }
}

try {
	const entries = await fs.readdir(imagesDir)
	const files = entries
		.filter((f) => f.toLowerCase().endsWith(".webp"))
		.map((f) => path.join(imagesDir, f))
		.sort()

	if (!files.length) {
		console.log("No WebP files found in public/images")
		process.exit(0)
	}

	console.log(
		dryRun
			? "Dry run (no writes). Target: ≤400KB, max width 1920px.\n"
			: "Compressing public/images/*.webp → ≤400KB, max width 1920px.\n"
	)

	let totalBefore = 0
	let totalAfter = 0
	for (const file of files) {
		const { before, after } = await compressFile(file)
		totalBefore += before
		totalAfter += after
	}

	const saved = totalBefore - totalAfter
	console.log(
		`\nTotal: ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB (saved ${Math.round(saved / 1024)}KB / ${(saved / totalBefore * 100).toFixed(0)}%)`
	)
	if (dryRun) console.log("Re-run without --dry-run to write files.")
} catch (error) {
	console.error("compress-images failed:", error)
	process.exit(1)
}
