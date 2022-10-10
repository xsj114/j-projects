import { mount } from '@vue/test-utils';
import JBubble from '../index';
import { debounce } from '@utils/utils';

describe( 'JBubble', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );

            const wrapperElement = wrapper.find( '.j_bubble' );
            expect( wrapperElement.exists() ).toBe( true );

            const firstElement = wrapper.find( 'span' );
            expect( firstElement.html() ).toBe( '<span>测试</span>' );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.classes( 'j_bubble_popper' ) ).toBe( true );
            expect( popperElement.classes( 'j_popper' ) ).toBe( true );
            expect( popperElement.classes( 'j_popper_dark' ) ).toBe( true );
            expect( popperElement.isVisible() ).toBe( false );

            const ulElement = wrapper.find( 'ul' );
            expect( ulElement.html() ).toBe( '<ul></ul>' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'create and no root element', () => {
            const wrapper = mount( JBubble );
            expect( wrapper.html() ).toBe( '' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'create and no tag element', () => {
            const WrapperComp = {
                template: `
                <JBubble>
                    测试
                </JBubble>
              `,
                components: {
                    JBubble,
                },
            };
            const wrapper = mount( WrapperComp ).findComponent( JBubble );
            expect( wrapper.html() ).toBe( '' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'reference element mouseover', async () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );
            const referenceElement = wrapper.find( 'span' );
            await referenceElement.trigger( 'mouseover' );
            expect( wrapper.vm.showPopper ).toBe( true );
            expect( wrapper.vm.expectedState ).toBe( true );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.isVisible() ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'reference element mouseout', async () => {
            const fn = jest.fn();
            jest.useFakeTimers();

            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );
            const referenceElement = wrapper.find( 'span' );
            await referenceElement.trigger( 'mouseout' );
            expect( wrapper.vm.expectedState ).toBe( false );

            debounce( 200, fn );
            jest.runAllTimers();

            expect( wrapper.vm.showPopper ).toBe( false );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'popper element mouseover', async () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            await popperElement.trigger( 'mouseenter' );
            expect( wrapper.vm.showPopper ).toBe( true );
            expect( wrapper.vm.expectedState ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'popper element mouseout', async () => {
            const fn = jest.fn();
            jest.useFakeTimers();

            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );
            const popperElement = wrapper.find( '.j_bubble_popper' );
            await popperElement.trigger( 'mouseleave' );
            expect( wrapper.vm.expectedState ).toBe( false );

            debounce( 200, fn );
            jest.runAllTimers();

            expect( wrapper.vm.showPopper ).toBe( false );
            expect( popperElement.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'destroyed', () => {
            const wrapper = mount( JBubble, {
                attachTo: document.body,
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );

            expect( document.body ).not.toBeEmptyDOMElement();

            expect( wrapper ).toMatchSnapshot();
            wrapper.destroy();

            expect( document.body ).not.toContainElement( wrapper.element );
        } );
    } );


    describe( 'size', () => {
        test( 'small size', () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
                propsData: {
                    size: 'small',
                },
            } );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.classes( 'j_bubble_popper_small' ) ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'large size', () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
                propsData: {
                    size: 'large',
                },
            } );

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.classes( 'j_bubble_popper_large' ) ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot content', () => {
        test( 'content', async () => {
            const WrapperComp = {
                template: `
                <JBubble>
                    <span>测试</span>
                    <template v-slot:content>
                        <li>阳性</li><li>阴性</li>
                    </template>
                </JBubble>
              `,
                components: {
                    JBubble,
                },
            };

            const wrapper = mount( WrapperComp ).findComponent( JBubble );

            const ulElement = wrapper.find( 'ul' );
            expect( ulElement.element ).toContainHTML( `<li>阳性</li><li>阴性</li>` );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'JBubble method', () => {
        test( 'open', async () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );

            wrapper.vm.open();
            expect( wrapper.vm.showPopper ).toBe( true );

            await wrapper.vm.$nextTick();

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.isVisible() ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'close', async () => {
            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );

            wrapper.vm.close();
            expect( wrapper.vm.showPopper ).toBe( false );

            await wrapper.vm.$nextTick();

            const popperElement = wrapper.find( '.j_bubble_popper' );
            expect( popperElement.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'user operation', () => {
        test( 'move the reference element into the popper element at the moment', async () => {
            const fn = jest.fn();
            jest.useFakeTimers();

            const wrapper = mount( JBubble, {
                scopedSlots: {
                    default: '<span>测试</span>',
                },
            } );
            const referenceElement = wrapper.find( 'span' );
            const popperElement = wrapper.find( '.j_bubble_popper' );

            await referenceElement.trigger( 'mouseover' );
            expect( popperElement.isVisible() ).toBe( true );
            await referenceElement.trigger( 'mouseout' );
            expect( popperElement.isVisible() ).toBe( true );
            debounce( 100, fn );
            await popperElement.trigger( 'mouseenter' );
            expect( popperElement.isVisible() ).toBe( true );
            jest.runAllTimers();
            await popperElement.trigger( 'mouseleave' );
            debounce( 100, fn );
            await referenceElement.trigger( 'mouseover' );
            jest.runAllTimers();
            expect( popperElement.isVisible() ).toBe( true );
            await referenceElement.trigger( 'mouseout' );
            debounce( 300, fn );
            jest.runAllTimers();
            await wrapper.vm.$nextTick();
            expect( popperElement.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );
} );
