import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CaseStudyMeta from './CaseStudyMeta.vue'
import PrototypeViewer from './PrototypeViewer.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, { 'doc-before': () => h(CaseStudyMeta) })
  },
  enhanceApp({ app }) {
    app.component('PrototypeViewer', PrototypeViewer)
  },
}
