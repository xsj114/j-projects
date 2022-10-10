<script>
import JInput from '@packages/input'
import JOptionMenu from './optionMenu'
import Emitter from '@mixins/emitter'
import clickoutside from '@utils/clickoutside'
import JTag from '@packages/tag'
import JOption from './option'
import {debounce} from '@utils/utils'
import { valueEquals } from '@utils/utils'

export default {
    name: "JSelect",
    mixins: [
        Emitter
    ],
    data () {
        return {
            options: [],    // 传递进来的选项
            selected: this.multiple ? [] : {},   // 选中的选项的组件
            selectedLabel: '',  // 当前展示的名字
            inputWidth: 0,  // 输入框宽度
            inputHeight: 0, // 输入框高度
            visible: false,  //是否显示下拉菜单
            hoverIndex: -1, // 鼠标移入选项的索引
            currentPlaceholder: '', // 当前展示的placeholder值
            query: '',   // 用户输入字符串
            softFocus: false,  // 软焦点
            inputHovering: false,
            isSilentBlur: false
        }
    },
    directives: {clickoutside},
    provide () {
        return {
            'select': this
        }
    },
    components: {
        JInput,
        JOptionMenu,
        JTag,
        JOption
    },
    props: {
        size: String,
        disabled: {
            type: Boolean
        },
        value: {
            required: true,
            type: [String, Array]
        },
        multiple: {
            type: Boolean,
            default: false
        },
        popperClass: String,
        clearable: {
            type: Boolean,
            default: false
        },
        allowCreate: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        remote: {
            type: Boolean,
            default: false
        },
        remoteMethod: Function
    },
    watch: {
        placeholder (val) {
            this.currentPlaceholder = val
        },
        hoverIndex (newVal) {
            let hoverOption
            if (typeof newVal === 'number' && newVal > -1) {
                hoverOption = this.options[newVal]
            }
            if (!hoverOption) return
            this.options.forEach(option => {
                option.hover = option === hoverOption
            })
        },
        value (val) {
            if (this.multiple) {
                if (val && val.length) {
                    this.currentPlaceholder = ''
                } else {
                    this.currentPlaceholder = this.placeholder
                }
                if (this.filterable) {
                    this.query = ''
                    this.handleQueryChange(this.query)
                }
            }
            this.setSelected()
        },
        visible (newVal) {
            if (!newVal) {
                // 关闭
                this.query = ''
                this.resetHoverIndex()
                if (!this.multiple) {
                    // 单选
                    this.selectedLabel = this.selected.currentLabel
                    if (this.filterable) {
                        // 因为上面清空了query，所以showNewOption为false，新增的不展示了，所以给query再次赋值
                        this.query = this.selectedLabel
                    }
                }
            } else {
                // 开启
                this.query = this.remote ? '': this.selectedLabel
                this.broadcast('JOptionMenu','updatePopper')
                if (this.filterable) {
                    if (!this.multiple) {
                        // 单选逻辑
                        this.broadcast('JOption', 'queryChange', '')
                        if (this.selectedLabel) {
                            this.currentPlaceholder = this.selectedLabel
                            this.selectedLabel = ''
                        }
                    }
                }
            }
            this.$emit('visible-change', newVal)
        }
    },
    computed:  {
        emptyText () {
            const existFilterableOption = this.options.some( opt => { return new RegExp(this.query, 'i').test(opt.currentLabel) } )
            if ( this.remote && this.query === '' && this.options.length === 0 ) {
                return false
            }
            if ( !this.remote && this.filterable && this.query && this.options.length && !existFilterableOption ) {
                return '无匹配数据'
            }
            if ( this.options.length === 0 ) {
                return '无数据'
            }
            return null
        },
        showClose () {
            let hasValue = this.multiple ? Array.isArray(this.value) && this.value.length : this.value !== undefined && this.value !== null && this.value !== ''
            return hasValue && this.clearable && !this.selectDisabled && this.inputHovering
        },
        selectSize () {
            return this.size || (this.$JUI || {}).size
        },
        selectDisabled () {
            return this.disabled
        },
        readonly () {
            return !this.filterable || !this.visible || this.multiple
        },
        debounce () {
            return this.remote ? 300 : 0
        },
        showNewOption () {
            let hasExistingOption = this.options.filter(option => !option.created).some(option => option.currentLabel === this.query)
            return this.filterable && this.allowCreate && this.query !=='' && !hasExistingOption
        }
    },
    created () {
        if (!(this.multiple && Array.isArray(this.value) && this.value.length)) {
            this.currentPlaceholder = this.placeholder
        }
        this.debouncedOnInputChange = debounce(this.debounce, () => {
            this.onInputChange()
        })
        this.debouncedQueryChange = debounce(this.debounce, (e) => {
            this.handleQueryChange(e.target.value)
        })
        this.$on('handleOptionClick', this.handleOptionSelect)
    },
    mounted () {
        this.setSelected()
        this.handleInput()
    },
    methods: {
        onOptionDestroy (index) {
            this.options.splice(index,1)
        },
        deleteTag (event, item) {
            let index = this.selected.indexOf(item)
            const value = this.value.slice()
            value.splice(index,1)
            this.$emit('input',value)
            this.emitChange(value)
            this.$emit('remove-tag',item.value)
        },
        handleOptionHover () {
            let selectedArr = this.selected instanceof Array ? this.selected : [this.selected]
            selectedArr.forEach(selectedOption => {
                this.options.forEach(option => {
                    if (option === selectedOption) option.hover = true
                })
            })
        },
        resetHoverIndex () {
            setTimeout(()=>{
                if (this.multiple) {
                    let selectedIndexArray = []
                    this.selected.forEach(selectedOption => {
                        const index = this.options.indexOf(selectedOption)
                        if (index === -1) return
                        selectedIndexArray.push(index)
                    })
                    this.options.forEach((option, optionIndex) => {
                        option.hover = selectedIndexArray.includes(optionIndex)
                    })
                } else {
                    this.options.forEach(option => {
                        option.hover = option === this.selected
                    })
                }
            }, 300)
        },
        emitChange (val) {
            if (!valueEquals(this.value, val)) {
                this.$emit('change', val)    
            }
        },
        handleOptionSelect (option, byClick) {
            if (this.multiple) {
                const value = this.value.slice()
                const optionIndex = value.indexOf(option.value)
                if (optionIndex >-1 ) {
                    value.splice(optionIndex, 1)
                } else {
                    value.push(option.value)
                }
                this.$emit('input', value)
                this.emitChange(value)
            } else {
                this.$emit('input', option.value)
                this.emitChange(option.value)
                this.visible = false
            }
            this.isSilentBlur = byClick
            this.setSoftFocus()
        },
        setSoftFocus () {
            this.softFocus = true
            const input = this.$refs.input || this.$refs.reference
            input.focus()
        },
        toggleMenu () {
            if (this.selectDisabled) { return }
            this.visible = !this.visible
            if (this.visible) {
                (this.$refs.input || this.$refs.reference).focus()
            }
        },
        handleBlur (event) {
            setTimeout(() => {
                if (this.isSilentBlur) {
                    this.isSilentBlur = false
                } else {
                    this.$emit('blur',event)
                }
            }, 300)
            setTimeout(()=>{
                this.softFocus = false
            }, 0)
        },
        handleFocus (event) {
            if (this.softFocus) {
                this.softFocus = false
            } else {
                this.$emit('focus',event)
            }
        },
        handleInput () {
            this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
            this.inputHeight = this.$refs.reference.$el.getBoundingClientRect().height
        },
        setSelected () {
            if (this.multiple) {
                // 多选
                let result = []
                if (Array.isArray(this.value)) {
                    this.value.forEach(value => {
                        result.push(this.getOption(value))
                    })
                }
                this.selected = result
                this.resetInputHeight()
            } else {
                // 单选
                let option = this.getOption(this.value)    
                this.selectedLabel = option.currentLabel
                this.selected = option
            }
            this.handleOptionHover()
        },
        getOption (value) {
            let option 
            for (let i = this.options.length-1; i >= 0; i--) {
                const currentOption = this.options[i]
                const isEqual = currentOption.value === value
                if (isEqual) {
                    option = currentOption
                    break
                }
            }
            if (option) return option

            let newOption = {
                value,
                currentLabel: value
            }
            return newOption
        },
        handleClose () {
            this.visible = false
        },
        getSlots () {
            const limitSlots =  ['prefix', 'suffix']
            let scopedSlots = {}
            for (let val of limitSlots) {
                if (this.$scopedSlots[val]) {
                    scopedSlots[val] = ()=> this.$scopedSlots[val]()
                }
            }
            if (this.multiple) delete scopedSlots.prefix
            return scopedSlots
        },
        resetInputHeight () {
            this.$nextTick(() => {
                let referenceChildNode = this.$refs.reference.$el.children
                let input = [].filter.call(referenceChildNode, item => item.tagName === 'INPUT')[0]
                const tags = this.$refs.tags
                const tagsHeight = tags ? tags.clientHeight + (tags.clientHeight > this.inputHeight ? 6 : 0) : 0
                input.style.height = this.selected.length === 0
                    ? this.inputHeight + 'px'
                    : Math.max(tagsHeight, this.inputHeight ) + 'px'
                this.broadcast('JOptionMenu','updatePopper')
            })
        },
        onInputChange () {
            if (this.filterable && this.query !== this.selectedLabel) {
                this.query = this.selectedLabel
                this.handleQueryChange(this.query)
            }
        },
        handleQueryChange (val) {
            this.hoverIndex = -1
            if (this.remote && typeof this.remoteMethod === 'function') {
                this.remoteMethod(val)
            } else {
                this.broadcast('JOption','queryChange',val)
            }
        },
        managePlaceholder () {
            this.currentPlaceholder = this.$refs.input.value ?  '' : this.placeholder
        },
        clearSelected (event) {
            if (!this.clearable) return
            event.stopPropagation()
            const value = this.multiple ? [] : ''
            this.$emit('input', value)
            this.emitChange(value)
            this.visible = false
            this.$emit('clear')
        }
    },
    render () {
                
        const scopedSlots = this.getSlots()

        let { 
            selectSize,
            visible, 
            multiple, 
            selected,
            selectDisabled,
            readonly,
            filterable,
            currentPlaceholder,
            debouncedOnInputChange,
            debouncedQueryChange,
            showNewOption,
            managePlaceholder,
            showClose,
            emptyText
        } = this

        const iconClass = [
            this.clearable ? (
                showClose ? 'j-icon_tag_close' 
                : this.visible ? 'j-icon_down_arrow j_select_reverse' : 'j-icon_down_arrow'
            ) : this.visible ? 'j-icon_down_arrow j_select_reverse' : 'j-icon_down_arrow',
            'j_input_icon_gesture',
            showClose ? '' : 'j_select_caret'
        ]


        const inputClass = [
            'j_select_tags_input',
            selectSize ? `j_select_tags_input_${selectSize}` : ''
        ]

        const emptyClass = [
            "j_select_empty",
            selectSize ? `j_select_empty_${selectSize}` : ''
        ]


        return (
            <div
                class="j_select"
                onClick={this.toggleMenu}
                vClickoutside={this.handleClose}
            >
                {multiple ? (
                    <div
                        class="j_select_tags"
                        style={{maxWidth: this.inputWidth - 30 + 'px'}}
                        ref="tags"
                    >
                        {
                            selected.length ? (
                                selected.map(item => {
                                    return (
                                        <j-tag
                                            size="small"
                                            closable={!selectDisabled}
                                            onClose={(event)=>{this.deleteTag(event,item)}}
                                        >
                                            {item.currentLabel}
                                        </j-tag>
                                    )
                                })
                            ) : null
                        }
                        {
                            filterable && (
                                <input
                                    vModel={this.query}
                                    class={inputClass}
                                    vOn:keyup={managePlaceholder}
                                    vOn:input={debouncedQueryChange}
                                    vOn:focus={this.handleFocus}
                                    vOn:blur={this.handleBlur}
                                    ref="input"
                                    style={{maxWidth: this.inputWidth - 30 + 'px', width: '0.01%'}}
                                />
                            )
                        }
                    </div>
                ) : null }
                <j-input
                    vModel={this.selectedLabel}
                    ref="reference"
                    scopedSlots={scopedSlots}
                    disabled={selectDisabled}
                    readonly={readonly}
                    onFocus={this.handleFocus}
                    class={[visible ? 'is_focus' : '']}
                    onBlur={this.handleBlur}
                    size={selectSize}
                    placeholder={currentPlaceholder}
                    vOn:keyup_native={debouncedOnInputChange}
                    vOn:mouseenter_native={()=>{this.inputHovering = true}}
                    vOn:mouseleave_native={()=>{this.inputHovering = false}}
                >
                    {
                        !scopedSlots.suffix && (
                            <i
                                class={iconClass}
                                slot="suffix"
                                vOn:click={this.clearSelected}
                            ></i>        
                        )
                    }
                </j-input>
                <j-option-menu
                    vShow={visible && emptyText !== false}
                >
                    {
                        showNewOption ? (
                            <j-option
                                value={this.query}
                                size={selectSize}
                                created
                            ></j-option>
                        ) : null
                    }
                    {this.$scopedSlots.default ? this.$scopedSlots.default() : null }
                    {
                        emptyText ? (
                            <p class={emptyClass}>{emptyText}</p>
                        ) : null
                    }
                </j-option-menu>
            </div>
        ) 
    }
}
</script>
