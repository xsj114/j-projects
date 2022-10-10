<template>
    <div class="demo-bubble">
        <h1 class="demo-bubble-title">bubble</h1>
        <h1>原始</h1>
        <hr/>
        <div class="demo-bubble-common">
            <j-bubble
                size="small"
                ref="bubble"
            >
                <j-tag
                    size="small"
                    closable
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
            >
                <j-tag
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                size="large"
            >
                <j-tag
                    size="large"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
        </div>
        <h1>向上</h1>
        <hr/>
        <div class="demo-bubble-common">
            <j-bubble
                size="small"
                placement="top"
            >
                <j-tag
                    size="small"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                placement="top"
            >
                <j-tag
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                size="large"
                placement="top"
            >
                <j-tag
                    size="large"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
        </div>
        <h1>向左</h1>
        <hr/>
        <div class="demo-bubble-common">
            <j-bubble
                size="small"
                placement="left"
            >
                <j-tag
                    size="small"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                placement="left"
            >
                <j-tag
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                size="large"
                placement="left"
            >
                <j-tag
                    size="large"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
        </div>
        <h1>向右</h1>
        <hr/>
        <div class="demo-bubble-common">
            <j-bubble
                size="small"
                placement="right"
            >
                <j-tag
                    size="small"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                placement="right"
            >
                <j-tag
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
            <j-bubble
                size="large"
                placement="right"
            >
                <j-tag
                    size="large"
                >
                    变化
                </j-tag>
                <template v-slot:content>
                    <li
                        v-for="item in content" :key="item.value"
                        @click="handleClick"
                    >{{item.value}}</li>
                </template>
            </j-bubble>
        </div>
    </div>
</template>


<script>
import JTag from '@packages/tag'
import JBubble from '@packages/bubble'
export default {
    components: {
        JBubble,
        JTag
    },
    data () {
        return {
            content: [
                {
                    value: '切换为阳性症状'
                },
                {
                    value: '切换为阴性症状'
                },
                {
                    value: '切换为疑似症状'
                }
            ]
        }
    },
    mounted() {
        this.$refs.bubble.open()
    },
    methods: {
        handleClick () {
            this.$refs.bubble.close()
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-bubble
    padding-left 40px
    &-title
        font-size 60px
    &-common
        margin-top 20px
        .j_bubble
            margin-right 20px
</style>
