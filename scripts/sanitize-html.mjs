#!/usr/bin/env node
// 对拷贝出来的原型副本做查找替换 + 改名。
// 用法：node scripts/sanitize-html.mjs <目标目录>
// 只读 scripts/sanitize-map.json 的 textReplacements，按数组顺序依次替换（顺序很重要：
// "海航井通" 必须先于单独的 "海航" 被替换，否则会被拆成"某大型企业集团井通"）。
import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const map = JSON.parse(readFileSync(join(__dirname, 'sanitize-map.json'), 'utf8'))

const TEXT_EXTENSIONS = new Set(['.html', '.htm', '.js', '.css', '.md', '.svg'])

const targetDir = process.argv[2]
if (!targetDir) {
  console.error('用法: node scripts/sanitize-html.mjs <目标目录>')
  process.exit(1)
}

function walk(dir, fileList = []) {
  for (const entry of readdirSync(dir)) {
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

function applyTextReplacements(content) {
  let result = content
  for (const { pattern, replacement, flags } of map.textReplacements) {
    result = result.replace(new RegExp(pattern, flags), replacement)
  }
  return result
}

function sanitizeFileContents(files) {
  let changedCount = 0
  for (const file of files) {
    const ext = file.slice(file.lastIndexOf('.'))
    if (!TEXT_EXTENSIONS.has(ext)) continue
    const original = readFileSync(file, 'utf8')
    const sanitized = applyTextReplacements(original)
    if (sanitized !== original) {
      writeFileSync(file, sanitized, 'utf8')
      changedCount++
    }
  }
  return changedCount
}

function sanitizeBasename(name) {
  let result = name
  for (const { pattern, replacement, flags } of map.textReplacements) {
    // 文件名替换只处理纯文本类的词汇替换（忽略协议替换等正则）
    if (pattern.startsWith('http')) continue
    result = result.replace(new RegExp(pattern, flags), replacement)
  }
  return result
}

function renameSensitivePaths(dir) {
  // 后序遍历：先处理完子节点，再改当前节点自己的名字。
  // 每次 rename 只替换 basename、其余路径部分保持当前实际状态，
  // 避免"父目录还没改名，子文件却已经用新父目录名拼路径"导致的 ENOENT。
  const renames = []

  function walkAndRename(currentDir) {
    for (const entry of readdirSync(currentDir)) {
      const full = join(currentDir, entry)
      if (statSync(full).isDirectory()) {
        walkAndRename(full)
      }
    }
    // 处理完子节点后，再处理当前目录下每个条目自身的改名
    for (const entry of readdirSync(currentDir)) {
      const newName = sanitizeBasename(entry)
      if (newName !== entry) {
        const from = join(currentDir, entry)
        const to = join(currentDir, newName)
        renameSync(from, to)
        renames.push({ from, to })
      }
    }
  }

  walkAndRename(dir)
  return renames
}

const allFiles = walk(targetDir)
const changedCount = sanitizeFileContents(allFiles)
const renames = renameSensitivePaths(targetDir)

console.log(`[sanitize-html] 目标目录: ${targetDir}`)
console.log(`[sanitize-html] 文本内容替换: ${changedCount} 个文件被修改`)
console.log(`[sanitize-html] 文件/目录改名: ${renames.length} 处`)
for (const { from, to } of renames) {
  console.log(`  ${from} -> ${to}`)
}
