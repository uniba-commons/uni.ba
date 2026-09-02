<template>
  <section v-if="news.length" class="uni-container news-section">
    <h2 class="news-heading">News</h2>
    <ul class="news-list">
      <li v-for="item in news" :key="item.url" class="news-item">
        <a class="news-row" :href="item.url">
          <img
            v-if="thumbnailUrl(item.thumbnail)"
            class="news-thumb"
            :src="thumbnailUrl(item.thumbnail)"
            alt=""
            loading="lazy"
          >
          <span v-else class="news-thumb news-thumb-empty" aria-hidden="true"></span>
          <span class="news-body">
            <time v-if="item.date" class="news-date" :datetime="item.date">{{ formatDate(item.date) }}</time>
            <span class="news-title">{{ item.title }}</span>
            <span v-if="item.tag" class="news-tag">{{ item.tag }}</span>
          </span>
          <span class="news-arrow" aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { data as news } from '../news.data'

// Thumbnails live next to their page in docs/news/, so resolve the file name
// from the frontmatter through Vite to get the hashed build URL.
const thumbnails = import.meta.glob<string>('../../news/*.{jpg,jpeg,png,webp,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const thumbnailUrls: Record<string, string> = Object.fromEntries(
  Object.entries(thumbnails).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1), url]),
)

function thumbnailUrl(name?: string): string | undefined {
  return name ? thumbnailUrls[name] : undefined
}

function formatDate(date: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(date)
  return m ? `${m[1]}.${m[2]}.${m[3]}` : date
}
</script>

<style scoped>
.news-section {
  padding-top: 24px;
  padding-bottom: 24px;
}

.news-heading {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.news-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--vp-c-divider);
}

.news-item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.news-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 4px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
}

a.news-row:hover {
  color: var(--vp-c-brand-1);
}

.news-thumb {
  flex: none;
  width: 96px;
  height: 54px;
  object-fit: cover;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.news-thumb-empty {
  display: block;
}

.news-body {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.news-date {
  flex: none;
  min-width: 92px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.news-title {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  word-break: break-word;
}

.news-tag {
  flex: none;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.news-arrow {
  flex: none;
  color: var(--vp-c-text-3);
  transition: transform 0.15s ease, color 0.15s ease;
}

a.news-row:hover .news-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .news-row {
    gap: 12px;
  }

  .news-thumb {
    width: 80px;
    height: 56px;
  }

  .news-body {
    flex-wrap: wrap;
    gap: 6px 12px;
  }

  .news-title {
    flex: 1 1 100%;
    order: 2;
  }

  .news-date {
    order: 1;
    min-width: 0;
  }

  .news-tag {
    order: 1;
  }

  .news-arrow {
    display: none;
  }
}
</style>
