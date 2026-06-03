<script setup lang="ts">
import { useData } from 'vitepress'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

type Heading = {
  id: string
  level: number
  text: string
}

const headings = ref<Heading[]>([])
const activeId = ref('')
const progress = ref(0)
const { isDark } = useData()

function collectHeadings() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.vp-doc h2[id], .vp-doc h3[id]'))

  headings.value = nodes.map((node) => ({
    id: node.id,
    level: Number(node.tagName.slice(1)),
    text: node.textContent?.replace('#', '').trim() || node.id
  }))
}

function updateState() {
  const root = document.documentElement
  const scrollable = root.scrollHeight - root.clientHeight

  progress.value = scrollable > 0
    ? Math.round(Math.min(100, Math.max(0, (root.scrollTop / scrollable) * 100)))
    : 100

  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.vp-doc h2[id], .vp-doc h3[id]'))
  const current = nodes
    .filter((node) => node.getBoundingClientRect().top <= 120)
    .at(-1)

  activeId.value = current?.id || headings.value[0]?.id || ''
}

onMounted(() => {
  void nextTick(() => {
    collectHeadings()
    updateState()
  })

  window.addEventListener('scroll', updateState, { passive: true })
  window.addEventListener('resize', updateState)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateState)
  window.removeEventListener('resize', updateState)
})
</script>

<template>
  <nav
    v-if="headings.length"
    class="doc-outline-card"
    :class="{ 'is-dark': isDark }"
    aria-label="页面目录"
  >
    <div class="doc-outline-header">
      <div class="doc-outline-title">
        <span class="doc-outline-accent" />
        <span>Contents</span>
      </div>
      <div class="doc-outline-progress" aria-label="页面查看进度">
        {{ progress }}
      </div>
    </div>

    <div class="doc-outline-links">
      <a
        v-for="heading in headings"
        :key="heading.id"
        class="doc-outline-link"
        :class="{
          active: heading.id === activeId,
          nested: heading.level === 3
        }"
        :href="`#${heading.id}`"
      >
        {{ heading.text }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.doc-outline-card {
  box-sizing: border-box;
  width: 100%;
  min-height: min(430px, calc(100vh - var(--vp-nav-height) - 88px));
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 24px;
  padding: 24px 18px 30px 22px;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 16px 34px rgb(59 89 125 / 13%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.doc-outline-header {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  margin-bottom: 22px;
}

.doc-outline-title {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 16px;
  color: #141414;
  font-size: 19px;
  font-weight: 900;
  line-height: 1.35;
}

.doc-outline-accent {
  display: block;
  width: 4px;
  height: 23px;
  flex: 0 0 4px;
  border-radius: 999px;
  background: #5da8ff;
}

.doc-outline-progress {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  margin-left: auto;
  place-items: center;
  border: 4px solid rgb(207 231 255 / 82%);
  border-radius: 999px;
  color: #5da8ff;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

.doc-outline-links {
  display: grid;
  gap: 15px;
}

.doc-outline-link {
  display: block;
  min-width: 0;
  padding: 4px 0;
  color: #646464;
  font-size: 16px;
  font-weight: 850;
  line-height: 1.6;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.18s ease, transform 0.18s ease;
}

.doc-outline-link:hover {
  color: #2d7bdc;
  transform: translateX(2px);
}

.doc-outline-link.active {
  color: #4d4d4d;
}

.doc-outline-link.nested {
  padding-left: 14px;
  font-size: 14px;
  font-weight: 800;
}

.doc-outline-card.is-dark {
  border-color: rgb(255 255 255 / 14%);
  background: rgb(18 18 22 / 88%);
  box-shadow: 0 20px 44px rgb(0 0 0 / 24%);
}

.doc-outline-card.is-dark .doc-outline-title {
  color: #f4f4f5;
}

.doc-outline-card.is-dark .doc-outline-progress {
  border-color: rgb(94 156 232 / 34%);
  color: #85bdff;
}

.doc-outline-card.is-dark .doc-outline-link {
  color: #c8c8ce;
}

.doc-outline-card.is-dark .doc-outline-link:hover {
  color: #85bdff;
}

.doc-outline-card.is-dark .doc-outline-link.active {
  color: #f2f2f4;
}
</style>
