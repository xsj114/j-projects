import { createPopper as CreatePopper } from '@popperjs/core';
export default {
    props: {
        offset: { // popper位置信息
            type: Object,
            default() {
                return {
                    name: 'offset',
                    options: {
                        offset: [ 0, 10 ],
                    },
                };
            },
        },
        placement: { //  位置
            type: String,
            default: 'bottom',
        },
        visibleArrow: { // 是否显示箭头
            type: Boolean,
            default: true,
        },
        appendToBody: { // 是否加在dom里
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            popper: null,
            currentPlacement: '', // 当前的位置
            showPopper: false, // popper是否展示
            popperElement: null,
            referenceElement: null,
        };
    },
    watch: {
        showPopper: {
            handler: function( newVal ) {
                newVal && this.updatePopper();
            },
        },
    },
    methods: {
        createPopper() {
            this.currentPlacement = this.$attrs.placement || this.placement;
            const regPlacement = /^(top|bottom|left|right)(-start|-end)?$/g;
            if ( !regPlacement.test( this.currentPlacement ) ) {
                return;
            }

            const reference = this.referenceElement;
            const popper = this.popperElement || this.$refs.popper;
            if ( !popper || !reference ) {
                return;
            }

            if ( this.visibleArrow ) {
                this.appendArrow( popper );
            }

            if ( this.appendToBody ) {
                document.body.appendChild( popper );
            }

            if ( this.popper ) {
                this.popper.destroy();
            }


            const options = {};
            options.placement = this.currentPlacement;
            options.modifiers = [];
            options.modifiers.push( this.offset );


            this.popper = new CreatePopper( reference, popper, options );

            this.popper.state.elements.popper.style.zIndex = ( this.$JUI || {} ).zIndex || 2000;
        },
        updatePopper() {
            const popper = this.popper;
            if ( popper ) {
                popper.update();
            } else {
                this.createPopper();
            }
        },
        destroyPopper() {
            if ( !this.popper ) {
                return;
            }
            this.popper.destroy();
            this.popper = null;
        },
        appendArrow( element ) {
            const arrow = document.createElement( 'div' );

            arrow.setAttribute( 'data-popper-arrow', '' );

            arrow.className = 'j_popper_arrow';

            element.appendChild( arrow );
        },
    },
    beforeDestroy() {
        this.destroyPopper();
        if ( this.popperElement && this.popperElement.parentNode === document.body ) {
            document.body.removeChild( this.popperElement );
        }
    },
};
