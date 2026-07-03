<script setup lang="ts">
import { withBase } from 'vitepress'

const props = defineProps<{
  /** 原型页面截图路径（docs/public/screenshots/ 下） */
  image: string
  /** 点击后在新标签页打开的完整可交互原型路径 */
  href: string
  title: string
}>()
</script>

<template>
  <a class="prototype-viewer" :href="withBase(href)" target="_blank" rel="noopener">
    <img :src="withBase(image)" :alt="title" loading="lazy" />
    <span class="overlay">{{ title }} · 点击查看完整可交互原型 ↗</span>
  </a>
</template>

<style scoped>
.prototype-viewer {
  position: relative;
  display: block;
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.prototype-viewer img {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 16px;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
  opacity: 0;
  transition: opacity 0.15s ease;
}

.prototype-viewer:hover .overlay,
.prototype-viewer:focus-visible .overlay {
  opacity: 1;
}
</style>
