import { mount } from '@vue/test-utils';
import JTag from '../index';


describe( 'JTag', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JTag );
            expect( wrapper.html() ).toBe( `<span class="j_tag"></span>` );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'create text', () => {
            const wrapper = mount( JTag, {
                scopedSlots: {
                    default() {
                        return '变化趋势';
                    },
                },
            } );
            expect( wrapper.html() ).toBe( '<span class="j_tag">变化趋势</span>' );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'click', async () => {
            const onClick = jest.fn();
            const wrapper = mount( JTag, {
                listeners: {
                    click: onClick,
                },
            } );
            await wrapper.trigger( 'click' );
            expect( onClick ).toHaveBeenCalled();
            expect( onClick ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'mouseover', async () => {
            const onMouseOver = jest.fn();
            const wrapper = mount( JTag, {
                listeners: {
                    mouseover: onMouseOver,
                },
            } );
            await wrapper.trigger( 'mouseover' );
            expect( onMouseOver ).toHaveBeenCalled();
            expect( onMouseOver ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'mouseout', async () => {
            const onMouseOut = jest.fn();
            const wrapper = mount( JTag, {
                listeners: {
                    mouseout: onMouseOut,
                },
            } );
            await wrapper.trigger( 'mouseout' );
            expect( onMouseOut ).toHaveBeenCalled();
            expect( onMouseOut ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'size', () => {
        test( 'small size', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    size: 'small',
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_tag_small' );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'large size', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    size: 'large',
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_tag_large' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'active', () => {
        test( 'is active', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    active: true,
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_tag_active' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'disable', () => {
        test( 'is disable', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    disable: true,
                },
            } );
            expect( wrapper.classes() ).toContain( 'j_tag_disable' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'closable', () => {
        test( 'is closable', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    closable: true,
                },
            } );
            const closeElement = wrapper.find( '.j_tag_close' );
            expect( closeElement.exists() ).toBe( true );

            const closeIcon = wrapper.find( '.j-icon_tag_close' );
            expect( closeIcon.exists() ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'is closable click', async () => {
            const onClose = jest.fn();
            const wrapper = mount( JTag, {
                propsData: {
                    closable: true,
                },
                listeners: {
                    close: onClose,
                },
            } );

            const closeIcon = wrapper.find( '.j-icon_tag_close' );
            await closeIcon.trigger( 'click' );

            expect( onClose ).toHaveBeenCalled();
            expect( onClose ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'slot icon', () => {
            const wrapper = mount( JTag, {
                propsData: {
                    closable: true,
                },
                scopedSlots: {
                    icon: '<i class="j-icon_tag_close_custom"></i>',
                },
            } );

            const closeElement = wrapper.find( '.j_tag_close' );
            expect( closeElement.exists() ).toBe( true );

            const closeIcon = wrapper.find( '.j-icon_tag_close' );
            expect( closeIcon.exists() ).toBe( false );


            const customIcon = wrapper.find( '.j-icon_tag_close_custom' );
            expect( customIcon.exists() ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );
} );
