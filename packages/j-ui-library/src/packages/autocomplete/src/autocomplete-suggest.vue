<script>
import Popper from '@mixins/vue-popper'
import JScrollbar from '@packages/scrollbar'
export default  {
    name: 'JAutocompleteSuggest',
    mixins: [
        Popper
    ],
    components: {
        JScrollbar
    },
    data () {
        return {
            dropdownWidth: ''
        }
    },
    created () {
        this.$on('visible',([value,offsetWidth])=>{
            this.dropdownWidth = offsetWidth + 'px'
            this.showPopper = value
        })
    },
    render () {

        const { showPopper, dropdownWidth} = this

        return (
            <div
                style={{'width': dropdownWidth}}
                class="j_autocomplete_suggest j_popper j_popper_light"
                vShow={showPopper}
            >
                <j-scrollbar
                    tag="ul"
                    viewClass="j_autocomplete_suggest_list"
                    wrapClass="j_autocomplete_suggest_list_wrap"
                >
                    {this.$scopedSlots.default && this.$scopedSlots.default()}
                </j-scrollbar>
            </div>
        )
    },
    mounted () {
        this.referenceElement = this.$parent.getInput()
        this.popperElement = this.$el
    },
    updated () {
        this.popper && this.updatePopper()
    }

}
</script>
