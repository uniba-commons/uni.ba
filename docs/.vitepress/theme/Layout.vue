<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import BazaarQuarter from '../components/BazaarQuarter.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <BazaarQuarter :extra="frontmatter.extraSilos ?? []" />
    </template>
    <template #home-features-before>
      <div class="uni-container">
        <h2 class="features-heading">Step into the Bazaar</h2>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.features-heading {
  padding: 48px 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  border-top: none;
}
</style>
