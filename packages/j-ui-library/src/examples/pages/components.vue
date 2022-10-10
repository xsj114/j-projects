<template>
    <div id="docs">
        <side-nav
            :data="navConfig[flag]"    
            :base="`/${flag}`"
        ></side-nav>
        <router-view></router-view>
    </div>
</template>


<script>
import sideNav from '@examples/components/side-nav'
import navConfig from '@examples/nav.config'

export default {
    components: {
        sideNav
    },
    data () {
        return {
            flag: this.$route.meta.flag,            
            navConfig
        }
    }
}
</script>


<style lang="stylus" scoped>
#docs
    display flex
    min-height 100%
</style>
