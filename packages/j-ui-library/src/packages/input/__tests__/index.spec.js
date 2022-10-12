import Vue from 'vue';
import { mount, createWrapper } from '@vue/test-utils';
import JInput from '../index';

describe( 'JInput', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JInput );
            const inputElement = wrapper.find( 'input' );

            expect( wrapper.exists() ).toBe( true );
            expect( wrapper.classes( 'j_input' ) ).toBe( true );

            expect( inputElement.exists() ).toBe( true );
            expect( inputElement.classes( 'j_input_inner' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'mouseenter event', async () => {
            const wrapper = mount( JInput );
            await wrapper.trigger( 'mouseenter' );
            expect( wrapper.vm.$data.hovering ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'mouseleave event', async () => {
            const wrapper = mount( JInput );
            await wrapper.trigger( 'mouseleave' );
            expect( wrapper.vm.$data.hovering ).toBe( false );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'focus event', async () => {
            const onFocus = jest.fn();
            const wrapper = mount( JInput, {
                listeners: {
                    focus: onFocus,
                },
            } );
            const inputElement = wrapper.find( 'input' );

            await inputElement.trigger( 'focus' );
            expect( wrapper.vm.$data.focused ).toBe( true );
            expect( onFocus ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'blur event', async () => {
            const onBlur = jest.fn();
            const wrapper = mount( JInput, {
                listeners: {
                    blur: onBlur,
                },
            } );
            const inputElement = wrapper.find( 'input' );

            await inputElement.trigger( 'blur' );
            expect( wrapper.vm.$data.focused ).toBe( false );
            expect( onBlur ).toHaveBeenCalledTimes( 1 );
            expect( wrapper ).toMatchSnapshot();
        } );

        describe( 'input event', () => {
            test( 'input', async () => {
                const onInput = jest.fn();
                const wrapper = mount( JInput, {
                    listeners: {
                        input: onInput,
                    },
                    propsData: {
                        value: 'test',
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                inputElement.element.value = 'test two';
                await inputElement.trigger( 'input' );
                expect( onInput ).toHaveBeenCalledTimes( 1 );
                expect( onInput.mock.calls[ 0 ][ 0 ] ).toBe( 'test two' );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'isComposing is ture', async () => {
                const onInput = jest.fn();
                const wrapper = mount( JInput, {
                    listeners: {
                        input: onInput,
                    },
                    propsData: {
                        value: '',
                    },
                    data() {
                        return {
                            isComposing: true,
                        };
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                inputElement.element.value = 'test';
                await inputElement.trigger( 'input' );
                expect( onInput ).toHaveBeenCalledTimes( 0 );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'event value equal nativeInputValue', async () => {
                const onInput = jest.fn();
                const wrapper = mount( JInput, {
                    listeners: {
                        input: onInput,
                    },
                    propsData: {
                        value: 'test',
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                inputElement.element.value = 'test';
                await inputElement.trigger( 'input' );
                expect( onInput ).toHaveBeenCalledTimes( 0 );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        test( 'change event', async () => {
            const onChange = jest.fn();
            const wrapper = mount( JInput, {
                listeners: {
                    change: onChange,
                },
                propsData: {
                    value: '',
                },
            } );
            const inputElement = wrapper.find( 'input' );
            inputElement.element.value = 'test';
            await inputElement.trigger( 'change' );
            expect( onChange ).toHaveBeenCalledTimes( 1 );
            expect( onChange.mock.calls[ 0 ][ 0 ] ).toBe( 'test' );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'compositionstart', async () => {
            const wrapper = mount( JInput );
            const inputElement = wrapper.find( 'input' );
            await inputElement.trigger( 'compositionstart' );
            expect( wrapper.vm.$data.isComposing ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        describe( 'compositionend', ()=>{
            test( 'isComposing is true', async () => {
                const wrapper = mount( JInput, {
                    data() {
                        return {
                            isComposing: true,
                        };
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                await inputElement.trigger( 'compositionend' );
                expect( wrapper.vm.$data.isComposing ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'isComposing is false', async () => {
                const wrapper = mount( JInput );
                const inputElement = wrapper.find( 'input' );
                await inputElement.trigger( 'compositionend' );
                expect( wrapper.vm.$data.isComposing ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );


    describe( 'type', () => {
        test( 'default', () => {
            const inputElement = mount( JInput ).find( 'input' );
            expect( inputElement.attributes( 'type' ) ).toBe( 'text' );
            expect( inputElement ).toMatchSnapshot();
        } );

        test( 'pass type is number', () => {
            const inputElement = mount( JInput, {
                propsData: {
                    type: 'number',
                },
            } ).find( 'input' );
            expect( inputElement.attributes( 'type' ) ).toBe( 'number' );
            expect( inputElement ).toMatchSnapshot();
        } );

        test( 'pass type is passworad', () => {
            const inputElement = mount( JInput, {
                propsData: {
                    type: 'password',
                },
            } ).find( 'input' );
            expect( inputElement.attributes( 'type' ) ).toBe( 'password' );
            expect( inputElement ).toMatchSnapshot();
        } );

        test( 'pass type is textarea', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    type: 'textarea',
                },
            } );
            expect( wrapper.html() ).toBe( '' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'size', () => {
        test( 'small size', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    size: 'small',
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.classes( 'j_input_inner_small' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'large size', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    size: 'large',
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.classes( 'j_input_inner_large' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'round', () => {
        test( 'is round', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    round: true,
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.classes( 'j_input_inner_round' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'is round and pass prepend slots', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    round: true,
                },
                scopedSlots: {
                    prepend() {
                        return '<template>Http://</template>';
                    },
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.classes( 'j_input_inner_round' ) ).toBe( true );
            expect( inputElement.classes( 'j_input_inner_round_prepend' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'is round and pass append slots', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    round: true,
                },
                scopedSlots: {
                    append() {
                        return '<template>.com</template>';
                    },
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.classes( 'j_input_inner_round' ) ).toBe( true );
            expect( inputElement.classes( 'j_input_inner_round_append' ) ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'tabindex', () => {
        test( 'pass tabindex', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    tabindex: '1',
                },
            } );

            const inputElement = wrapper.find( 'input' );
            expect( inputElement.attributes( 'tabindex' ) ).toBe( '1' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'disabled', () => {
        test( 'pass disabled', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    disabled: true,
                },
            } );
            const inputElement = wrapper.find( 'input' );
            expect( inputElement.attributes( 'disabled' ) ).toBe( 'disabled' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'readonly', () => {
        test( 'pass readonly', () => {
            const wrapper = mount( JInput, {
                propsData: {
                    readonly: true,
                },
            } );
            const inputElement = wrapper.find( 'input' );
            expect( inputElement.attributes( 'readonly' ) ).toBe( 'readonly' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'clearable', () => {
        describe( 'pass clearable and mock hovering', () => {
            test( 'disabled and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            hovering: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( true );

                const clearElement = wrapper.find( '.j-icon_tag_close' );
                expect( clearElement.exists() ).toBe( true );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled and readonly is false and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        value: '',
                    },
                    data() {
                        return {
                            hovering: true,
                        };
                    },
                } );
                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is true and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: true,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            hovering: true,
                        };
                    },
                } );
                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'disabled is false an readonly is true and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: true,
                        value: 'test',
                    },
                    data() {
                        return {
                            hovering: true,
                        };
                    },
                } );
                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'pass clearable and mock focused', () => {
            test( 'disabled and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( true );

                const clearElement = wrapper.find( '.j-icon_tag_close' );
                expect( clearElement.exists() ).toBe( true );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled and readonly is false and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        value: '',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is true and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: true,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is false an readonly is true and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: true,
                        value: 'test',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'click event', () => {
            test( 'click', async () => {
                const onInput = jest.fn();
                const onChange = jest.fn();
                const onClear = jest.fn();

                const wrapper = mount( JInput, {
                    propsData: {
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                    listeners: {
                        input: onInput,
                        change: onChange,
                        clear: onClear,
                    },
                } );
                const iconElement = wrapper.find( '.j_input_icon' );
                const clearBtnElement = iconElement.find( '.j-icon_tag_close' );
                await clearBtnElement.trigger( 'click' );

                expect( onInput ).toHaveBeenCalledTimes( 1 );
                expect( onInput.mock.calls[ 0 ][ 0 ] ).toBe( '' );
                expect( onChange ).toHaveBeenCalledTimes( 1 );
                expect( onChange.mock.calls[ 0 ][ 0 ] ).toBe( '' );
                expect( onClear ).toHaveBeenCalledTimes( 1 );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );


    describe( 'showPassword', () => {
        describe( 'pass showPassword and mock focused', () => {
            test( 'disabled and readonly is false and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: '',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( true );

                const passwordElement = wrapper.find( '.j-icon_show_password' );
                expect( passwordElement.exists() ).toBe( true );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is true and readonly is false and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: true,
                        readonly: false,
                        value: '',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is false and readonly is true and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: true,
                        value: '',
                    },
                    data() {
                        return {
                            focused: true,
                        };
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'pass showPassword and mock value', ()=>{
            test( 'disabled is false and readonly is false and value is empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: '',
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is false and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( true );

                const passwordElement = wrapper.find( '.j-icon_show_password' );
                expect( passwordElement.exists() ).toBe( true );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is true and readonly is false and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: true,
                        readonly: false,
                        value: 'test',
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'disabled is false and readonly is true and value not empty', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: true,
                        value: 'test',
                    },
                } );

                const iconElement = wrapper.find( '.j_input_icon' );
                expect( iconElement.exists() ).toBe( false );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'pass showPassword test input type', () => {
            test( 'mock passwordVisible is false', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                } );

                const inputElement = wrapper.find( 'input' );
                expect( inputElement.attributes( 'type' ) ).toBe( 'password' );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'mock passwordVisible is true', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                    data() {
                        return {
                            passwordVisible: true,
                        };
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                expect( inputElement.attributes( 'type' ) ).toBe( 'text' );
                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'mock passwordVisible is true and pass type', () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                        type: 'number',
                    },
                    data() {
                        return {
                            passwordVisible: true,
                        };
                    },
                } );
                const inputElement = wrapper.find( 'input' );
                expect( inputElement.attributes( 'type' ) ).toBe( 'number' );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'click event', () => {
            test( 'click', async () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                    },
                } );

                const inputElement = wrapper.find( '.j_input_inner' );
                const iconElement = wrapper.find( '.j_input_icon' );
                const showPasswordElement = iconElement.find( '.j-icon_show_password' );
                await showPasswordElement.trigger( 'click' );
                expect( wrapper.vm.$data.passwordVisible ).toBe( true );
                expect( inputElement.attributes( 'type' ) ).toBe( 'text' );

                await showPasswordElement.trigger( 'click' );
                expect( wrapper.vm.$data.passwordVisible ).toBe( false );
                expect( inputElement.attributes( 'type' ) ).toBe( 'password' );
                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'click and pass type ', async () => {
                const wrapper = mount( JInput, {
                    propsData: {
                        showPassword: true,
                        disabled: false,
                        readonly: false,
                        value: 'test',
                        type: 'number',
                    },
                } );

                const inputElement = wrapper.find( '.j_input_inner' );
                const iconElement = wrapper.find( '.j_input_icon' );
                const showPasswordElement = iconElement.find( '.j-icon_show_password' );
                await showPasswordElement.trigger( 'click' );
                expect( wrapper.vm.$data.passwordVisible ).toBe( true );
                expect( inputElement.attributes( 'type' ) ).toBe( 'number' );

                await showPasswordElement.trigger( 'click' );
                expect( wrapper.vm.$data.passwordVisible ).toBe( false );
                expect( inputElement.attributes( 'type' ) ).toBe( 'password' );
                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );


    describe( 'value', () => {
        const wrapper = mount( JInput, {
            propsData: {
                value: 'test',
            },
        } );

        const inputElement = wrapper.find( 'input' );
        expect( inputElement.element.value ).toBe( 'test' );
        expect( wrapper ).toMatchSnapshot();
    } );


    test( 'watch nativeInputValue', async () => {
        const callback = jest.fn();
        const wrapper = mount( JInput, {
            propsData: {
                value: '',
            },
        } );
        wrapper.vm.$watch( 'nativeInputValue', callback );
        await wrapper.setProps( { value: 'test' } );
        expect( callback ).toHaveBeenCalledTimes( 1 );
        expect( callback.mock.calls[ 0 ][ 0 ] ).toBe( 'test' );
        expect( callback.mock.calls[ 0 ][ 1 ] ).toBe( '' );
        expect( wrapper ).toMatchSnapshot();
    } );


    describe( 'slot prefix', () => {
        test( 'prefix', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    prefix: '<i class="j-icon_search"></i>',
                },
            } );

            const prefixElement = wrapper.find( '.j_input_prefix' );
            expect( prefixElement.exists() ).toBe( true );

            const prefixIcon = prefixElement.find( '.j-icon_search' );
            expect( prefixIcon.exists() ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'prefix calcIconOffset', async () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    prefix: '<i class="j-icon_search"></i>',
                    prepend: '<i>Http://</i>',
                },
            } );

            const prefixElement = wrapper.find( '.j_input_prefix' );
            expect( prefixElement.element.style ).not.toBe( '' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot suffix', () => {
        test( 'suffix', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    suffix: '<i class="j-icon_calendar"></i>',
                },
            } );

            const suffixElement = wrapper.find( '.j_input_suffix' );
            expect( suffixElement.exists() ).toBe( true );

            const suffixIcon = suffixElement.find( '.j-icon_calendar' );
            expect( suffixIcon.exists() ).toBe( true );
            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'suffix calcIconOffset', async () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    suffix: '<i class="j-icon_search"></i>',
                    append: '<i>.com</i>',
                },
            } );

            const suffixElement = wrapper.find( '.j_input_suffix' );
            expect( suffixElement.element.style ).not.toBe( '' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot prepend', () => {
        test( 'not is round', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    prepend: '<i>Http://</i>',
                },
            } );
            const prependElement = wrapper.find( '.j_input_group_prepend' );
            expect( prependElement.classes( 'j_input_group_prepend' ) ).toBe( true );

            const prependIcon = prependElement.find( 'i' );
            expect( prependIcon.html() ).toBe( '<i>Http://</i>' );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'is round', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    prepend: '<i>Http://</i>',
                },
                propsData: {
                    round: true,
                },
            } );

            const prependElement = wrapper.find( '.j_input_group_prepend' );
            expect( prependElement.classes( 'j_input_group_prepend_round' ) ).toBe( true );

            const prependIcon = prependElement.find( 'i' );
            expect( prependIcon.html() ).toBe( '<i>Http://</i>' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'slot append', () => {
        test( 'not is round', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    append: '<i>.com</i>',
                },
            } );
            const appendElement = wrapper.find( '.j_input_group_append' );
            expect( appendElement.classes( 'j_input_group_append' ) ).toBe( true );

            const appendIcon = appendElement.find( 'i' );
            expect( appendIcon.html() ).toBe( '<i>.com</i>' );
            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'is round', () => {
            const wrapper = mount( JInput, {
                scopedSlots: {
                    append: '<i>.com</i>',
                },
                propsData: {
                    round: true,
                },
            } );
            const appendElement = wrapper.find( '.j_input_group_append' );
            expect( appendElement.classes( 'j_input_group_append' ) ).toBe( true );
            expect( appendElement.classes( 'j_input_group_append_round' ) ).toBe( true );

            const appendIcon = appendElement.find( 'i' );
            expect( appendIcon.html() ).toBe( '<i>.com</i>' );
            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'JInput method', () => {
        test( 'focus', async () => {
            const root = document.createElement( 'div' );
            root.id = 'root';
            document.body.appendChild( root );

            const Constructor = Vue.extend( JInput );
            const vm = new Constructor().$mount( '#root' );
            const wrapper = createWrapper( vm );
            const inputElement = wrapper.find( '.j_input_inner' );

            wrapper.vm.focus();
            expect( inputElement.element ).toHaveFocus();
            expect( wrapper ).toMatchSnapshot();
            wrapper.destroy();
        } );


        test( 'blur', async () => {
            const root = document.createElement( 'div' );
            root.id = 'root';
            document.body.appendChild( root );

            const Constructor = Vue.extend( JInput );
            const vm = new Constructor().$mount( '#root' );
            const wrapper = createWrapper( vm );
            const inputElement = wrapper.find( '.j_input_inner' );
            wrapper.vm.focus();
            wrapper.vm.blur();
            expect( inputElement.element ).not.toHaveFocus();
            expect( wrapper ).toMatchSnapshot();
            wrapper.destroy();
        } );
    } );
} );


