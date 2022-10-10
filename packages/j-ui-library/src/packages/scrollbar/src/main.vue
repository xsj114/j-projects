<script>
// import { scrollBarWidth } from '@utils/utils'
import Bar from './bar'
export default {
    name: "JScrollbar",
    components: {
        Bar
    },
    data () {
        return {
            moveX: 0,
            moveY: 0
        }
    },
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        viewClass: {},
        wrapClass: {}
    },
    methods: {
        handleScroll () {
            const wrap = this.wrap
            this.moveX = (wrap.scrollTop * 100) / wrap.clientHeight
            this.moveY = (wrap.scrollLeft * 100) / wrap.clientWidth
        }
    },
    computed: {
        wrap () {
            return this.$refs.wrap    
        }
    },
    render (h) {

        // let gutter = scrollBarWidth()


        const view = h(this.tag, {
            class: this.viewClass
        }, this.$slots.default)


        const wrapClass = [
            'j_scrollbar_wrap',
            'j_scrollbar_hidden_default',
            this.wrapClass
        ]


        return (
            <div
                class="j_scrollbar"
            >
                <div
                    class={wrapClass}
                    ref="wrap"
                    onScroll={this.handleScroll}
                >
                    {view}
                </div>
                <Bar
                ></Bar>
                <Bar
                    vertical
                ></Bar>
            </div>
        )
    } 
}
</script>
