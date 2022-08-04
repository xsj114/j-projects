<template>
    <div
        id="app"
        class="app"
    >
        <div class="app-header">
            <el-button
                type="primary"
                plain
                class="app-header-file"
            >
                上传文件
                <input
                    ref="file"
                    type="file"
                    @change="upload"
                >
            </el-button>
            <el-button
                type="primary"
                plain
                @click="isSubmit=true"
            >
                提交
            </el-button>
        </div>
        <div class="app-body">
            <el-tabs
                v-model="activeName"
                type="card"
            >
                <el-tab-pane
                    label="英文填写"
                    name="english"
                >
                    <div
                        v-for="item in allWord"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.enVal"
                            placeholder="请输入英文"
                            size="small"
                            class="app-body-row-input"
                        />
                        <span class="app-body-row-span">
                            {{ item.chinese }}
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="中文填写"
                    name="chinese"
                >
                    <div
                        v-for="item in allWord"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.cnVal"
                            placeholder="请输入中文"
                            size="small"
                            class="app-body-row-input"
                        />
                        <span class="app-body-row-span">
                            {{ item.english }}
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="英文错误"
                    name="english-error"
                >
                    <div
                        v-for="item in englishError"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.enVal"
                            placeholder="请输入英文"
                            size="small"
                            class="app-body-row-input"
                        />
                        <span class="app-body-row-span">
                            {{ item.english }}
                        </span>
                        <span class="app-body-row-span">
                            {{ item.chinese }}
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="英文正确"
                    name="english-correct"
                >
                    <div
                        v-for="item in englishCorrect"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.enVal"
                            placeholder="请输入英文"
                            size="small"
                            class="app-body-row-input"
                            :disabled="true"
                        />
                        <span class="app-body-row-span">
                            {{ item.english }}
                        </span>
                        <span class="app-body-row-span">
                            {{ item.chinese }}
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="中文错误"
                    name="chinese-error"
                >
                    <div
                        v-for="item in chineseError"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.cnVal"
                            placeholder="请输入中文"
                            size="small"
                            class="app-body-row-input"
                        />
                        <span class="app-body-row-span">
                            {{ item.chinese }}
                        </span>
                        <span class="app-body-row-span">
                            {{ item.english }}
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="中文正确"
                    name="chinese-correct"
                >
                    <div
                        v-for="item in chineseCorrect"
                        :key="item.number"
                        class="app-body-row"
                    >
                        <el-input
                            v-model="item.cnVal"
                            placeholder="请输入中文"
                            size="small"
                            class="app-body-row-input"
                            :disabled="true"
                        />
                        <span class="app-body-row-span">
                            {{ item.chinese }}
                        </span>
                        <span class="app-body-row-span">
                            {{ item.english }}
                        </span>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            allWord: [],
            activeName: 'english',
            englishError: [], // 英文错误
            englishCorrect: [], // 英文正确
            chineseError: [], // 中文错误
            chineseCorrect: [], // 中文正确
            isSubmit: false, // 是否提交
        };
    },
    watch: {
        activeName( newVal ) {
            if ( !this.isSubmit ) return;
            switch ( newVal ) {
            case 'english-error':
                this.englishError = this.allWord.filter( ( ele ) => {
                    return ele.enVal !== ele.english;
                } );
                break;
            case 'english-correct':
                this.englishCorrect = this.allWord.filter( ( ele ) => {
                    return ele.enVal === ele.english;
                } );
                break;
            case 'chinese-error':
                this.chineseError = this.allWord.filter( ( ele ) => {
                    return ele.cnVal !== ele.chinese;
                } );
                break;
            case 'chinese-correct':
                this.chineseCorrect = this.allWord.filter( ( ele ) => {
                    return ele.cnVal === ele.chinese;
                } );
                break;
            default:
                break;
            }
        },
    },
    methods: {
        upload() {
            const file = this.$refs.file.files[ 0 ];
            const reader = new FileReader();
            reader.readAsText( file );
            reader.onload = ( ev ) => {
                const resultStr = ev.target.result;
                let resultArr = resultStr.split( '\n' );
                resultArr.pop();
                resultArr = resultArr.map( ( item, index ) => {
                    const obj = {};
                    item = item.replace( /\s+/g, ' ' );
                    obj.english = item.split( ' ' )[ 0 ];
                    obj.chinese = item.split( ' ' )[ 1 ];
                    obj.number = index + 1;
                    obj.enVal = '';
                    obj.cnVal = '';
                    return obj;
                } );
                this.allWord = resultArr;
            };
        },
    },
};
</script>

<style lang="styl" socped>
.app
    &-header
        margin 40px 20px 0 0
        display flex
        justify-content flex-end
        &-file
            position relative
            input
                position absolute
                left 0
                top 0
                opacity 0
                width 100%
                height 100%
    &-body
        width 1300px
        margin 0 auto
        &-row
            display flex
            flex-direction row
            margin-bottom 20px
            align-items center
            &-input
                width 400px !important
            &-span
                margin-left 20px
</style>
