<template>
    <div class="side-nav">
        <ul>
            <li v-for="item in data" :key="item.name">
                <router-link
                    :to="base+item.path"
                    v-text="item.ct_name"
                    active-class="active"
                    exact
                ></router-link>
            </li>            
        </ul>        
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        base: {
            type: String,
            default: ''
        }
    }
}    
</script>

<style lang="stylus" scoped>
.side-nav
    width 300px
    background #F2F2F2
    ul
        margin 0
        padding 10px 0 0 0
    li 
        list-style none
    a
        color #333
        font-size 18px
        line-height 36px
        text-decoration none
        text-align center
        margin 0 0 0 15px
        &.active
            color #409EFF
</style>
