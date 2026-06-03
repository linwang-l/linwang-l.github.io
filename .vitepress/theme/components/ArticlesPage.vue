<script setup lang="ts">
import ArticleCard from './ArticleCard.vue'
import { data as articleData } from '../data/articles.data'
</script>

<template>
  <section class="articles-page">
    <aside class="articles-sidebar">
      <section class="profile-card panel">
        <img class="avatar" src="/avatar.png" alt="Linwang-l 的头像" />
        <h1>文章</h1>
        <span class="name-mark" aria-hidden="true"></span>
        <p>按照时间顺序整理站点里的文章和页面。</p>
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
        <p class="eyebrow">Archive</p>
        <h2>按时间倒序展示文章。</h2>
        <p>最新内容在上方，旧内容依次向下排列。</p>
      </section>

      <div class="section-divider">
        <span></span>
        <strong>全部文章</strong>
        <span></span>
      </div>

      <ArticleCard v-for="article in articleData.articles" :key="article.href" :article="article" />
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
}
</style>
