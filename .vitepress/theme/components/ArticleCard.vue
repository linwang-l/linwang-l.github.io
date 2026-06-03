<script setup lang="ts">
defineProps<{
  article: {
    title: string
    href: string
    date: string
    category: string
    kind: string
    description: string
    tags: string[]
    image?: string
  }
}>()
</script>

<template>
  <a class="article-card panel" :class="{ 'has-cover': article.image }" :href="article.href">
    <div class="article-copy">
      <div class="article-meta">
        <span>{{ article.category }}</span>
        <span>{{ article.date }}</span>
        <span>{{ article.kind }}</span>
      </div>

      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>

      <div class="article-tags">
        <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
      </div>
    </div>

    <span
      v-if="article.image"
      class="article-cover"
      aria-hidden="true"
    >
      <img :src="article.image" alt="" />
    </span>
  </a>
</template>

<style scoped>
.panel {
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg) 80%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 42px rgb(0 0 0 / 12%);
}

.article-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  align-items: stretch;
  padding: 24px;
  border-radius: 40px;
  color: inherit;
  text-decoration: none;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease,
    background-color 0.22s ease;
}

.article-card.has-cover {
  grid-template-columns: minmax(0, 1fr) 190px;
}

.article-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 62%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
  box-shadow: 0 22px 54px rgb(0 0 0 / 18%);
  transform: scale(1.015);
}

.article-copy {
  min-width: 0;
}

.article-meta,
.article-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.article-meta {
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 800;
}

.article-meta span + span::before,
.article-tags span + span::before {
  content: "/";
  margin-right: 10px;
  color: var(--vp-c-text-3);
}

.article-card h2 {
  margin: 22px 0 12px;
  color: var(--vp-c-text-1);
  font-size: 36px;
  line-height: 1.18;
  letter-spacing: 0;
}

.article-card:hover h2,
.article-tags span {
  color: var(--vp-c-brand-1);
}

.article-card p {
  margin: 0 0 22px;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.8;
}

.article-cover {
  display: grid;
  width: 190px;
  height: 190px;
  place-items: center;
  overflow: hidden;
  align-self: center;
  justify-self: end;
  border-radius: 18px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent);
  text-decoration: none;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-cover:hover img {
  transform: scale(1.08);
}

@media (max-width: 720px) {
  .article-card.has-cover {
    grid-template-columns: 1fr;
  }

  .article-cover {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  .article-card h2 {
    font-size: 28px;
  }
}
</style>
