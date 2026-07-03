<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.role || frontmatter.highlights || frontmatter.techStack" class="case-study-meta">
    <dl>
      <template v-if="frontmatter.role">
        <dt>角色</dt>
        <dd>{{ frontmatter.role }}</dd>
      </template>
      <template v-if="frontmatter.period">
        <dt>时间</dt>
        <dd>{{ frontmatter.period }}</dd>
      </template>
      <template v-if="frontmatter.industry">
        <dt>领域</dt>
        <dd>{{ (frontmatter.industry as string[]).join(' · ') }}</dd>
      </template>
      <template v-if="frontmatter.techStack">
        <dt>技术栈</dt>
        <dd>{{ (frontmatter.techStack as string[]).join(' · ') }}</dd>
      </template>
    </dl>
    <ul v-if="frontmatter.highlights" class="highlights">
      <li v-for="item in frontmatter.highlights as string[]" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.case-study-meta {
  margin: 24px 0;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 12px;
  margin: 0;
}

dt {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

dd {
  margin: 0;
}

.highlights {
  margin: 12px 0 0;
  padding-left: 16px;
}

.highlights li {
  margin: 4px 0;
}
</style>
