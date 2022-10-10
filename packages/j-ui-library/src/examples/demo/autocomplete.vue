<template>
    <div class="demo-autocomplete">
        <h1 class="demo-autocomplete-title">autocomplete</h1>
        <h1>原始</h1>
        <hr/>
        <div class="demo-autocomplete-common">
            <j-autocomplete
                v-model="test"
                placeholder="请输入内容"
                size="small"
                :fetch-suggest="querySearch"
                value-key="text"
                :append-to-body="false"
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容啊"
                :fetch-suggest="querySearch"
                value-key="text"
                placement="left"
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="large"
                :fetch-suggest="querySearch"
                value-key="text"
                placement="right"
            >
            </j-autocomplete>
        </div>
        <h1>圆角</h1>
        <hr/>
        <div class="demo-autocomplete-common">
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="small"
                :fetch-suggest="querySearch"
                value-key="text"
                round
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                round
                :fetch-suggest="querySearch"
                value-key="text"
                placement="top"
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="large"
                :fetch-suggest="querySearch"
                value-key="text"
                round
            >
            </j-autocomplete>
        </div>
        <h1>禁用</h1>
        <hr/>
        <div class="demo-autocomplete-common">
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="small"
                disabled
                :fetch-suggest="querySearch"
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                round
                disabled
                :fetch-suggest="querySearch"
            >
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="large"
                round
                disabled
                :fetch-suggest="querySearch"
            >
            </j-autocomplete>
        </div>
        <h1>带icon输入框</h1>
        <hr/>
        <div class="demo-autocomplete-common">
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="small"
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                round
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
            </j-autocomplete>
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="large"
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:suffix>
                    <i
                        class="j-icon_calendar"
                    ></i>
                </template>
            </j-autocomplete>
        </div>
        <h1>复合输入框</h1>
        <hr/>
        <div class="demo-autocomplete-common">
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="small"
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:suffix>
                    <i
                        class="j-icon_calendar"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-autocomplete>    
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:suffix>
                    <i
                        class="j-icon_calendar"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-autocomplete>    
            <j-autocomplete
                v-model="inputSuggest"
                placeholder="请输入内容"
                size="large"
                :fetch-suggest="querySearch"
                value-key="text"
            >
                <template v-slot:prefix>
                    <i
                        class="j-icon_search"
                    ></i>
                </template>
                <template v-slot:suffix>
                    <i
                        class="j-icon_calendar"
                    ></i>
                </template>
                <template v-slot:prepend>
                    Http://            
                </template>
                <template v-slot:append>
                     .com           
                </template>
            </j-autocomplete>    
        </div>
    </div>
</template>


<script>
import JAutocomplete from '@packages/autocomplete'
export default {
    components: {
        JAutocomplete
    }, 
    data () {
        return {
            inputSuggest: '',
            test: '1'
        }
    },
    methods: {
        querySearch (queryString,cb) {
            fetch (`http://192.168.0.207/dpss_sug/sug?index_type=entity&category=%3CSYMPTOM%3E&has_extra=1&prefix=${queryString}&hs_add_id=5c99b1a09ea2ea68c824dad8`,{
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res=>{
                return res.json()
            }).then(res=>{
                cb(res.sug_list)
            })
        }
    }
}
</script>


<style  lang="stylus" scoped>
.demo-autocomplete
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
