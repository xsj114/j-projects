<script>
import Emitter from '@mixins/emitter'
export default {
    name: "JOption",
    mixins: [
        Emitter
    ],
    inject: ['select'],
    props: {
        label: [String,Number],
        value: {
            required: true
        },
        size: String,
        created: Boolean
    },
    data () {
        return {
            visible: true,
            hover: false
        }
    },
    computed: {
        currentLabel () {
            return this.label || this.value
        },
        optionSize () {
            return this.size || (this.$JUI || {}).size
        },
        itemSelected () {
            if (this.select.multiple) {
                return this.select.value.indexOf(this.value) > -1
            } else {
                return this.value === this.select.value
            }
        }
    },
    methods: {
        queryChange (val) {
            this.visible = new RegExp(val, 'i').test(this.currentLabel) || this.created
        },
        handleOptionClick () {
            this.dispatch('JSelect', 'handleOptionClick', [this, true])
        },
        hoverItem () {
            this.select.hoverIndex = this.select.options.indexOf(this)
        }
    },
    render () {

        const { currentLabel, optionSize, itemSelected, visible, hover} = this

        const classes = [
            'j_option_menu_list_item',
            optionSize ? `j_option_menu_list_item_${optionSize}` : '',
            itemSelected ? 'j_option_menu_list_item_selected' : '',
            hover ? 'j_option_menu_list_item_hover' : ''
        ]

        return (
            <li
                class={classes}
                vShow={visible}
                vOn:click_stop={this.handleOptionClick}
                onMouseenter={this.hoverItem}
            >
                {currentLabel}
            </li>
        )
    },
    created () {
        this.select.options.push(this)
        this.$on('queryChange', this.queryChange)
    },
    beforeDestroy () {
        this.select.onOptionDestroy(this.select.options.indexOf(this))
    }
}
</script>
