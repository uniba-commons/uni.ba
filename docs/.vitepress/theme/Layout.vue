<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiloGrid from '../components/SiloGrid.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <SiloGrid :extra="frontmatter.extraSilos ?? []" />
    </template>
    <template #home-features-before>
      <h2 class="features-heading">Step into the Bazaar</h2>
    </template>
  </Layout>
</template>

<style scoped>
.features-heading {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  border-top: none;
}
</style>
