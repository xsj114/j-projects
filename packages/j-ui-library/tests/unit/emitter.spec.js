import { mount } from '@vue/test-utils';
import Emitter from '@mixins/emitter';


const ChildSecondComponent = {
    render() {
        return '<div>child second</div>';
    },
    name: 'ChildSecondComponent',
};

const broadcastFn = jest.fn();
const dispatchFn = jest.fn();

const ChildComponent = {
    created() {
        this.$on( 'visible', broadcastFn );
    },
    render() {
        return '<div>child</div>';
    },
    mixins: [
        Emitter,
    ],
    name: 'ChildComponent',
};

const ParentComponent = {
    created() {
        this.$on( 'visible', dispatchFn );
    },
    render() {
        return (
            <div>
                <child-component/>
                <child-second-component/>
            </div>
        );
    },
    mixins: [
        Emitter,
    ],
    name: 'ParentComponent',
    components: {
        ChildComponent,
        ChildSecondComponent,
    },
};


describe( 'Emitter', () => {
    describe( 'broadcast', () => {
        test( 'broadcast', () => {
            const Compenent = {
                render() {
                    return <parent-component/>;
                },
                components: {
                    ParentComponent,
                },
            };

            const wrapper = mount( Compenent );
            const parentWrapper = wrapper.findComponent( ParentComponent );
            parentWrapper.vm.broadcast( 'ChildComponent', 'visible', [ true, 2 ] );

            expect( broadcastFn ).toHaveBeenCalledTimes( 1, [ true, 2 ] );
        } );
    } );


    describe( 'dispatch', () => {
        test( 'dispatch', () => {
            const Compenent = {
                render() {
                    return <parent-component/>;
                },
                components: {
                    ParentComponent,
                },
            };

            const wrapper = mount( Compenent );
            const childWrapper = wrapper.findComponent( ChildComponent );
            childWrapper.vm.dispatch( 'ParentComponent', 'visible', [ true, 2 ] );

            expect( dispatchFn ).toHaveBeenCalledTimes( 1, [ 'visible', true, 2 ] );
        } );

        test( 'dispatch self', () => {
            const fn = jest.fn();

            const Compenent = {
                created() {
                    this.$on( 'visible', fn );
                },
                render() {
                    return <parent-component/>;
                },
                components: {
                    ParentComponent,
                },
                name: 'TestComponent',
                mixins: [ Emitter ],
            };
            const wrapper = mount( Compenent );
            wrapper.vm.dispatch( 'TestComponent', 'visible', [ true, 3 ] );

            expect( fn ).toHaveBeenCalledTimes( 0 );
        } );


        test( 'dispatch forebear component', () => {
            const fn = jest.fn();

            const Compenent = {
                created() {
                    this.$on( 'visible', fn );
                },
                render() {
                    return <parent-component/>;
                },
                components: {
                    ParentComponent,
                },
                name: 'TestComponent',
            };

            const wrapper = mount( Compenent );
            const childWrapper = wrapper.findComponent( ChildComponent );
            childWrapper.vm.dispatch( 'TestComponent', 'visible', [ true, 3 ] );

            expect( fn ).toHaveBeenCalledTimes( 1 );
            expect( fn ).toHaveBeenCalledTimes( 1, [ 'visible', true, 3 ] );
        } );
    } );
} );

