<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const categories = [
  { id: 'study-notes', text: '学习笔记', href: '/articles#study-notes' },
  { id: 'novels', text: '小说', href: '/articles#novels' },
  { id: 'calendar', text: '日历', href: '/articles#calendar' },
  { id: 'shares', text: '分享', href: '/articles#shares' }
]

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function handleDocumentClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) {
    close()
  }
}

function handleCategoryClick(event: MouseEvent, categoryId: string) {
  const path = window.location.pathname.replace(/\/$/, '')
  const isArticlesPage = path === '/articles'

  close()

  if (!isArticlesPage) return

  event.preventDefault()
  window.dispatchEvent(new CustomEvent('article-category-change', { detail: categoryId }))
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div ref="root" class="article-nav-dropdown" :class="{ open }">
    <button
      class="article-nav-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="true"
      @click.stop="toggle"
    >
      <span>文章</span>
      <span class="article-nav-caret" aria-hidden="true"></span>
    </button>

    <div class="article-nav-panel" aria-label="文章分类">
      <a
        v-for="category in categories"
        :key="category.href"
        class="article-nav-item"
        :href="category.href"
        @click="handleCategoryClick($event, category.id)"
      >
        {{ category.text }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.article-nav-dropdown {
  position: relative;
  order: 3;
  display: none;
  height: var(--vp-nav-height);
  align-items: center;
}

.article-nav-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: var(--vp-nav-height);
  border: 0;
  padding: 0 12px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  line-height: var(--vp-nav-height);
  cursor: pointer;
  transition: color 0.18s ease;
}

.article-nav-trigger:hover,
.article-nav-dropdown.open .article-nav-trigger {
  color: var(--vp-c-brand-1);
}

.article-nav-trigger::after {
  position: absolute;
  right: 8px;
  bottom: 0;
  left: 8px;
  height: 3px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  content: "";
  opacity: 0;
  transform: scaleX(0.4);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.article-nav-dropdown.open .article-nav-trigger::after {
  opacity: 1;
  transform: scaleX(1);
}

.article-nav-caret {
  width: 9px;
  height: 9px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: translateY(-3px) rotate(45deg);
  transform-origin: center;
  transition: transform 0.18s ease;
}

.article-nav-dropdown.open .article-nav-caret {
  transform: translateY(2px) rotate(225deg);
}

.article-nav-panel {
  position: absolute;
  top: calc(var(--vp-nav-height) - 4px);
  right: 0;
  display: grid;
  width: 132px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 76%, transparent);
  border-radius: 12px;
  padding: 8px;
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  box-shadow: 0 16px 34px rgb(0 0 0 / 14%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px) scaleY(0.96);
  transform-origin: top;
  transition: opacity 0.18s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.article-nav-dropdown.open .article-nav-panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scaleY(1);
}

.article-nav-item {
  border-radius: 8px;
  padding: 9px 10px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  text-decoration: none;
  transition: background-color 0.16s ease, color 0.16s ease, transform 0.16s ease;
}

.article-nav-item:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
  transform: translateX(2px);
}

@media (min-width: 768px) {
  .article-nav-dropdown {
    display: inline-flex;
  }
}
</style>
