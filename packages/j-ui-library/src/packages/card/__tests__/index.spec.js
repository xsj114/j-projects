import { mount } from '@vue/test-utils';
import JCard from '../index';

describe( 'JCard', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JCard );
            const el = wrapper.find( '.j_card' );
            expect( el.exists() ).toBe( true );

            const identElement = el.find( '.j_card_identity' );
            expect( identElement.exists() ).toBe( true );

            const iconElement = identElement.find( '.j_card_identity_icon' );
            expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_patient"></i></span>' );

            const roleElement = identElement.find( '.j_card_role' );
            expect( roleElement.html() ).toBe( '<span class="j_card_role j_card_role_patient">患者</span>' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'dblclick event', async () => {
            const onDoubleClick = jest.fn();
            const wrapper = mount( JCard, {
                listeners: {
                    textDbClick: onDoubleClick,
                },
                propsData: {
                    role: 'patient',
                    text: '123',
                },
                scopedSlots: {
                    prefix: '<i class="j-icon_card_start"></i>',
                },
            } );

            const textElement = wrapper.find( '.j_card_content_text_inner' );
            await textElement.trigger( 'dblclick' );
            expect( onDoubleClick ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'mousedown event', async () => {
            const onMouseDown = jest.fn();
            const wrapper = mount( JCard, {
                listeners: {
                    mousedown: onMouseDown,
                },
            } );
            await wrapper.trigger( 'mousedown' );
            expect( onMouseDown ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'mouseup event', async () => {
            const onMouseUp = jest.fn();
            const wrapper = mount( JCard, {
                listeners: {
                    mouseup: onMouseUp,
                },
            } );
            await wrapper.trigger( 'mouseup' );
            expect( onMouseUp ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'size', () => {
        test( 'small size', () => {
            const wrapper = mount( JCard, {
                propsData: {
                    size: 'small',
                },
            } );
            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.classes( 'j_card_content_small' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'large size', () => {
            const wrapper = mount( JCard, {
                propsData: {
                    size: 'large',
                },
            } );
            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.classes( 'j_card_content_large' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'role', () => {
        describe( 'patient', () => {
            test( 'role is patient and direction is vertical', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'patient',
                    },
                } );

                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const identElement = el.find( '.j_card_identity' );
                expect( identElement.exists() ).toBe( true );

                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_patient"></i></span>' );

                const roleElement = identElement.find( '.j_card_role' );
                expect( roleElement.html() ).toBe( '<span class="j_card_role j_card_role_patient">患者</span>' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'role is patient and direction is horizontal', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'patient',
                        direction: 'horizontal',
                    },
                } );
                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const identElement = el.find( '.j_card_identity' );
                expect( identElement.exists() ).toBe( true );

                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_patient"></i></span>' );

                const roleElement = identElement.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.classes( 'j_card_role_patient' ) ).toBe( false );

                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );
                expect( contentElement.classes( 'j_card_content_patient' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'doctor', () => {
            test( 'role is doctor and direction is vertical', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'doctor',
                    },
                } );
                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const identElement = el.find( '.j_card_identity' );
                expect( identElement.classes( '.j_card_identity_doctor' ) );
                expect( identElement.exists() ).toBe( true );


                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_doctor"></i></span>' );


                const roleElement = identElement.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.classes( 'j_card_role_doctor' ) ).toBe( true );
                expect( roleElement.text() ).toBe( '医生' );


                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );
                expect( contentElement.classes( 'j_card_content_doctor' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'role is doctor and direction is horizontal', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'doctor',
                        direction: 'horizontal',
                    },
                } );
                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );


                const identElement = el.find( '.j_card_identity' );
                expect( identElement.exists() ).toBe( true );
                expect( identElement.classes( '.j_card_identity_doctor' ) );

                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_doctor"></i></span>' );

                const roleElement = identElement.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.text() ).toBe( '医生' );


                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );
                expect( contentElement.classes( 'j_card_content_doctor' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );


    describe( 'direction', () => {
        describe( 'vertical', () => {
            test( 'direction is vertical and role is patient', () => {
                const wrapper = mount( JCard );

                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const roleElement = wrapper.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.text() ).toBe( '患者' );
                expect( roleElement.classes( 'j_card_role_patient' ) );

                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'direction is vertical and role is doctor', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'doctor',
                    },
                } );
                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const roleElement = wrapper.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.text() ).toBe( '医生' );
                expect( roleElement.classes( 'j_card_role_doctor' ) ).toBe( true );

                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'horizontal', () => {
            test( 'direction is horizontal and role is patient', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        direction: 'horizontal',
                    },
                } );

                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const roleElement = wrapper.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.text() ).toBe( '患者' );
                expect( roleElement.classes( 'j_card_role_horizontal' ) ).toBe( true );


                const identElement = el.find( '.j_card_identity' );
                expect( identElement.exists() ).toBe( true );
                expect( identElement.classes( 'j_card_identity_horizontal' ) ).toBe( true );

                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );
                expect( contentElement.classes( 'j_card_content_horizontal' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'direction is horizontal and role is doctor', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        direction: 'horizontal',
                        role: 'doctor',
                    },
                } );

                const el = wrapper.find( '.j_card' );
                expect( el.exists() ).toBe( true );

                const roleElement = wrapper.find( '.j_card_role' );
                expect( roleElement.exists() ).toBe( true );
                expect( roleElement.text() ).toBe( '医生' );
                expect( roleElement.classes( 'j_card_role_horizontal' ) ).toBe( true );


                const identElement = el.find( '.j_card_identity' );
                expect( identElement.exists() ).toBe( true );
                expect( identElement.classes( 'j_card_identity_horizontal' ) ).toBe( true );

                const contentElement = wrapper.find( '.j_card_content' );
                expect( contentElement.exists() ).toBe( true );
                expect( contentElement.classes( 'j_card_content_horizontal' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );


    describe( 'text', () => {
        test( 'test is html', () => {
            const wrapper = mount( JCard, {
                propsData: {
                    text: '<s1>test</s1>',
                },
            } );
            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.html( '<span class="j_card_content j_card_content_patient"><span class=""><span><s1>test</s1></span></span></span>' ) );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'test is text', () => {
            const wrapper = mount( JCard, {
                propsData: {
                    text: 'test',
                },
            } );
            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.html( '<span class="j_card_content j_card_content_patient"><span class=""><span>test</span></span></span>' ) );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot prefix', () => {
        test( 'pass prefix', () => {
            const wrapper = mount( JCard, {
                scopedSlots: {
                    prefix: '<i class="j-icon_card_start"></i>',
                },
            } );

            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.exists() ).toBe( true );


            const prefixElement = contentElement.find( '.j_card_content_icon' );
            expect( prefixElement.exists() ).toBe( true );
            expect( prefixElement.html() ).toBe( '<span class="j_card_content_icon"><i class="j-icon_card_start"></i></span>' );

            const textElement = wrapper.find( '.j_card_content_text' );
            expect( textElement.exists() ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot append', () => {
        test( 'pass append', () => {
            const wrapper = mount( JCard, {
                scopedSlots: {
                    append: '<i class="j-icon_card_start"></i>',
                },
            } );

            const contentElement = wrapper.find( '.j_card_content' );
            expect( contentElement.exists() ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot avatar', () => {
        describe( 'pass avatar', () => {
            test( 'pass avatar and role is patient', () => {
                const wrapper = mount( JCard, {
                    scopedSlots: {
                        avatar: '<i class="j-icon_card_start"></i>',
                    },
                } );

                const identElement = wrapper.find( '.j_card_identity' );
                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_start"></i></span>' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'pass avatar and role is doctor', () => {
                const wrapper = mount( JCard, {
                    scopedSlots: {
                        avatar: '<i class="j-icon_card_start"></i>',
                    },
                    propsData: {
                        role: 'doctor',
                    },
                } );

                const identElement = wrapper.find( '.j_card_identity' );
                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_start"></i></span>' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'no pass avatar', () => {
            test( 'no pass avatar and role is patient', () => {
                const wrapper = mount( JCard );

                const identElement = wrapper.find( '.j_card_identity' );
                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_patient"></i></span>' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'no pass avatar and role is doctor', () => {
                const wrapper = mount( JCard, {
                    propsData: {
                        role: 'doctor',
                    },
                } );

                const identElement = wrapper.find( '.j_card_identity' );
                const iconElement = identElement.find( '.j_card_identity_icon' );
                expect( iconElement.html() ).toBe( '<span class="j_card_identity_icon"><i class="j-icon_card_doctor"></i></span>' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );
} );
