<script>
export default {
    name: "JTag",
    props: {
        closable: Boolean, // 是否可删除
        size: String,   // 尺寸
        disable: Boolean,  // 禁用
        active: Boolean  // 启用
    },
    computed: {
        tagSize () {
            return this.size || (this.$JUI || {}).size
        }
    },
    methods: {
        handleClose (event) {
            event.stopPropagation()
            this.$emit('close',event)
        },
        handleMouseOver (event) {
            this.$emit('mouseover',event)
        },
        handleMouseOut (event) {
            this.$emit('mouseout',event)
        },
        handleClick (event) {
            event.stopPropagation()
            this.$emit('click',event)
        }
    },
    render () {

        const { tagSize, closable, disable, active } = this

        const classes = [
            'j_tag',
            tagSize ? `j_tag_${tagSize}` : '',
            disable ? `j_tag_disable` : '',
            active ? `j_tag_active` : ''
        ]


        const JTag = (
            <span
                class={classes}
                on-click={this.handleClick}
                on-mouseover={this.handleMouseOver}
                on-mouseout={this.handleMouseOut}
            >
                {this.$scopedSlots.default ? this.$scopedSlots.default() : null}
                {
                    closable &&  <span class="j_tag_close">
                        { 
                            this.$scopedSlots.icon ? this.$scopedSlots.icon() : <i class="j_tag_close_fix j-icon_tag_close" on-click={this.handleClose}></i>
                        }
                    </span>
                }
            </span>
        )
        return JTag
    }
}
</script>
