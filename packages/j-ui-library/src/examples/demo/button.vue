<template>
    <div class="demo-button">
        <h1 class="demo-tag-title">button</h1>
        <h1>原始</h1>
        <hr/>
        <div class="demo-button-common">
            <j-button
                size="small"
                @click="handleClick"
            >添加</j-button>
            <j-button
            >添加</j-button>
            <j-button
                size="large"        
            >添加</j-button>
            <j-button
                size="small"
                border
            >添加</j-button>
            <j-button
                border
            >添加</j-button>
            <j-button
                size="large"        
                border
            >添加</j-button>
        </div>
        <h1>圆角</h1>
        <hr/>
        <div class="demo-button-common">
            <j-button
                size="small"
                round
            >添加</j-button>
            <j-button
                round
            >添加</j-button>
            <j-button
                size="large"        
                round
            >添加</j-button>
            <j-button
                size="small"
                border
                round
            >添加</j-button>
            <j-button
                round
                border
            >添加</j-button>
            <j-button
                size="large"        
                round
                border
            >添加</j-button>
        </div>
        <h1>带icon</h1>
        <hr/>
        <div class="demo-button-common">
            <j-button
                size="small"        
                @click="handleClick"
            >
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button>
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="large"
            >
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="small"        
                border
            >
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                border
            >
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="large"
                border
            >
                添加
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
        </div>
        <h1>只有icon</h1>
        <hr/>
        <div class="demo-button-common">
            <j-button
                size="small"        
            >
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button>
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="large"
            >
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="small"        
                border
            >
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                border
            >
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
            <j-button
                size="large"
                border
            >
                <i class="custom_icon j-icon_right_arrow"></i>
            </j-button>
        </div>
        <h1>禁用状态</h1>
        <hr/>
        <div class="demo-button-common">
            <j-button
                size="small"
                disabled
            >添加</j-button>
            <j-button
                disabled
            >添加</j-button>
            <j-button
                size="large"        
                disabled
            >添加</j-button>
            <j-button
                size="small"
                disabled
                border
            >添加</j-button>
            <j-button
                border
                disabled
            >添加</j-button>
            <j-button
                size="large"        
                border
                disabled
            >添加</j-button>
        </div>
    </div>        
</template>

<script>
import JButton from '@packages/button'
export default {
    components: {
        JButton
    },
    methods: {
        handleClick (ev) {
            console.log('click')
            console.log(ev)
        }
    }
}
</script>

<style lang="stylus" scoped>
.demo-button
    padding-left 40px
    &-title
        font-size 60px
    &-common
        margin-top 20px
        button
            margin-right 20px
        .custom_icon
            font-size 12px
</style>
