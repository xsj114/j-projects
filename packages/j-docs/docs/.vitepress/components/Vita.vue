<template>
    <div class="vita">
        <div class="vita-header"></div>
        <div class="vita-avatar">
            <img src="../../assets/logo.png" />
        </div>
        <p class="vita-name">许仕杰</p>
        <div class="vita-info">
            <div class="vita-info-top">
                <p>生日：1994/01</p>
                <p>15101587790</p>
                <p>15101587790@163.com</p>
            </div>
            <p class="vita-info-empiric">5年工作经验</p>
        </div>
        <div class="vita-content">
            <div class="vita-content-header">
                <p class="vita-content-header-title">个人优势</p>
                <div class="vita-content-header-line"></div>
            </div>
            <div class="vita-content-body">
                <p class="vita-content-body-item">了解模块化开发及规划，5年B/S架构下前端实践</p>
                <p class="vita-content-body-item">主要使用javascript，vue，react，并了解部分内部实现</p>
                <p class="vita-content-body-item">了解前端常用的设计模式</p>
                <p class="vita-content-body-item">善于学习与研究功能背后的技术原理</p>
                <p class="vita-content-body-item">喜欢学习新技术且善于规划与总结</p>
            </div>
        </div>
        <div class="vita-content">
            <div class="vita-content-header">
                <p class="vita-content-header-title">工作经历</p>
                <div class="vita-content-header-line"></div>
            </div>
            <div class="vita-content-subject">
                <p class="vita-content-subject-title">北京左医科技有限公司</p>
                <p class="vita-content-subject-time">2019.03 - 至今</p>
            </div>            
            <div class="vita-content-body">
                <div class="vita-content-body-field">
                    <p class="vita-content-body-field-left">研发部</p>
                    <div class="vita-content-body-field-right">
                        <p >前端</p>
                    </div>
                </div>
                <div class="vita-content-body-field">
                    <p class="vita-content-body-field-left">工作内容</p>
                    <div class="vita-content-body-field-right">
                        <p>主要负责公司诊室听译机器人业务线，业务有医患沟通实时录音，解析，结构化生成电子病历，实时标注，管理平台等功能，解放医生双手，提高门诊效率,目前已上约20家医院。</p>
                    </div>
                </div>
                <div class="vita-content-body-field">
                    <p class="vita-content-body-field-left">工作业绩</p>
                    <div class="vita-content-body-field-right">
                        <div class="vita-content-body-field-right-item">
                            <p>提出和实现自动化测试，尝试客户端开发</p>
                            <p>- 工具，库，复杂业务逻辑全面自动化测试，保证代码健壮性</p>
                            <p>- 尝试用electron进行客户端开发，减少对接医院方面的兼容性问题</p>
                        </div>
                        <div class="vita-content-body-field-right-item">
                            <p>完成诊室听译机器人周边工具及平台</p>
                            <p>- 管理平台开发，实现检索，管理，推荐等功能</p>
                            <p>- 开发实时标注平台，弥补效果不足引发的病历质量问题</p>
                        </div>
                        <div class="vita-content-body-field-right-item">
                            <p>推动及研发病历标注评估集服务</p>
                            <p>- 为提高病历结构化效果，为医学人员接入标注评估集服务</p>
                            <p>- 基于标注评估集服务，延伸了实时标注平台的落地</p>
                        </div>
                        <div class="vita-content-body-field-right-item">
                            <p>完善和优化功能及性能，提高稳定性和可扩展性</p>
                            <p>- 优化websocket连接,自实现心跳机制，保证连接稳定性</p>
                            <p>- 开发业务通用UI组件库，保证基层组件的稳定性和可扩展性，且自动化测试覆盖率达100%</p>
                            <p>- 优化结构化病历生成入口，减少因数据问题导致页面渲染失败，并实现视图的高度可配置化</p>
                            <p>- 抽象视图，设计业务功能类，提高对功能的管理和可扩展性</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>


<style lang="stylus">
.vita
    &-header
        background #017A85
        height 100px
    &-avatar        
        width 150px
        margin -30px auto 0
    &-name
        font-size 26px
        font-weight bold
        text-align center
        margin-top 16px
    &-info
        margin-top 16px
        color #ccc
        font-size 16px
        &-top
            display flex
            justify-content: center;
            p
                margin-right 20px
        &-empiric
            margin-top 16px
            text-align center            
    &-content
        padding 0 80px
        margin-top 40px
        &-header
            display flex
            align-items center
            &-title
                font-size 22px
                font-weight bold
            &-line
                height 1px
                border 1px solid #ccc
                flex 1
                margin-left 40px
        &-body
            margin-top 30px
            font-size 16px
            line-height 32px
            &-field
                display flex
                margin-top 16px
                &-left
                    width 100px
                    margin-right 30px    
                &-right
                    flex 1
                    &-item
                        margin-bottom 20px
        &-subject
            display flex
            justify-content space-between
            margin-top 30px
            &-title
                font-size 20px
                font-weight bold
            &-time
                color #ccc
</style>
