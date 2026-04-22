import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import BazaarQuarter from './../components/BazaarQuarter.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BazaarQuarter', BazaarQuarter)
  }
}
