<script>
import Popper from '@mixins/vue-popper'
import {on, off} from '@utils/utils'
import {debounce} from '@utils/utils'

export default {
    name: 'JBubble',
    data () {
        return {
            expectedState: false
        }
    },
    props: {
        size: {
            type: String
        }
    },
    mixins: [
        Popper
    ],
    computed: {
        bubbleSize () {
            return this.size || (this.$JUI || {}).size
        }
    },
    destroyed () {
        const reference = this.referenceElement
        off(reference, 'mouseover')
        off(reference, 'mouseout')
    },
    mounted () {
        if (!this.$scopedSlots.default) return
        if (this.getFirstElement() === null) return
        this.referenceElement = this.$el.firstElementChild
        this.debounceClose = debounce(200,this.handleClosePopper)
        on(this.referenceElement,'mouseover',this.show)
        on(this.referenceElement,'mouseout',this.hide)
    },
    updated () {
        this.popper && this.updatePopper()
    },
    methods: {
        open () {
            this.showPopper = true
        },
        close () {
            this.showPopper = false
        },
        setExpectedState (state) {
            this.expectedState = state
        },
        handleClosePopper () {
            if (this.expectedState) { return }
            this.showPopper = false
        },
        hide () {
            this.setExpectedState(false)
            this.debounceClose()
        },
        show () {
            this.setExpectedState(true)
            this.showPopper = true
        },
        getFirstElement () {
            const defaultSlots = this.$scopedSlots.default()
            let element = null
            for (let i = 0; i < defaultSlots.length; i++) {
                if (defaultSlots[i] && defaultSlots[i].tag) {
                    element = defaultSlots[i]
                }
            }
            return element
        }
    },
    render () {


        if (!this.$scopedSlots.default) return null
        if (this.getFirstElement() === null) return null

        const {bubbleSize, showPopper} = this


        const classes = [
            "j_bubble_popper",
            "j_popper",
            "j_popper_dark",
            bubbleSize? `j_bubble_popper_${bubbleSize}` : ''
        ]

        const JBubble = (
            <div class="j_bubble">
                { this.getFirstElement() }
                <div
                    vShow={showPopper}
                    ref="popper"
                    onMouseenter={this.show}
                    onMouseleave={this.hide}
                    class={classes}
                >
                    <ul>
                        {this.$scopedSlots.content ? this.$scopedSlots.content() : null}
                    </ul>
                </div>
            </div>
        )

        return JBubble   
    }
}
</script>
