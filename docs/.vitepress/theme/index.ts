import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import SiloGrid from './../components/SiloGrid.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('SiloGrid', SiloGrid)
  }
}
