<template>
    <div class="list-projects">
        <div
            v-for="item in lists"
            class="list-projects-item"
            :key="item.title"
        >
            <p class="list-projects-item-title">{{item.title}}</p>
            <p class="list-projects-item-describe">{{item.describe}}</p>
            <div class="list-projects-item-contents">
                <span class="list-projects-item-contents-item">
                    <a>文档</a>
                </span>
                <span class="list-projects-item-contents-item">
                    <a v-if="item.address">地址</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const lists = ref([
    {
        title: 'j-check-word',
        describe: 'A tool for checking English words',
        path: 'j-check-word',
        address: ''
    },
    {
        title: 'j-http-code',
        describe: 'Tool to set and get the meaning of http status codes',
        path: 'j-http-code',
        address: ''
    },
    {
        title: 'j-is',
        describe: 'A type checking library',
        path: 'j-is',
        address: true
    }
])
</script>


<style lang="stylus">
.list-projects
    width 900px
    .list-projects-item
        border-radius 4px
        padding 16px
        border 1px solid #eaecef
        margin-bottom 20px
        &-title
            font-weight 600
            color #2c3e50
            font-size 18px
            line-height 16px
        &-describe
            color #606266
            font-size 16px
        &-contents
            &-item
                font-size 16px
                margin-right 20px
                a
                    font-size 16px
                    color #405eff
                    cursor pointer
</style>
