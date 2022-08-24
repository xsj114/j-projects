import DefaultTheme from 'vitepress/theme'
import ListProjects from '../../components/ListProjects.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('ListProjects', ListProjects)
    }
}
