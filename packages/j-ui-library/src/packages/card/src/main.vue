<script>
export default {
    name: "JCard",
    props: {
        size: String, // 尺寸
        role: {       // 角色
            type: String,
            default: 'patient'
        },  
        direction: {     // 方向
            type: String,
            default: 'vertical'
        }, 
        text: String // 展示文本
    },
    computed:  {
        cardSize () {
            return this.size || (this.$JUI || {}).size
        }
    },
    methods: {
        handleMouseUp (event) {
            this.$emit('mouseup', event)
        },
        handleMouseDown (event) {
            this.$emit('mousedown', event)
        },
        handleDoubleClick (event) {
            this.$emit('textDbClick', event)
        }
    },
    render () {

        const {role, text, cardSize, direction} = this

        const classRole = [
            'j_card_role',
            role === 'patient'&& direction === 'vertical' ? 'j_card_role_patient' : '',
            role === 'doctor' && direction === 'vertical' ? 'j_card_role_doctor' : '',
            direction === 'horizontal' ? 'j_card_role_horizontal' : ''
        ]

        const classContent = [
            'j_card_content',
            cardSize ? `j_card_content_${cardSize}` : '',
            role === 'doctor' ? 'j_card_content_doctor' : 'j_card_content_patient',
            direction === 'horizontal' ? 'j_card_content_horizontal' : ''
        ]


        const classCardContentText = [
            this.$scopedSlots.prefix ? 'j_card_content_text' : ''
        ]

        const classIdent = [
            'j_card_identity',
            role === 'doctor' ? 'j_card_identity_doctor' : '',
            direction === 'horizontal' ? 'j_card_identity_horizontal' : ''
        ]



        const JCardContent = (
            <span class={classContent}>
                {this.$scopedSlots.prefix && 
                    <span class="j_card_content_icon">
                        {this.$scopedSlots.prefix()}
                    </span>
                }
                <span class={classCardContentText}>
                <span class="j_card_content_text_inner" domPropsInnerHTML={text} on-dblclick={this.handleDoubleClick}></span>
                    {
                        this.$scopedSlots.append ? this.$scopedSlots.append() : null
                    }
                </span>
            </span>
        )


        const JCard = (
            <div
                class="j_card"
                on-mousedown={this.handleMouseDown}
                on-mouseup={this.handleMouseUp}
            >
                { direction === 'horizontal' && role === 'doctor' && JCardContent }
                <div
                    class={classIdent}
                >
                    { 
                        role === 'patient' ? (
                            <span class="j_card_identity_icon"> 
                                {this.$scopedSlots.avatar ? this.$scopedSlots.avatar() : <i class="j-icon_card_patient"></i> }
                            </span>
                        ) : null
                    }
                    <span
                        class={classRole}
                    >
                        { role ==='doctor' ? '医生' : '患者' }
                    </span>
                    { 
                        role === 'doctor' ? (
                            <span class="j_card_identity_icon">
                                {this.$scopedSlots.avatar ? this.$scopedSlots.avatar() : <i class="j-icon_card_doctor"></i> }
                            </span>
                        ) : null
                    }
                </div>
                {(direction === 'vertical' || role === 'patient') && JCardContent}
            </div>
        )     

        return JCard
    }
}
</script>
