import { mount } from '@vue/test-utils';
import JButton from '../index';


describe( 'JButton', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JButton );
            expect( wrapper.html() ).toBe( `<button class="j_button"></button>` );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'create text', () => {
            const wrapper = mount( JButton, {
                scopedSlots: {
                    default() {
                        return '添加';
                    },
                },
            } );
            const buttonContent = wrapper.find( '.j_button_content' );
            expect( buttonContent.html() ).toBe( `<span class="j_button_content">添加</span>` );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'create icon', () => {
            const wrapper = mount( JButton, {
                scopedSlots: {
                    default: '<i class="j-icon_right_arrow"></i>',
                },
            } );
            const buttonContent = wrapper.find( '.j_button_content' );
            const slotDefault = buttonContent.find( '.j-icon_right_arrow' );
            expect( slotDefault.exists() ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'click', async () => {
            const onClick = jest.fn();
            const wrapper = mount( JButton, {
                scopedSlots: {
                    default() {
                        return '添加';
                    },
                },
                listeners: {
                    click: onClick,
                },
            } );
            await wrapper.trigger( 'click' );
            expect( onClick ).toHaveBeenCalled();
            expect( onClick ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'size', () => {
        test( 'small size', () => {
            const wrapper = mount( JButton, {
                propsData: {
                    size: 'small',
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_button_small' );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'large size', () => {
            const wrapper = mount( JButton, {
                propsData: {
                    size: 'large',
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_button_large' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'round', () => {
        test( 'is round', () => {
            const wrapper = mount( JButton, {
                propsData: {
                    round: true,
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_button_round' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'border', () => {
        test( 'is border', () => {
            const wrapper = mount( JButton, {
                propsData: {
                    border: true,
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_button_border' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'disabled', () => {
        test( 'is disabled', () => {
            const wrapper = mount( JButton, {
                propsData: {
                    disabled: true,
                },
            } );
            expect( wrapper.attributes( 'disabled' ) ).toBe( 'disabled' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );
} );
