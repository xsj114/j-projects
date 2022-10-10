<script>
export default {
    name: "JButton",
    props: {
        size: String,   // 尺寸
        round: Boolean,  // 是否圆角
        border: Boolean, // 带边框没背景色
        disabled: Boolean // 禁用
    },
    computed: {
        buttonSize () {
            return this.size || (this.$JUI || {}).size
        }
    },
    methods: {
        handleClick (event) {
            this.$emit('click',event)
        }
    },
    render () {

        const {buttonSize,round,border,disabled} = this

        const classes = [
            "j_button",
            buttonSize ? `j_button_${buttonSize}` : '',
            round ? 'j_button_round' : '',
            border ? 'j_button_border' : ''
        ]

        const JButton = (
            <button
                class={classes}
                on-click={this.handleClick}
                disabled={disabled}
            >
                {
                    this.$scopedSlots.default ? (
                        <span class="j_button_content">
                            {this.$scopedSlots.default()}
                        </span>
                    ) : null
                }
            </button>
        )

        return JButton
    }
}
</script>
