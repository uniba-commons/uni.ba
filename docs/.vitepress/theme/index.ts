import DefaultTheme from 'vitepress/theme'
import SiloGrid from '../components/SiloGrid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SiloGrid', SiloGrid)
  }
}
