#!/usr/bin/env node
// 扫描目标目录，确认脱敏替换表里的敏感词一个都不剩。
// 用法：node scripts/check-forbidden-strings.mjs <目标目录>
// 本地发布前跑一次，CI 里 (.github/workflows/deploy.yml) 再跑一次兜底，退出码非0时构建失败。
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const map = JSON.parse(readFileSync(join(__dirname, 'sanitize-map.json'), 'utf8'))

const TEXT_EXTENSIONS = new Set(['.html', '.htm', '.js', '.css', '.md', '.svg', '.mts', '.ts', '.vue'])

// 构建工具生成的中间产物/依赖目录：不受版本控制、内容是压缩后的第三方代码，
// 扫描它们既无意义（不会被发布）又容易产生误报（压缩后的单词截断可能巧合拼出敏感词片段）。
const SKIP_DIR_NAMES = new Set(['node_modules', 'cache', 'dist'])

const targetDir = process.argv[2]
if (!targetDir) {
  console.error('用法: node scripts/check-forbidden-strings.mjs <目标目录>')
  process.exit(1)
}

// 禁止词表：脱敏替换表里"应被替换掉的原词"（不含 preserve 里明确保留的词、不含协议类替换）
// + neverAppear 里明确规定不得以任何形式出现的词
const forbiddenTerms = [
  ...map.textReplacements
    .filter(({ pattern }) => !pattern.startsWith('http'))
    .map(({ pattern, flags }) => ({ pattern, flags, reason: '脱敏替换表遗留原词' })),
  ...map.neverAppear.map(({ term, reason }) => ({ pattern: term, flags: 'g', reason })),
]

function walk(dir, fileList = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR_NAMES.has(entry)) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full, fileList)
    } else {
      fileList.push(full)
    }
  }
  return fileList
}

const allFiles = walk(targetDir)
let hitCount = 0

for (const file of allFiles) {
  const ext = file.slice(file.lastIndexOf('.'))
  if (!TEXT_EXTENSIONS.has(ext)) continue
  const content = readFileSync(file, 'utf8')
  for (const { pattern, flags, reason } of forbiddenTerms) {
    const re = new RegExp(pattern, flags)
    const matches = content.match(re)
    if (matches) {
      hitCount += matches.length
      console.error(`[命中] ${file}  词="${pattern}"  次数=${matches.length}  (${reason})`)
    }
  }
}

// 文件名/目录名本身也要检查
for (const file of allFiles) {
  for (const { pattern, flags, reason } of forbiddenTerms) {
    if (pattern.startsWith('http')) continue
    const re = new RegExp(pattern, flags)
    if (re.test(file)) {
      hitCount++
      console.error(`[路径命中] ${file}  词="${pattern}"  (${reason})`)
    }
  }
}

if (hitCount > 0) {
  console.error(`\n[check-forbidden-strings] 失败：共 ${hitCount} 处命中，需要处理后再发布。`)
  process.exit(1)
} else {
  console.log(`[check-forbidden-strings] 通过：扫描 ${allFiles.length} 个文件，0 命中。`)
}
