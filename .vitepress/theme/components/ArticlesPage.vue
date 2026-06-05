<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ArticleCard from './ArticleCard.vue'
import { data as articleData } from '../data/articles.data'

const articleCategories = [
  {
    id: 'study-notes',
    title: '学习笔记',
    label: 'Study',
    description: '课程、技术和阅读整理。'
  },
  {
    id: 'novels',
    title: '小说',
    label: 'Novel',
    description: '故事、片段和长篇草稿。'
  },
  {
    id: 'calendar',
    title: '日历',
    label: 'Calendar',
    description: '时间线、计划和阶段记录。'
  },
  {
    id: 'shares',
    title: '分享',
    label: 'Share',
    description: '想法、资源和生活记录。'
  }
]

function categoryArticles(categoryId: string) {
  return articleData.articles.filter((article) => article.categoryId === categoryId)
}

const defaultCategoryId = articleCategories[0].id
const activeCategoryId = ref(defaultCategoryId)

const activeCategory = computed(() => {
  return articleCategories.find((category) => category.id === activeCategoryId.value) ?? articleCategories[0]
})

const activeCategoryArticles = computed(() => categoryArticles(activeCategory.value.id))

function syncActiveCategory() {
  if (!inBrowser) return

  const hashCategoryId = window.location.hash.slice(1)
  const category = articleCategories.find((item) => item.id === hashCategoryId)

  activeCategoryId.value = category?.id ?? defaultCategoryId
}

onMounted(() => {
  syncActiveCategory()
  window.addEventListener('hashchange', syncActiveCategory)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncActiveCategory)
})
</script>

<template>
  <section class="articles-page">
    <aside class="articles-sidebar">
      <section class="profile-card panel">
        <img class="avatar" src="/avatar.png" alt="linwang-l 的头像" />
        <h1>linwang-l</h1>
        <span class="name-mark" aria-hidden="true"></span>
        <p>寻找着理由迷失了方向，在梦的渊底徘徊不前。</p>
      </section>

      <section class="stats-card panel">
        <div class="stat-row">
          <span>文章</span>
          <strong>{{ articleData.articles.length }}</strong>
        </div>
        <div class="stat-row">
          <span>排序</span>
          <strong>新</strong>
        </div>
      </section>
    </aside>

    <main class="articles-main">
      <section class="archive-hero panel">
        <p class="eyebrow">Aechive</p>
        <h2>如果喜欢则是最好</h2>
      </section>

      <section class="category-grid" aria-label="文章分类">
        <a
          v-for="category in articleCategories"
          :key="category.id"
          class="category-card panel"
          :href="`/articles#${category.id}`"
        >
          <span>{{ category.label }}</span>
          <h2>{{ category.title }}</h2>
          <p>{{ category.description }}</p>
          <strong>{{ categoryArticles(category.id).length }}</strong>
        </a>
      </section>

      <div class="section-divider">
        <span></span>
        <strong>分类文章</strong>
        <span></span>
      </div>

      <section :id="activeCategory.id" class="category-section">
        <header class="category-heading">
          <p>{{ activeCategory.label }}</p>
          <h2>{{ activeCategory.title }}</h2>
        </header>

        <ArticleCard
          v-for="article in activeCategoryArticles"
          :key="article.href"
          :article="article"
        />
      </section>
    </main>
  </section>
</template>

<style scoped>
.articles-page {
  width: min(100%, 1220px);
  margin: 0 auto;
  padding: 40px 24px 72px;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 32px;
}

.articles-sidebar,
.articles-main {
  display: grid;
  align-content: start;
  gap: 24px;
}

.panel {
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: 22px;
  background: color-mix(in srgb, var(--vp-c-bg) 80%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 42px rgb(0 0 0 / 12%);
}

.profile-card {
  display: grid;
  justify-items: center;
  padding: 32px 28px 30px;
  text-align: center;
}

.avatar {
  width: 156px;
  height: 156px;
  border: 4px solid color-mix(in srgb, var(--vp-c-bg) 84%, transparent);
  border-radius: 50%;
  object-fit: cover;
}

.profile-card h1 {
  margin: 24px 0 0;
  color: var(--vp-c-text-1);
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 0;
}

.name-mark {
  width: 46px;
  height: 4px;
  margin: 12px 0 18px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
}

.profile-card p,
.archive-hero p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.stats-card {
  padding: 14px 20px;
}

.stat-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  min-height: 66px;
}

.stat-row + .stat-row {
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 78%, transparent);
}

.stat-row span {
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 800;
}

.stat-row strong {
  color: var(--vp-c-text-2);
  font-size: 28px;
}

.archive-hero {
  padding: 28px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.category-card {
  position: relative;
  display: block;
  padding: 22px 24px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.category-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 54%, transparent);
  box-shadow: 0 22px 48px rgb(0 0 0 / 16%);
  transform: translateY(-2px) scale(1.01);
}

.category-card span {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.category-card h2 {
  margin: 8px 0 6px;
  color: var(--vp-c-text-1);
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: 0;
}

.category-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.category-card strong {
  position: absolute;
  right: 22px;
  bottom: 18px;
  color: color-mix(in srgb, var(--vp-c-brand-1) 72%, var(--vp-c-text-2));
  font-size: 28px;
  line-height: 1;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 800;
}

.archive-hero h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 30px;
  line-height: 1.4;
  letter-spacing: 0;
}

.section-divider {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  color: var(--vp-c-text-1);
  font-weight: 900;
}

.section-divider span {
  height: 1px;
  background: color-mix(in srgb, var(--vp-c-text-1) 42%, transparent);
}

.category-section {
  display: grid;
  gap: 18px;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.category-heading {
  display: grid;
  gap: 4px;
}

.category-heading p {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.category-heading h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 26px;
  line-height: 1.35;
  letter-spacing: 0;
}

@media (max-width: 960px) {
  .articles-page {
    grid-template-columns: 1fr;
    padding-inline: 18px;
  }
}

@media (max-width: 720px) {
  .articles-page {
    padding: 24px 12px 56px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
