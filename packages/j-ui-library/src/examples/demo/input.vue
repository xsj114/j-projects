<template>
    <div class="demo-input">
        <h1 class="demo-input-title">input</h1>
        <h1>原始</h1>
        <hr/>
        <div class="demo-input-common">
            <h3>输入框</h3>
            <j-input
                size="small"
                placeholder="请输入内容"
                @focus="handleFocus"
                @blur="handleBlur"
                class="abc"
                v-model="value"
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="testValue"
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                size="large"
            >
            </j-input>
            <h3>数值框</h3>
            <j-input
                size="small"
                placeholder="请输入内容"
                type="number"
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                type="number"
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                size="large"
                type="number"
            >
            </j-input>
        </div>
        <h1>圆角</h1>
        <hr/>
        <div class="demo-input-common">
            <h3>输入框</h3>
            <j-input
                size="small"
                placeholder="请输入内容"
                round
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                round
            >
            </j-input>
            <j-input
                size="large"
                placeholder="请输入内容"
                round
            >
            </j-input>
            <h3>数值框</h3>
            <j-input
                size="small"
                type="number"
                placeholder="请输入内容"
                round
            >
            </j-input>
            <j-input
                placeholder="请输入内容"
                type="number"
                round
            >
            </j-input>
            <j-input
                size="large"
                type="number"
                placeholder="请输入内容"
                round
            >
            </j-input>
        </div>
        <h1>禁用状态</h1>
        <hr/>
        <div class="demo-input-common">
            <h3>输入框</h3>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
                <j-input
                    size="large"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    size="large"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
            </div>
            <h3>数值框</h3>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    type="number"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    type="number"
                    disabled
                >
                </j-input>
                <j-input
                    size="large"
                    type="number"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    type="number"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    type="number"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    size="large"
                    type="number"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
            </div>
            <h3>密码框</h3>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    type="password"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    type="password"
                    disabled
                >
                </j-input>
                <j-input
                    size="large"
                    type="password"
                    placeholder="请输入内容"
                    disabled
                >
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    type="password"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    type="password"
                    disabled
                    round
                >
                </j-input>
                <j-input
                    size="large"
                    type="password"
                    placeholder="请输入内容"
                    disabled
                    round
                >
                </j-input>
            </div>
        </div>
        <h1>带icon输入框</h1>
        <hr/>
        <div class="demo-input-common">
            <h3>输入框</h3>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    placeholder="请输入内容"
                >
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    size="large"
                    placeholder="请输入内容"
                >
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    placeholder="请输入内容"
                    size="small"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                >
                
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    size="large"
                    placeholder="请输入内容"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    size="small"
                    round
                    placeholder="请输入内容"
                >
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    round
                    placeholder="请输入内容"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    round
                    placeholder="请输入内容"
                    size="large"
                >
                
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    round
                    placeholder="请输入内容"
                    size="small"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    round
                    placeholder="请输入内容"
                >
                
                    <template v-slot:prefix>
                        <i
                            class="j-icon_search"
                        ></i>
                    </template>
                </j-input>
                <j-input
                    size="large"
                    round
                    placeholder="请输入内容"
                >
                    <template v-slot:suffix>
                        <i
                            class="j-icon_calendar"
                        ></i>
                    </template>
                </j-input>
            </div>
        </div>
        <h1>密码框</h1>
        <hr/>
        <div class="demo-input-common">
            <div class="demo-input-common-row">
                <j-input
                    round
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="small"
                >
                </j-input>
                <j-input
                    round
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                >
                </j-input>
                <j-input
                    round
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="large"
                >
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                >
                </j-input>
            </div>
        </div>
        <h1>可清空输入框</h1>
        <hr/>
        <div class="demo-input-common">
            <div class="demo-input-common-row">
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                    size="small"
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                    size="large"
                >
                </j-input>
            </div>
            <div class="demo-input-common-row">
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                    size="small"
                    round
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                    round
                >
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    clearable
                    v-model="inputTwo"
                    size="large"
                    round
                >
                </j-input>
            </div>
        </div>
        <h1>复合输入框</h1>
        <hr/>
        <h3>清楚按钮</h3>
        <div class="demo-input-common">
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
                size="small"
                @clear="clearFn"
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
                size="large"
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
                size="small"
                @clear="clearFn"
                round
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
                round
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                clearable
                v-model="inputTwo"
                size="large"
                round
            >
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
        </div>
        <h3>带前缀或后缀的</h3>
        <div class="demo-input-common">
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
                size="small"
            >
                <template v-slot:suffix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
            >
                <template v-slot:suffix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
                size="large"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
                size="small"
                round
            >
                <template v-slot:suffix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
                round
            >
                <template v-slot:suffix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
            <j-input
                placeholder="请输入内容"
                v-model="inputTwo"
                size="large"
                round
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-input>
        </div>
        <h3>密码框</h3>
        <div class="demo-input-common">
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="small"
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="large"
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="small"
                    round
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    round
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
                <j-input
                    placeholder="请输入内容"
                    show-password
                    v-model="inputOne"
                    ref="inputDom"
                    size="large"
                    round
                >
                    <template v-slot:prepend>
                        Http://            
                    </template>
                    <template v-slot:append>
                         .com           
                    </template>
                </j-input>
        </div>
    </div>
</template>


<script>
import JInput from '@packages/input'

export default {
    components: {
        JInput
    },    
    data () {
        return {
            inputOne: '',
            inputTwo: '',
            testValue: '',
            value: ''
        }
    },
    mounted () {
        this.$refs.inputDom.focus()
        this.$refs.inputDom.blur()
    },
    methods: {
        clearFn () {
            console.log('clear')
        },
        handleFocus () {
            console.log('focus')
        },
        handleBlur () {
            console.log('blur')
        }
    },
    watch: {
        input () {
            // console.log(newVal)
        }
    }
}    


</script>

<style  lang="stylus" scoped>
.demo-input
    padding-left 40px
    &-title
        font-size 68px
    &-common
        margin-top 20px
        div
            margin-right 20px
        &-row
            margin-bottom 20px
</style>
