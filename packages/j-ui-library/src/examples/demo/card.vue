<template>
    <div class="demo-card">
        <h1 class="demo-card-title">card</h1>
        <h1>原始</h1>
        <hr/>
        <div class="demo-card-common">
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="small"
                @mouseup="handleMouseup"
                @mousedown="handleMousedown"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="small"
            >
            </j-card>    
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
            >
            </j-card>    
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="large"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="large"
            >
            </j-card>    
        </div>
        <h1>横向</h1>
        <hr/>
        <div class="demo-card-common">
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="small"
                direction="horizontal"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="small"
                direction="horizontal"
            >
            </j-card>    
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                direction="horizontal"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                direction="horizontal"
            >
            </j-card>    
            <j-card
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                direction="horizontal"
                size="large"
            >
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                direction="horizontal"
                size="large"
            >
            </j-card>    
        </div>
        <h1>自定义医生患者图标</h1>
        <hr/>
        <div class="demo-card-common">
            <j-card
                text="我是自定义播放图标"
                size="small"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_doctor"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
                size="small"
                role="doctor"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_patient"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_doctor"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
                role="doctor"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_patient"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
                size="large"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_doctor"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
                size="large"
                role="doctor"
            >
                <template v-slot:avatar>
                    <i class="j-icon_card_patient"></i>
                </template>
            </j-card>    
        </div>
        <h1>带播放图标</h1>
        <hr/>
        <div class="demo-card-common">
            <j-card
                text="我是自定义播放图标"
                size="small"
            >
                <template v-slot:prefix>
                    <i class="j-icon_card_start"></i>
                </template>
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>你两天</s1>前出现<s2>头</s2>疼"
                size="small"
            >
                <template v-slot:prefix >
                    <i class="j-icon_card_start"
                        @click="handlePlayClick"
                        v-if="!isShow"
                    ></i>
                    <i
                        class="j-icon_card_end"
                        v-if="isShow"
                    ></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
            >
                <template v-slot:prefix>
                    <i class="j-icon_card_end"></i>
                </template>
            </j-card>    
            <j-card
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
            >
                <template v-slot:prefix>
                    <i class="j-icon_card_start" v-if="!isShow"></i>
                    <i class="j-icon_card_end" v-if="isShow"></i>
                </template>
            </j-card>    
            <j-card
                text="我是自定义播放图标"
                size="large"
                direction="horizontal"
            >
                <template v-slot:prefix>
                    <i class="j-icon_card_end"></i>
                </template>
            </j-card>    
            <j-card
                direction="horizontal"
                role="doctor"
                text="<s1>两天</s1>前出现<s2>头</s2>疼"
                size="large"
            >
                <template v-slot:prefix>
                    <i class="j-icon_card_start" v-if="!isShow"></i>
                    <i class="j-icon_card_end" v-if="isShow"></i>
                </template>
            </j-card>    
        </div>
    </div>
</template>

<script>
import JCard from '@packages/card'
export default {
    data () {
        return {
            isShow: false
        } 
    },
    components: {
        JCard
    },    
    methods: {
        handlePlayClick () {
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            },2000)
        },
        handleMouseup (event) {
            console.log(event)
        },
        handleMousedown (event) {
            console.log(event)
        }
    }
}
</script>

<style  lang="stylus" scoped>
.demo-card
    padding-left 40px
    &-title
        font-size 68px
    &-common
        margin-top 20px
        div
            margin-right 20px
        s2
            color yellow
.ss
    color yellow
</style>
