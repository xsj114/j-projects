<template>
    <div class="demo-select">
        <h1 class="demo-select-title">select</h1>
        <h1>基本</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="value"
                placeholder="请选择选项"
                @focus="focusFn"
                @blur="blurFn"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="value"
                @visible-change="fn"
                class="special"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
                <template v-slot:suffix>
                    <span class="triangle-box">
                        <span :class="['triangle-box-triangle',onoff?'triangle-box-trans':'']"></span>
                    </span>        
                </template>
            </j-select>
            <j-select
                size="large"
                v-model="value"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>禁用</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="value"
                disabled
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="value"
                disabled
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="value"
                disabled
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>可清空单选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="value"
                clearable
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="value"
                clearable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="value"
                clearable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>多选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="multipleValue"
                multiple
                clearable
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="multipleValue"
                clearable
                multiple
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="multipleValueTwo"
                clearable
                multiple
                disabled
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>单选创建选项</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="createValue"
                allow-create
                filterable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="createValueOne"
                allow-create
                filterable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="createValueTwo"
                allow-create
                filterable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>多选创建选项</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="multipleCreateValue"
                allow-create
                filterable
                multiple
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="multipleCreateValueOne"
                allow-create
                filterable
                multiple
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="multipleCreateValueTwo"
                allow-create
                filterable
                multiple
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>可搜索单选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="searchValueTest"
                filterable
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="searchValue"
                filterable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="searchValue"
                filterable
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>可搜索多选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="searchMultipleValue"
                filterable
                multiple
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="searchMultipleValue"
                filterable
                multiple
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="searchMultipleValue"
                filterable
                multiple
            >
                <j-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>远程搜索单选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="remoteValue"
                filterable
                remote
                :remote-method="remoteFn"
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="remoteValue"
                filterable
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="remoteValue"
                filterable
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>远程搜索多选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="remoteMultipleValue"
                filterable
                multiple
                remote
                :remote-method="remoteFn"
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="remoteMultipleValue"
                filterable
                multiple
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="remoteMultipleValue"
                filterable
                multiple
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>远程搜索&创建选项单选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="remoteValue"
                filterable
                allow-create
                remote
                :remote-method="remoteFn"
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="remoteValue"
                filterable
                allow-create
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="remoteValue"
                filterable
                allow-create
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
        <h1>远程搜索&创建选项多选</h1>
        <hr/>
        <div class="demo-select-common">
            <j-select
                size="small"
                v-model="remoteMultipleValue"
                filterable
                allow-create
                multiple
                remote
                :remote-method="remoteFn"
                placeholder="请选择选项"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="small"
                ></j-option>
            </j-select>
            <j-select
                v-model="remoteMultipleValue"
                filterable
                allow-create
                multiple
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                ></j-option>
            </j-select>
            <j-select
                size="large"
                v-model="remoteMultipleValue"
                filterable
                allow-create
                multiple
                remote
                :remote-method="remoteFn"
            >
                <j-option
                    v-for="item in remoteOptions"
                    :key="item.value"
                    :value="item.value"
                    size="large"
                ></j-option>
            </j-select>
        </div>
    </div>
</template>


<script>
import JSelect from '@packages/select'
import JOption from '@packages/select/src/option.vue'
export default {
    data () {
        return {
            remoteOptions: [
                {
                    value: '黄金糕'
                },
                {
                    value: '双皮奶'
                },
                {
                    value: '喝可乐'
                },
                {
                    value: '喝雪碧'
                }
            ],
            options: [
                {
                    value: '黄金糕'
                },
                {
                    value: '双皮奶'
                },
                {
                    value: '喝可乐'
                },
                {
                    value: '喝雪碧'
                }
            ],
            value: '',
            multipleValue: ['黄金糕','双皮奶','喝可乐'],
            multipleValueTwo: ['双皮奶','喝可乐'],
            onoff: false,
            createValue: '1',
            createValueOne: '',
            createValueTwo: '',
            multipleCreateValue: [],
            multipleCreateValueOne: [],
            multipleCreateValueTwo: [],
            searchValue: '',
            searchMultipleValue: [],
            remoteValue: '',
            remoteMultipleValue: [],
            searchValueTest: '1'
        }
    },
    components: {
        JSelect,
        JOption
    },
    methods: {
        focusFn () {
            console.log('focus')
        },
        blurFn() {
            console.log('blur')
        },
        fn (onoff) {
            this.onoff = onoff
        },
        remoteFn (queryString) {
            fetch (`https://dpss.zuoshouyisheng.com/dpss_sug/sug?index_type=entity&category=%3CSYMPTOM%3E&has_extra=1&prefix=${queryString}&hs_add_id=5c99b1a09ea2ea68c824dad8`,{
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res=>{
                return res.json()
            }).then(res=>{
                let data =res.sug_list.map(ele => {
                    ele.value = ele.text
                    ele.label = ele.text
                    return ele
                })
                this.remoteOptions = data
            })
        }
    }
}
</script>


<style lang="stylus">
.demo-select
    padding-left 40px
    &-title
        font-size 68px
    &-common
        margin-top 20px
        div
            margin-right 20px
    .triangle-box
        width 100%
        height 100%
        background #4865FF
        display flex
        align-items center
        justify-content center
        border-top-right-radius 4px
        border-bottom-right-radius 4px
        transform rotateZ(-0deg)
        &-triangle
            width 0
            height 0
            border-width 6px
            margin-top 6px
            border-style solid
            border-color  white  transparent transparent transparent
            transform rotateZ(0deg)
            transition transform .3s
        &-trans
            transform rotateZ(-180deg) translateY(6px)
    .special
        .j_input_suffix
            right 0px !important
        .j_input_inner
            border-color #4865FF
</style>
