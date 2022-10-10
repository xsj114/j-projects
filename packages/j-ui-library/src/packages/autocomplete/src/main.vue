<script>
import JInput from '@packages/input'
import JAutocompleteSuggest from './autocomplete-suggest'
import Emitter from '@mixins/emitter'
import {debounce} from '@utils/utils'
import clickoutside from '@utils/clickoutside'

export default {
    name: "JAutocomplete",
    inheritAttrs: false,
    mixins: [
        Emitter
    ],
    directives: {clickoutside},
    data () {
        return {
            suggestList: [],
            activated: false
        }
    },
    components: {
        JInput,
        JAutocompleteSuggest
    },
    props: {
        value: [String,Number],
        fetchSuggest: {
            type: Function,
            required: true
        },
        debounce: {
            type: Number,
            default: 300
        },
        valueKey: {
            type: String,
            default: 'value'
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        visibleArrow: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean
        },
        readonly: {
            type: Boolean
        },
        round: {
            type: Boolean
        },
        size: {
            type: String
        }
    },
    computed: {
        autocompleteSize () {
            return this.size || (this.$JUI || {}).size
        },
        suggestVisible  () {
            const suggestions = this.suggestList
            let isValidData = Array.isArray(suggestions) && suggestions.length > 0
            return isValidData && this.activated
        }
    },
    watch: {
        suggestVisible (newVal) {
            const $input = this.getInput()
            this.broadcast('JAutocompleteSuggest','visible',[newVal,$input.offsetWidth])
        }
    },
    methods: {
        getData (queryString) {
            this.fetchSuggest(queryString,(suggestions) => {
                if (Array.isArray(suggestions)) {
                    this.suggestList = suggestions
                } else {
                    console.error('[JUI ERROR] suggestions must be an array')
                }
            })
        },
        getSlots () {
            const limitSlots =  ['prepend','append','prefix','suffix']
            let scopedSlots = {}
            for (let val of limitSlots) {
                if (this.$scopedSlots[val]) {
                    scopedSlots[val] = ()=> this.$scopedSlots[val]()
                }
            }        
            return scopedSlots
        },
        handleChange (value) {
            this.$emit('input',value)
            this.debouncedGetData(value)
        },
        handleFocus (event) {
            this.activated = true
            this.$emit('focus',event)
        },
        handleBlur (event) {
            this.$emit('blur',event)
        },
        getInput () {
            return this.$refs.input.getInput()
        },
        select (item) {
            this.$emit('input',item[this.valueKey])
            this.$emit('select',item)
            this.$nextTick(()=>{
                this.suggestList = []
            })
        },
        close () {
            this.activated = false
        }
    },
    mounted () {
        this.debouncedGetData = debounce(this.debounce,this.getData)
    },
    beforeDestroy () {
        this.$refs.suggest.$destroy()
    },
    render () {


        const scopedSlots = this.getSlots()

        const { autocompleteSize, 
                placement, 
                visibleArrow,
                appendToBody,
                disabled,
                readonly,
                round,
                value
        } = this


        const classes = [
            'j_autocomplete_suggest_list_item',
            autocompleteSize ? `j_autocomplete_suggest_list_item_${autocompleteSize}` : ''
        ]




        return (
            <div
                class="j_autocomplete"
                vClickoutside={this.close}
            >
                <JInput
                    scopedSlots={scopedSlots}
                    readonly={readonly}
                    disabled={disabled}
                    round={round}
                    value={value}
                    size={autocompleteSize}
                    on-input={this.handleChange} 
                    on-focus={this.handleFocus} 
                    on-blur={this.handleBlur} 
                    {...{attrs: this.$attrs}}
                    ref="input" 
                />
                <JAutocompleteSuggest
                    placement={placement}
                    visibleArrow={visibleArrow}
                    appendToBody={appendToBody}
                    ref="suggest"
                >
                    {
                        this.suggestList.map(suggest => {
                            return (
                                <li
                                    class={classes}
                                    on-click={()=>{this.select(suggest)}}
                                >{suggest[this.valueKey]}</li>        
                            )
                        })
                    }
                </JAutocompleteSuggest>
            </div>
        )

    }

}    
</script>
