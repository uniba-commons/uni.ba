<template>
  <div class="silo-section">
    <div v-if="loading" class="silo-loading">Loading...</div>
    <div v-else id="silo-grid" class="silo-grid">
      <a
        v-for="silo in silos"
        :key="silo.slug"
        class="silo-card"
        :href="silo.url ?? siloURL(silo.slug)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-top">
          <div :class="['card-label', { empty: !silo.label }]">
            {{ silo.label || '(no label)' }}
          </div>
          <div class="card-slug">{{ silo.slug }}</div>
        </div>
        <div v-if="silo.origin?.url" class="card-bottom">
          <a
            class="origin-btn"
            :href="silo.origin.url"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop
          >
            <span v-if="silo.origin.provider === 'discord'" v-html="DISCORD_ICON" />
            {{ providerLabel(silo.origin.provider) }}
          </a>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const API_URL = 'https://funny-brigadeiros-022618.netlify.app/api/v0/silos'

const DISCORD_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>`

interface Silo {
  slug: string
  label?: string
  url?: string
  origin?: {
    url: string
    provider: string
  }
}

const EXTRA_SILOS: Silo[] = [
  { slug: 'villamoderna', label: 'ビラ・モデルナ', url: 'https://nanika-access.uni.ba/villamoderna' },
  { slug: 'midoriso', label: 'midori.so', url: 'https://nanika-access.uni.ba/midoriso' }
]

const silos = ref<Silo[]>([])
const loading = ref(true)

function siloURL(slug: string): string {
  return `https://katsudou-prd.teamenv.workers.dev/~/${slug.replace(/^@/, '')}`
}

function providerLabel(provider: string): string {
  const map: Record<string, string> = { discord: 'Discord' }
  return map[provider] ?? provider
}

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: Silo[] = await res.json()
    silos.value = [...data, ...EXTRA_SILOS]
  } catch (err) {
    console.error('SiloGrid: failed to load silos from API, falling back to static entries', err)
    silos.value = [...EXTRA_SILOS]
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.silo-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 0;
}

.silo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 16px;
}

.silo-card {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  text-decoration: none;
  color: inherit;
}

.silo-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.card-top {
  flex: 1;
}

.card-label {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  word-break: break-word;
  color: var(--vp-c-text-1);
}

.card-label.empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-weight: 400;
}

.card-slug {
  margin-top: 6px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  word-break: break-all;
}

.card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.origin-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s ease;
  white-space: nowrap;
}

.origin-btn:hover {
  background: var(--vp-c-brand-2);
}

.silo-loading {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
