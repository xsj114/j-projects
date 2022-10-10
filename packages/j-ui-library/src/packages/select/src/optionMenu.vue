<script>
import Popper from '@mixins/vue-popper'
import JScrollbar from '@packages/scrollbar'

export default {
    name: 'JOptionMenu',
    mixins: [
        Popper
    ],
    data () {
        return {
            dropdownWidth: ''
        }
    },
    watch: {
        '$parent.inputWidth' () {
            this.dropdownWidth = this.$parent.$refs.reference.$el.getBoundingClientRect().width + 'px'     
        }
    },
    mounted () {
        this.referenceElement = this.$parent.$refs.reference.$el
        this.$parent.popperElement = this.popperElement = this.$el
        this.$on('updatePopper',() => {
            this.updatePopper()
        })
        this.$on('destroyPopper', this.destroyPopper)
    },
    computed: {
        popperClass () {
            return this.$parent.popperClass
        }
    },
    components: {
        JScrollbar
    },
    render () {

        const {dropdownWidth, popperClass} = this

        const classes = [
            'j_option_menu',
            popperClass ? popperClass : ''
        ]

        return (
            <div
                class={classes}
                style={{'width': dropdownWidth}}
            >
                <j-scrollbar
                    tag="ul"
                    viewClass="j_option_menu_list"
                    wrapClass="j_option_menu_list_wrap"
                >
                    {this.$scopedSlots.default && this.$scopedSlots.default()}
                </j-scrollbar> 
            </div>
        )
    }
}

</script>

