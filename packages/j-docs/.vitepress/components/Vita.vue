<template>
    <div class="vita">
        <div class="vita-header"></div>
        <div class="vita-avatar">
            <img src="../../public/logo.png" />
        </div>
        <p class="vita-name">许仕杰</p>
        <div class="vita-info">
            <div class="vita-info-top">
                <p>生日：1994/01</p>
                <p>手机号：15101587790</p>
                <p>邮箱：15101587790@163.com</p>
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
            <template v-for="item in workLists" :key="item.title">
                <div class="vita-content-subject">
                    <p class="vita-content-subject-title">{{item.title}}</p>
                    <p class="vita-content-subject-time">{{item.time}}</p>
                </div>            
                <div class="vita-content-body">
                    <div class="vita-content-body-field">
                        <p class="vita-content-body-field-left">研发部</p>
                        <div class="vita-content-body-field-right">
                            <p>{{item.post}}</p>
                        </div>
                    </div>
                    <div class="vita-content-body-field">
                        <p class="vita-content-body-field-left">工作内容</p>
                        <div class="vita-content-body-field-right">
                            <p>{{item.content}}</p>
                        </div>
                    </div>
                    <div class="vita-content-body-field">
                        <p class="vita-content-body-field-left">工作业绩</p>
                        <div class="vita-content-body-field-right">
                            <div
                                class="vita-content-body-field-right-item"
                                v-for="childItem in item.results"
                                :key="childItem.title"
                            >
                                <p v-if="childItem.title">{{childItem.title}}</p>
                                <p
                                    v-for="(grandItem,index) in childItem.content"
                                    :key="index"
                                >- {{grandItem}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="vita-content">
            <div class="vita-content-header">
                <p class="vita-content-header-title">项目经历</p>
                <div class="vita-content-header-line"></div>
            </div>
            <template
                v-for="item in projectLists"
                :key="item.title"
            >
                <div class="vita-content-subject">
                    <p class="vita-content-subject-title">{{item.title}}</p>
                    <p class="vita-content-subject-time">{{item.time}}</p>
                </div>            
                <div class="vita-content-body">
                    <div class="vita-content-body-field">
                        <p class="vita-content-body-field-left">项目职位</p>
                        <div class="vita-content-body-field-right">
                            <p>{{item.post}}</p>
                        </div>
                    </div>
                    <div class="vita-content-body-field">
                        <p class="vita-content-body-field-left">项目内容</p>
                        <div class="vita-content-body-field-right">
                            <p>{{item.content}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const projectLists = ref([
    {
        title: '实时标注平台',
        time: '2020.06 - 至今',
        post: '前端研发',
        content: '医生根据设备采集的录音，通过便捷的操作，对其对话内容进行标注，结合底层算法逻辑，医学知识图谱和电子病历规范，生成精准的电子病历。此平台也是听译机器人优化效果的手段，除了项目的落地外，独自制定了数据合并的策略和规则，保证了最终数据的准确性。此平台每日处理6000+对话，是听译效果优化的主要工具。'
    },
    {
        title: '诊室听译机器人',
        time: '2020.03 - 至今',
        post: '前端研发',
        content: '利用自然语言处理技术和医学知识图谱，为医院打造了智能化、数字化门诊解决方案。它在医患问诊时进行实时录音，智能理解，自动生成电子病历。此项目中，技术上负责前端页面的构建，优化，重构，技术调研，技术栈为，websocket+vue+vue-router。项目上负责前端任务的分配，需求拆解，进度汇报等。'
    },
    {
        title: '标注评估集',
        time: '2020.05 - 2020.06',
        post: '后端研发',
        content: '为提升听译效果，将真实医患对话分发供医学人员标注，协助算法优化模型。为此研发了标注评估集服务，技术栈为nodejs+mysql，功能有存储，检索，导入，任务分发，任务锁等。每日为20多位医学人员，提供千条数据服务。'
    },
    {
        title: 'E展通',
        time: '2018.11 - 2019.01',
        post: '前端研发',
        content: 'E展通为公司重要的展会注册报名通道，老版本E展通需开发人员做技术含量较低的代码变更，且由于客户需求量大，变更非常频繁，出错率也较高。为减少开发人员的体力成本，提高产品质量，因此重构了E展通，技术栈为vue全家桶+element，并负责产品的前端开发并完全实现了产品的可配置化。'
    },
    {
        title: '复仇者联盟4粉丝见面会',
        time: '2018.10 - 2018.11',
        post: '前端研发',
        content: '此项目是为复仇者联盟4的明星粉丝与明星相约上海而开发的一套注册及抢票系统，主办方为迪士尼。技术栈为react+react-router+redux+ant design。利用上述技术构建前端页面，此项目日访问次数超10万次。'
    }
])

const workLists = ref([
    {
        title: '北京左医科技有限公司',
        time: '2019.03 - 至今',
        post: '前端',
        content: '主要负责公司诊室听译机器人业务线，业务有医患沟通实时录音，解析，结构化生成电子病历，实时标注，管理平台等功能，解放医生双手，提高门诊效率,目前已上约20家医院。',
        results: [
            {
                title: '提出和实现自动化测试，尝试客户端开发',
                content: [
                    '工具，库，复杂业务逻辑全面自动化测试，保证代码健壮性',
                    '尝试用electron进行客户端开发，减少对接医院方面的兼容性问题'
                ]
            },
            {
                title: '完成诊室听译机器人周边工具及平台',
                content: [
                    '管理平台开发，实现检索，管理，推荐等功能',
                    '开发实时标注平台，弥补效果不足引发的病历质量问题'
                ]
            },
            {
                title: '推动及研发病历标注评估集服务',
                content: [
                    '为提高病历结构化效果，为医学人员接入标注评估集服务',
                    '基于标注评估集服务，延伸了实时标注平台的落地'
                ]
            },
            {
                title: '完善和优化功能及性能，提高稳定性和可扩展性',
                content: [
                    '优化websocket连接,自实现心跳机制，保证连接稳定性',
                    '开发业务通用UI组件库，保证基层组件的稳定性和可扩展性，且自动化测试覆盖率达100%',
                    '优化结构化病历生成入口，减少因数据问题导致页面渲染失败，并实现视图的高度可配置化',
                    '抽象视图，设计业务功能类，提高对功能的管理和可扩展性'
                ]
            }
        ]
    },
    {
        title: '北京昆仑亿发科技股份有限公司',
        time: '2017.01 - 2019.03',
        post: '前端',
        content: '负责公司E展通业务线的开发，为所有参展人员提供快速便捷的注册系统，并且相关人员可通过后台配置系统，生成可定制化的E展通。此项目每场展会访问量超3万人，全年为300+主办方及用户提供服务。',
        results: [
            {
                title: '',
                content: [
                    '提出框架统一，实现可配制化，可定制化E展通产品，极大减少研发人力占用',
                    '负责投洽会前端开发与管理工作，并首次将React技术栈引入',
                    '助力复仇者联盟粉丝见面会，每日访问量超10万次'
                ]
            }
        ]
    }
])
</script>


<style lang="stylus">
.vita
    margin-bottom 100px
    &-header
        background #017A85
        height 200px
    &-avatar        
        width 150px
        margin -80px auto 0
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
