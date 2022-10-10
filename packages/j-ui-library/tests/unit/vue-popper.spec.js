import { mount } from '@vue/test-utils';
import VuePopper from '@mixins/vue-popper';

const Popper = {
    render() {
        return '<div></div>';
    },
    mixins: [
        VuePopper,
    ],
    created() {
        this.popperElement = document.createElement( 'div' );
        this.referenceElement = document.createElement( 'div' );
    },
};


describe( 'VuePopper', () => {
    describe( 'set popper not reference', () => {
        const Component = {
            render() {
                return '<div></div>';
            },
            mixins: [
                VuePopper,
            ],
            created() {
                this.popperElement = document.createElement( 'div' );
            },
        };

        const wrapper = mount( Component );
        wrapper.vm.createPopper();

        expect( wrapper.vm.popper ).toBeNull();
    } );


    describe( 'set reference not popper', () => {
        const Component = {
            render() {
                return '<div></div>';
            },
            mixins: [
                VuePopper,
            ],
            created() {
                this.referenceElement = document.createElement( 'div' );
            },
        };

        const wrapper = mount( Component );
        wrapper.vm.createPopper();

        expect( wrapper.vm.popper ).toBeNull();
    } );

    describe( 'create', () => {
        test( 'create popper', () => {
            const wrapper = mount( Popper );
            wrapper.vm.createPopper();

            expect( wrapper.vm.popper ).not.toBeNull();
            expect( wrapper.vm.referenceElement ).toBeEmptyDOMElement();
            expect( wrapper.vm.popperElement ).toHaveStyle( 'z-index: 2000' );
            expect( wrapper.vm.popperElement.firstElementChild ).toHaveClass( 'j_popper_arrow' );
            expect( wrapper.vm.popperElement.firstElementChild ).toHaveAttribute( 'data-popper-arrow', '' );
        } );
    } );


    describe( 'placement', () => {
        test( 'pass no correct placement', () => {
            const wrapper = mount( Popper, {
                propsData: {
                    placement: 'test',
                },
            } );
            wrapper.vm.createPopper();

            expect( wrapper.vm.popper ).toBeNull();
        } );

        test( 'pass correct placement', () => {
            const wrapper = mount( Popper, {
                propsData: {
                    placement: 'top-start',
                },
            } );
            wrapper.vm.createPopper();

            expect( wrapper.vm.popper ).not.toBeNull();
            expect( wrapper.vm.referenceElement ).toBeEmptyDOMElement();
            expect( wrapper.vm.popperElement ).toHaveStyle( 'z-index: 2000' );
            expect( wrapper.vm.popperElement.firstElementChild ).toHaveClass( 'j_popper_arrow' );
            expect( wrapper.vm.popperElement.firstElementChild ).toHaveAttribute( 'data-popper-arrow', '' );
        } );
    } );


    describe( 'visibleArrow', () => {
        test( 'pass visibleArrow is false', () => {
            const wrapper = mount( Popper, {
                propsData: {
                    visibleArrow: false,
                },
            } );
            wrapper.vm.createPopper();

            expect( wrapper.vm.popper ).not.toBeNull();
            expect( wrapper.vm.referenceElement ).toBeEmptyDOMElement();
            expect( wrapper.vm.popperElement ).toHaveStyle( 'z-index: 2000' );
            expect( wrapper.vm.popperElement ).toBeEmptyDOMElement();
        } );
    } );

    describe( 'appendToBody', () => {
        test( 'pass appendToBody is false', () => {
            const wrapper = mount( Popper, {
                propsData: {
                    appendToBody: false,
                },
                attachTo: document.body,
            } );
            wrapper.vm.createPopper();

            expect( document.body ).not.toContainElement( wrapper.vm.popperElement );
        } );

        test( 'pass appendToBody is true', () => {
            const wrapper = mount( Popper, {
                propsData: {
                    appendToBody: true,
                },
                attachTo: document.body,
            } );
            wrapper.vm.createPopper();

            expect( document.body ).toContainElement( wrapper.vm.popperElement );
        } );
    } );


    describe( 'destroy popper when calling createPopper twice', () => {
        const wrapper = mount( Popper );
        wrapper.vm.createPopper();

        const popper = wrapper.vm.popper;
        expect( popper ).not.toBeNull();

        wrapper.vm.createPopper();
        expect( popper ).not.toBeNull();
        expect( wrapper.vm.popper ).not.toEqual( popper );
    } );

    describe( 'destroy', () => {
        test( 'destroy when popper exist', () => {
            const wrapper = mount( Popper, {
                attachTo: document.body,
            } );

            wrapper.vm.createPopper();
            wrapper.destroy();
            expect( document.body ).not.toContainElement( wrapper.vm.popperElement );
        } );
    } );
} );
