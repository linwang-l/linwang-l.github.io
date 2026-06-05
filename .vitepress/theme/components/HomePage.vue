<script setup>
import ArticleCard from './ArticleCard.vue'
import { data as articleData } from '../data/articles.data'
</script>

<template>
  <section class="blog-home">
    <aside class="home-sidebar" aria-label="个人资料">
      <section class="profile-card panel">
        <img class="avatar" src="/avatar.png" alt="linwang-l 的头像" />
        <h1>linwang-l</h1>
        <span class="name-mark" aria-hidden="true"></span>
        <p>乘上风，用白之羽翼与君同行，青色缝隙间的常夏之岛</p>

        <nav class="social-links" aria-label="社交链接">
          <a href="https://github.com/linwang-l" aria-label="GitHub">Git</a>
          <a href="/markdown-examples" aria-label="有关我的">Me</a>
          <a href="/api-examples" aria-label="我都做什么">Do</a>
          <a href="/hello-world" aria-label="文字展示">Txt</a>
        </nav>
      </section>

      <section class="stats-card panel" aria-label="站点概览">
        <a class="stat-row" href="/markdown-examples">
          <span>有关我的</span>
          <strong>01</strong>
        </a>
        <a class="stat-row" href="/api-examples">
          <span>我都做什么</span>
          <strong>02</strong>
        </a>
        <a class="stat-row" href="/hello-world">
          <span>文字展示</span>
          <strong>03</strong>
        </a>
      </section>
    </aside>

    <main class="home-main">
      <ArticleCard :article="articleData.introArticle" />

      <div class="section-divider">
        <span></span>
        <strong>主页入口</strong>
        <span></span>
      </div>

      <ArticleCard v-for="article in articleData.homeEntries" :key="article.href" :article="article" />

    </main>
  </section>
</template>

<style scoped>
.blog-home {
  width: min(100%, 1220px);
  margin: 0 auto;
  padding: 40px 24px 72px;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 32px;
}

.home-sidebar {
  display: grid;
  align-content: start;
  gap: 28px;
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
  width: 176px;
  height: 176px;
  border: 4px solid color-mix(in srgb, var(--vp-c-bg) 84%, transparent);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 18px 42px rgb(0 0 0 / 18%);
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

.profile-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.8;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  margin-top: 24px;
}

.social-links a {
  display: grid;
  min-height: 44px;
  place-items: center;
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.18s ease, background-color 0.18s ease;
}

.social-links a:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 24%, transparent);
  transform: translateY(-2px);
}

.stats-card {
  padding: 14px 20px;
}

.stat-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  min-height: 66px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.stat-row + .stat-row {
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 78%, transparent);
}

.stat-row span {
  font-size: 18px;
  font-weight: 800;
}

.stat-row strong {
  color: var(--vp-c-text-2);
  font-size: 28px;
  line-height: 1;
}

.home-main {
  display: grid;
  gap: 24px;
}

.section-divider {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  color: var(--vp-c-text-1);
  font-weight: 900;
  text-shadow: 0 2px 8px rgb(0 0 0 / 18%);
}

.section-divider span {
  height: 1px;
  background: color-mix(in srgb, var(--vp-c-text-1) 42%, transparent);
}

@media (max-width: 960px) {
  .blog-home {
    grid-template-columns: 1fr;
    padding-inline: 18px;
  }

  .home-sidebar {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .blog-home {
    padding: 24px 12px 56px;
  }
}
</style>
