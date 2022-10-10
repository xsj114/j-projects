<template>
    <div class="demo-tag">
        <h1 class="demo-tag-title">tag</h1>
        <h1>不带关闭按钮</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                size="small"
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                size="large"
                @click="handleClick"
            >变化趋势</j-tag>
        </div>
        <h1>带关闭按钮</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                size="small"
                closable
                @close="handleClose"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
            >
                变化趋势
            </j-tag>
            <j-tag
                closable
                @close="handleClose"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
            >
                变化趋势
            </j-tag>
            <j-tag
                closable
                size="large"
                @close="handleClose"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
            >
                变化趋势
            </j-tag>
        </div>
        <h1>选中状态</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                size="small"
                active
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                active
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                active
                @click="handleClick"
                size="large"
            >变化趋势</j-tag>
            <j-tag
                size="small"
                closable
                active
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                closable
                active
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                closable
                active
                @click="handleClick"
                size="large"
            >变化趋势</j-tag>
        </div>
        <h1>未选中状态</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                size="small"
                disable
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                disable
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                disable
                @click="handleClick"
                size="large"
            >变化趋势</j-tag>
            <j-tag
                closable
                size="small"
                disable
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                closable
                disable
                @click="handleClick"
            >变化趋势</j-tag>
            <j-tag
                closable
                disable
                @click="handleClick"
                size="large"
            >变化趋势</j-tag>
        </div>
        <h1>自定义关闭按钮</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                closable
                size="small"
            >
                变化趋势
                <template v-slot:icon>
                    <i class="j-icon_tag_close_custom custom_tag"></i>
                </template>
            </j-tag>
            <j-tag
                closable
            >
                变化趋势
                <template v-slot:icon>
                    <i class="j-icon_tag_close_custom custom_tag"></i>
                </template>
            </j-tag>
            <j-tag
                closable
                size="large"
            >
                变化趋势
                <template v-slot:icon>
                    <i class="j-icon_tag_close_custom custom_tag"></i>
                </template>
            </j-tag>
        </div>
        <h1>自定义class类</h1>
        <hr/>
        <div class="demo-tag-common">
            <j-tag
                closable
                class="custom_tag"
            >
                变化趋势
            </j-tag>
        </div>
    </div>        
</template>


<script>
import JTag from '@packages/tag'
export default {
    components: {
        JTag
    },
    methods: {
        handleClose (ev) {
            console.log(ev)
            console.log('handleClose')
        },
        handleMouseOver (ev) {
            console.log(ev)
            console.log('mouseover')
        },
        handleMouseOut (ev) {
            console.log(ev)
            console.log('mouseout')
        },
        handleClick (ev) {
            console.log(ev)
            console.log('click')
        }
    }
}
</script>


<style lang="stylus" scoped>
.demo-tag
    padding-left 40px
    &-title
        font-size 68px
    &-common
        margin-top 20px
        span
            margin-right 10px
        .custom_tag
            color red   
</style>
