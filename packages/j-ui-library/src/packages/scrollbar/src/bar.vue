<script>
import { BAR_MAP } from './util'
export default {
    props: {
        vertical: Boolean
    },
    computed: {
        bar () {
            return BAR_MAP[ this.vertical ? 'vertical' : 'horizontal']
        }
    },
    render () {

        const { bar } = this


        const classes = [
            'j_scrollbar_bar',
            `j_scrollbar_bar_${bar.key}`
        ]

        return (
            <div
                class={classes}
            >
                <div
                    ref="thumb"
                    class="j_scroll_bar_thumb"
                ></div>
            </div>
        )
    }
}
</script>
