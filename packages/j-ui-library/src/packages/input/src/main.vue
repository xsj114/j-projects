<script>
export default {
    name: "JInput",
    inheritAttrs: false,
    props: {
        size: String,  // 尺寸
        round: { // 是否圆角
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },       // 输入框类型
        tabindex: String,   // 输入框的tabindex 
        showPassword: {
            type: Boolean,
            default: false
        },
        value: [String,Number],
        clearable: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            focused: false,
            passwordVisible: false,
            isComposing: false,
            hovering: false,
        }
    },
    computed:  {
        inputSize () {
            return this.size || (this.$JUI || {}).size
        },
        inputDisabled () {
            return this.disabled
        },
        inputReadonly () {
            return this.readonly
        },
        showPasswordVisible () {
            return this.showPassword && !this.inputDisabled && !this.inputReadonly && (!!this.nativeInputValue || this.focused)
        },
        nativeInputValue () {
            return this.value === null || this.value === undefined ? '' :  String(this.value)
        },
        showClear () {
            return this.clearable && !this.inputDisabled && !this.inputReadonly && this.nativeInputValue && (this.focused || this.hovering)
        }
    },
    methods: {
        updateIconOffset() {
            this.calcIconOffset('prefix')
            this.calcIconOffset('suffix')
        },
        calcIconOffset (name) {

            let el = this.$el.querySelector(`.j_input_${name}`) || null

            if (!el) return

            const iconMap = {
                prefix: 'prepend',
                suffix: 'append'
            }

            const pendant = iconMap[name]
            if (this.$scopedSlots[pendant]) {
                let sourceEl = this.$el.querySelector(`.j_input_group_${pendant}`)
                el.style.transform = `translateX(${name==='suffix' ? '-' : ''}${sourceEl.offsetWidth}px)`
            } 
        },
        handleFocus (event) {
            this.focused = true
            this.$emit('focus',event)
        },
        handleBlur (event) {
            this.focused = false
            this.$emit('blur',event)
        },
        handlePasswordVisible () {
            this.passwordVisible = !this.passwordVisible
            this.$nextTick(()=>{
                this.focus()
            })
        },
        getInput () {
            return this.$refs.input 
        },
        focus () {
            this.getInput().focus()
        },
        blur () {
            this.getInput().blur()
        },
        setNativeInputValue () {
            const input = this.getInput()
            if (input.value === this.nativeInputValue) return
            input.value = this.nativeInputValue
        },
        handleInput (event) {
            if (this.isComposing) return
            if (event.target.value === this.nativeInputValue) return
            this.$emit('input', event.target.value)
        },
        handleCompositionStart () {
            this.isComposing = true
        },
        handleCompositionEnd (event) {
            if (!this.isComposing) return
            this.isComposing = false
            this.handleInput(event)
        },
        handleChange (event) {
            this.$emit('change',event.target.value)
        },
        handleClear () {
            this.$emit('input', '')
            this.$emit('change', '')
            this.$emit('clear')
            this.$nextTick(()=>{
                this.focus()
            })
        }
    },
    mounted () {
        if (this.type === 'textarea') return
        this.setNativeInputValue()
        this.updateIconOffset()
    },
    updated () {
        this.$nextTick(this.updateIconOffset)
    },
    watch: {
        nativeInputValue () {
            this.setNativeInputValue()
        }
    },
    render () {


        const { 
            tabindex,
            inputSize, 
            type, 
            round,
            inputDisabled,
            inputReadonly
        } = this


        if (type === 'textarea') return null

        const classInput = [
            'j_input',
            this.$scopedSlots.prepend || this.$scopedSlots.append ? 'j_input_group' : ''
        ]

        const classInputInner = [
            'j_input_inner',
            inputSize ? `j_input_inner_${inputSize}` : '',
            round ? `j_input_inner_round` : '',
            this.$scopedSlots.prefix ? 'j_input_inner_prefix' : '',
            this.$scopedSlots.suffix ? 'j_input_inner_suffix' : '',
            this.$scopedSlots.prepend ? 'j_input_inner_prepend' : '',
            this.$scopedSlots.prepend && round ? 'j_input_inner_round_prepend' : '',
            this.$scopedSlots.append ? 'j_input_inner_append' : '',
            this.$scopedSlots.append && round ? 'j_input_inner_round_append' : ''
        ]

        const classPrepend = [
            'j_input_group_prepend',
            round ? 'j_input_group_prepend_round' : ''
        ]


        const classAppend = [
            'j_input_group_append',
            round ? 'j_input_group_append_round' : ''
        ]

        const JInput = (
            <div
                class={classInput}
                control-suggest={this.suggestVisible}
                on-mouseenter={ () => { this.hovering = true } }
                on-mouseleave={ () => { this.hovering = false } }
            >
                {
                    [
                        this.$scopedSlots.prepend ? (
                            <div
                                class={classPrepend}
                            >
                                {this.$scopedSlots.prepend()}
                            </div>
                        ) : null,
                        <input 
                            tabindex={tabindex}
                            class={classInputInner}
                            type={this.showPasswordVisible? (this.passwordVisible ? type : 'password') : type}
                            on-focus={this.handleFocus}
                            on-blur={this.handleBlur}
                            on-input={this.handleInput}
                            on-change={this.handleChange} 
                            on-compositionstart={this.handleCompositionStart}
                            on-compositionend={this.handleCompositionEnd}
                            ref="input"
                            disabled={inputDisabled}
                            readonly={inputReadonly}
                            {...{attrs: this.$attrs}}
                        />,
                        this.$scopedSlots.prefix ? (
                            <span class="j_input_icon j_input_prefix">
                                {this.$scopedSlots.prefix()}
                            </span>
                        ) : null,
                        this.$scopedSlots.suffix ? (
                            <span class="j_input_icon j_input_suffix">
                                {this.$scopedSlots.suffix()}
                            </span>
                        ) : null,
                        this.showPasswordVisible ? (
                            <span class="j_input_icon j_input_suffix" >
                                <i
                                    class="j_input_icon_gesture j-icon_show_password"
                                    on-click={this.handlePasswordVisible}
                                ></i>        
                            </span>
                        ) : null,
                        this.showClear ? (
                            <span class="j_input_icon j_input_suffix">
                                <i
                                    class="j_input_icon_gesture j-icon_tag_close"
                                    on-click={this.handleClear} 
                                ></i>        
                            </span>
                        ) : null,
                        this.$scopedSlots.append ? (
                            <div class={classAppend}>
                                {this.$scopedSlots.append()}
                            </div>
                        ) : null
                    ]
                }
            </div>
        )

        return JInput

    }
}

</script>
