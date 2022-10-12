import Vue from 'vue';
import { mount } from '@vue/test-utils';
import JSelect from '../index';
import JOption from '../src/option';
import JOptionMenu from '../src/optionMenu';
import JInput from '@packages/input';
import JTag from '@packages/tag';


describe( 'JSelect', () => {
    describe( 'single choice', () => {
        describe( 'create', () => {
            test( 'create', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                        };
                    },
                };

                const wrapper = mount( Component );

                const selectComponent = wrapper.findComponent( JSelect );
                const selectElement = wrapper.find( '.j_select' );
                expect( selectElement.exists() ).toBe( true );
                expect( selectComponent.exists() ).toBe( true );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.exists() ).toBe( true );

                await inputComponent.trigger( 'mouseenter' );
                expect( selectComponent.vm.inputHovering ).toBe( true );


                await inputComponent.trigger( 'mouseleave' );
                expect( selectComponent.vm.inputHovering ).toBe( false );

                const OptionMenuComponent = wrapper.findComponent( JOptionMenu );
                expect( OptionMenuComponent.exists() ).toBe( true );

                const OptionMenuListElement = wrapper.find( '.j_option_menu_list' );
                expect( OptionMenuListElement.exists() ).toBe( true );

                await wrapper.vm.$nextTick();
                expect( OptionMenuListElement.element ).toContainHTML( '<ul class="j_option_menu_list"><li class="j_option_menu_list_item">1</li><li class="j_option_menu_list_item">2</li></ul>' );


                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'focus event', async () => {
                const onFocus = jest.fn();
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                    },
                    listeners: {
                        focus: onFocus,
                    },
                } );
                const inputComponent = wrapper.findComponent( JInput );
                const inputElement = inputComponent.find( '.j_input_inner' );
                await inputElement.trigger( 'focus' );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'blur event', async () => {
                jest.useFakeTimers();

                const onBlur = jest.fn();
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                    },
                    listeners: {
                        blur: onBlur,
                    },
                } );
                const selectComponent = wrapper.findComponent( JSelect );
                const inputComponent = wrapper.findComponent( JInput );
                const inputElement = inputComponent.find( '.j_input_inner' );
                await inputElement.trigger( 'blur' );
                jest.runAllTimers();
                expect( onBlur ).toHaveBeenCalledTimes( 1 );
                expect( selectComponent.vm.softFocus ).toBe( false );

                expect( wrapper ).toMatchSnapshot();
            } );


            describe( 'scopedSlots', () => {
                test( 'suffix', () => {
                    const wrapper = mount( JSelect, {
                        propsData: {
                            value: '',
                        },
                        scopedSlots: {
                            'suffix': '<i>suffix</i>',
                        },
                    } );
                    const scopedSlots = wrapper.vm.$scopedSlots;
                    expect( scopedSlots ).toHaveProperty( 'suffix', expect.any( Function ) );

                    expect( wrapper ).toMatchSnapshot();
                } );

                test( 'prefix', () => {
                    const wrapper = mount( JSelect, {
                        propsData: {
                            value: '',
                        },
                        scopedSlots: {
                            'prefix': '<i>prefix</i>',
                        },
                    } );
                    const scopedSlots = wrapper.vm.$scopedSlots;
                    expect( scopedSlots ).toHaveProperty( 'prefix', expect.any( Function ) );

                    expect( wrapper ).toMatchSnapshot();
                } );
            } );


            describe( 'option select event', () => {
                test( 'option select event', async () => {
                    jest.useFakeTimers();

                    const onInput = jest.fn();
                    const onChange = jest.fn();
                    const onFocus = jest.fn();
                    const onBlur = jest.fn();

                    const Component = {
                        render() {
                            return (
                                <j-select
                                    vModel={this.value}
                                    vOn:Input={onInput}
                                    vOn:Change={onChange}
                                    vOn:Focus={onFocus}
                                    vOn:Blur={onBlur}
                                    filterable
                                >
                                    <j-option
                                        value="1"
                                    >1</j-option>
                                    <j-option
                                        value="2"
                                    >2</j-option>
                                </j-select>
                            );
                        },
                        components: {
                            JSelect,
                            JOption,
                        },
                        data() {
                            return {
                                value: '',
                            };
                        },
                    };

                    const wrapper = mount( Component );
                    const selectComponent = wrapper.findComponent( JSelect );
                    const optionComponents = wrapper.findAllComponents( JOption );

                    expect( optionComponents.length ).toBe( 2 );

                    await selectComponent.trigger( 'click' );
                    expect( onFocus ).toHaveBeenCalledTimes( 1 );

                    await optionComponents.at( 1 ).trigger( 'click' );
                    jest.runAllTimers();


                    expect( onBlur ).toHaveBeenCalledTimes( 0 );
                    expect( onFocus ).toHaveBeenCalledTimes( 1 );

                    expect( selectComponent.vm.visible ).toBe( false );
                    expect( onInput ).toHaveBeenCalledTimes( 1 );
                    expect( onChange ).toHaveBeenCalledTimes( 1 );
                    expect( onInput.mock.calls[ 0 ][ 0 ] ).toBe( '2' );
                    expect( onChange.mock.calls[ 0 ][ 0 ] ).toBe( '2' );

                    expect( selectComponent.vm.softFocus ).toBe( false );

                    await selectComponent.trigger( 'click' );
                    await optionComponents.at( 1 ).trigger( 'click' );
                    jest.runAllTimers();
                    expect( onChange ).toHaveBeenCalledTimes( 1 );

                    expect( wrapper ).toMatchSnapshot();
                } );
            } );
        } );


        describe( 'size', () => {
            test( 'small size', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        size: 'small',
                        value: '',
                    },
                } );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.vm.size ).toBe( 'small' );


                const emptyElement = wrapper.find( '.j_select_empty' );
                expect( emptyElement.classes( 'j_select_empty' ) ).toBe( true );
                expect( emptyElement.classes( 'j_select_empty_small' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'large size', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        size: 'large',
                        value: '',
                    },
                } );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.vm.size ).toBe( 'large' );

                const emptyElement = wrapper.find( '.j_select_empty' );
                expect( emptyElement.classes( 'j_select_empty' ) ).toBe( true );
                expect( emptyElement.classes( 'j_select_empty_large' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'disabled', () => {
            test( 'pass disabled', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        disabled: true,
                        value: '',
                    },
                } );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.vm.disabled ).toBe( true );

                wrapper.vm.toggleMenu();
                expect( wrapper.vm.visible ).toBe( false );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'no pass disabled', () => {
                const onFocus = jest.fn();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                    },
                    listeners: {
                        focus: onFocus,
                    },
                } );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.vm.disabled ).toBe( false );

                wrapper.vm.toggleMenu();
                expect( wrapper.vm.visible ).toBe( true );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'value', () => {
            test( 'pass  value', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '1',
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );
                expect( selectComponent.vm.options.length ).toBe( 2 );
                expect( selectComponent.vm.selectedLabel ).toBe( '1' );
                expect( selectComponent.vm.options[ 0 ].hover ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'popperClass', () => {
            test( 'pass popperClass', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                        popperClass: 'popper_class',
                    },
                } );

                const OptionMenuComponent = wrapper.findComponent( JOptionMenu );
                expect( OptionMenuComponent.element ).toHaveClass( 'popper_class' );
                expect( OptionMenuComponent.element ).toHaveClass( 'j_option_menu' );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'no pass popperClass', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                    },
                } );

                const OptionMenuComponent = wrapper.findComponent( JOptionMenu );
                expect( OptionMenuComponent.element ).toHaveClass( 'j_option_menu' );
                expect( OptionMenuComponent.element ).not.toHaveClass( 'popper_class' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'placeholder', () => {
            test( 'pass placeholder', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                        placeholder: '请选择选项',
                    },
                } );

                expect( wrapper.vm.currentPlaceholder ).toBe( '请选择选项' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'no pass placeholder', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                    },
                } );

                expect( wrapper.vm.currentPlaceholder ).toBe( '请选择' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'clearable', () => {
            test( 'pass clearable', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                        clearable: true,
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.exists() ).toBe( true );
                expect( closeElement.classes( 'j-icon_tag_close' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'pass clearable and showClose is false', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                        clearable: true,
                        disabled: true,
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.exists() ).toBe( true );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_caret' ) ).toBe( true );

                await wrapper.setData( { visible: true } );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_reverse' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'no pass clearabel', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );

                await wrapper.setData( { visible: true } );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_reverse' ) ).toBe( true );

                await closeElement.trigger( 'click' );
                expect( wrapper.vm.value ).toBe( '1' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'click close element', async () => {
                const inputFn = jest.fn();
                const clearFn = jest.fn();
                const changeFn = jest.fn();

                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                clearable
                                vOn:input={inputFn}
                                vOn:clear={clearFn}
                                vOn:change={changeFn}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '1',
                        };
                    },
                };

                const wrapper = mount( Component );

                const selectComponent = wrapper.findComponent( JSelect );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                await closeElement.trigger( 'click' );
                expect( selectComponent.vm.visible ).toBe( false );

                expect( inputFn ).toHaveBeenCalledTimes( 1 );
                expect( inputFn.mock.calls[ 0 ][ 0 ] ).toBe( '' );

                expect( clearFn ).toHaveBeenCalledTimes( 1 );

                expect( changeFn ).toHaveBeenCalledTimes( 1 );
                expect( changeFn.mock.calls[ 0 ][ 0 ] ).toBe( '' );

                await wrapper.vm.$nextTick();
                expect( wrapper.vm.value ).toBe( '' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'filterable', () => {
            test( 'pass filterable', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                        filterable: true,
                    },
                } );

                await wrapper.setData( { visible: true } );
                expect( wrapper.vm.readonly ).toBe( false );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'no pass filterable', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                    },
                } );

                await wrapper.setData( { visible: true } );
                expect( wrapper.vm.readonly ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'keyup event query equal selectedLabel', async () => {
                jest.useFakeTimers();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '',
                        filterable: true,
                    },
                } );

                expect( wrapper.vm.selectedLabel ).toBe( '' );
                expect( wrapper.vm.query ).toBe( '' );
                await wrapper.trigger( 'click' );
                expect( wrapper.vm.selectedLabel ).toBe( '' );
                expect( wrapper.vm.query ).toBe( '' );
                expect( wrapper.vm.visible ).toBe( true );

                const inputComponent = wrapper.findComponent( JInput );

                await inputComponent.trigger( 'focus' );
                await inputComponent.trigger( 'keyup', {
                    key: '',
                } );
                await wrapper.setData( { selectedLabel: '' } );
                jest.runAllTimers();

                expect( wrapper.vm.query ).toBe( '' );
                expect( wrapper.vm.selectedLabel ).toBe( '' );

                await wrapper.setData( { visible: false } );

                expect( wrapper.vm.query ).toBe( '' );
                expect( wrapper.vm.selectedLabel ).toBe( '' );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'keyup event', async () => {
                jest.useFakeTimers();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                        filterable: true,
                    },
                } );

                expect( wrapper.vm.selectedLabel ).toBe( '1' );
                expect( wrapper.vm.query ).toBe( '' );
                await wrapper.trigger( 'click' );
                expect( wrapper.vm.selectedLabel ).toBe( '' );
                expect( wrapper.vm.query ).toBe( '1' );
                expect( wrapper.vm.visible ).toBe( true );

                const inputComponent = wrapper.findComponent( JInput );

                await inputComponent.trigger( 'focus' );
                await inputComponent.trigger( 'keyup', {
                    key: '2',
                } );
                await wrapper.setData( { selectedLabel: '2' } );
                jest.runAllTimers();

                expect( wrapper.vm.query ).toBe( '2' );
                expect( wrapper.vm.selectedLabel ).toBe( '2' );

                await inputComponent.trigger( 'keyup', {
                    key: '3',
                } );
                await wrapper.setData( { selectedLabel: '23' } );
                jest.runAllTimers();


                expect( wrapper.vm.query ).toBe( '23' );
                expect( wrapper.vm.selectedLabel ).toBe( '23' );

                await wrapper.setData( { visible: false } );
                expect( wrapper.vm.query ).toBe( '1' );
                expect( wrapper.vm.selectedLabel ).toBe( '1' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );

    describe( 'allowCreate', () => {
        test( 'pass allowCreate', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                    allowCreate: true,
                },
            } );

            expect( wrapper.vm.selectedLabel ).toBe( '1' );
            expect( wrapper.vm.query ).toBe( '' );
            expect( wrapper.vm.showNewOption ).toBe( false );

            await wrapper.trigger( 'click' );

            expect( wrapper.vm.selectedLabel ).toBe( '' );
            expect( wrapper.vm.query ).toBe( '1' );
            expect( wrapper.vm.showNewOption ).toBe( true );

            const createOptionComponent = wrapper.findComponent( JOption );
            expect( createOptionComponent.vm.created ).toBe( true );
            expect( createOptionComponent.vm.value ).toBe( '1' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass allowCreate', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                },
            } );

            expect( wrapper.vm.showNewOption ).toBe( false );
            await wrapper.trigger( 'click' );
            expect( wrapper.vm.showNewOption ).toBe( false );
            expect( wrapper.vm.options.length ).toBe( 0 );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'remote and remoteMethod', () => {
        test( 'pass remote and remoteMethod', async () => {
            jest.useFakeTimers();
            const remoteFn = jest.fn();

            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                    remote: true,
                    remoteMethod: remoteFn,
                },
            } );

            expect( wrapper.vm.debounce ).toBe( 300 );


            await wrapper.trigger( 'click' );
            expect( wrapper.vm.query ).toBe( '' );
            expect( wrapper.vm.selectedLabel ).toBe( '' );


            const inputComponent = wrapper.findComponent( JInput );
            await inputComponent.trigger( 'keyup', {
                key: '2',
            } );
            await wrapper.setData( { selectedLabel: '2' } );
            jest.runAllTimers();
            expect( wrapper.vm.query ).toBe( '2' );
            expect( remoteFn.mock.calls[ 0 ][ 0 ] ).toBe( '2' );
            expect( remoteFn ).toHaveBeenCalledTimes( 1 );


            await wrapper.setData( { visible: false } );
            expect( wrapper.vm.query ).toBe( '1' );
            expect( wrapper.vm.selectedLabel ).toBe( '1' );


            await wrapper.trigger( 'click' );
            expect( wrapper.vm.query ).toBe( '' );
            expect( wrapper.vm.selectedLabel ).toBe( '' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass remote and remoteMethod', () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                },
            } );

            expect( wrapper.vm.debounce ).toBe( 0 );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'emptyText', () => {
        test( 'empty text element not show', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                    remote: true,
                },
            } );
            await wrapper.setData( { visible: true } );

            const emptyElement = wrapper.find( '.j_select_empty' );
            expect( emptyElement.exists() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no option', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                },
            } );
            await wrapper.setData( { visible: true } );

            const emptyElement = wrapper.find( '.j_select_empty' );
            expect( emptyElement.exists() ).toBe( true );
            expect( emptyElement.text() ).toBe( '无数据' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no match data', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                    filterable: true,
                },
            } );

            await wrapper.setData( { options: [ { value: 'test' } ] } );
            await wrapper.trigger( 'click' );
            const emptyElement = wrapper.find( '.j_select_empty' );
            expect( emptyElement.exists() ).toBe( true );
            expect( emptyElement.text() ).toBe( '无匹配数据' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'options length no equal 1', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                },
            } );

            await wrapper.setData( { options: [ { value: 'test' } ] } );
            await wrapper.trigger( 'click' );

            const emptyElement = wrapper.find( '.j_select_empty' );
            expect( emptyElement.exists() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'JOption', () => {
        describe( 'label', () => {
            test( 'pass label', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                    label='黄金'
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                        };
                    },
                };

                const wrapper = mount( Component );
                const optionComponent = wrapper.findComponent( JOption );

                expect( optionComponent.vm.currentLabel ).toBe( '黄金' );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'no pass label', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                        };
                    },
                };

                const wrapper = mount( Component );
                const optionComponent = wrapper.findComponent( JOption );
                expect( optionComponent.vm.currentLabel ).toBe( '1' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'size', () => {
            test( 'small size', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                    size="small"
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                        };
                    },
                };

                const optionComponent = mount( Component ).findComponent( JOption );

                expect( optionComponent.classes( 'j_option_menu_list_item' ) ).toBe( true );
                expect( optionComponent.classes( 'j_option_menu_list_item_small' ) ).toBe( true );

                expect( optionComponent ).toMatchSnapshot();
            } );

            test( 'large size', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                    size="large"
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                        };
                    },
                };

                const optionComponent = mount( Component ).findComponent( JOption );
                expect( optionComponent.classes( 'j_option_menu_list_item' ) ).toBe( true );
                expect( optionComponent.classes( 'j_option_menu_list_item_large' ) ).toBe( true );

                expect( optionComponent ).toMatchSnapshot();
            } );
        } );


        describe( 'itemSelected', () => {
            test( 'single choice', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '1',
                        };
                    },
                };

                const wrapper = mount( Component );
                const optionComponents = wrapper.findAllComponents( JOption );
                expect( optionComponents.at( 0 ).classes( 'j_option_menu_list_item_selected' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'multiple choice', () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [ '1', '2' ],
                        };
                    },
                };

                const wrapper = mount( Component );
                const optionComponents = wrapper.findAllComponents( JOption );
                expect( optionComponents.at( 0 ).classes( 'j_option_menu_list_item_selected' ) ).toBe( true );
                expect( optionComponents.at( 1 ).classes( 'j_option_menu_list_item_selected' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'mouseenter event', () => {
            test( 'mouseenter event', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '1',
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );
                const optionComponents = wrapper.findAllComponents( JOption );
                await optionComponents.at( 0 ).trigger( 'mouseenter' );
                expect( selectComponent.vm.hoverIndex ).toBe( 0 );
                await optionComponents.at( 1 ).trigger( 'mouseenter' );
                expect( selectComponent.vm.hoverIndex ).toBe( 1 );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'queryChange', () => {
            test( 'queryChange', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >1</j-option>
                                <j-option
                                    value="3"
                                    created
                                >1</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '1',
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponents = wrapper.findAllComponents( JOption );
                selectComponents.at( 0 ).vm.queryChange( '' );
                expect( selectComponents.at( 0 ).vm.visible ).toBe( true );
                selectComponents.at( 0 ).vm.queryChange( '1' );
                expect( selectComponents.at( 0 ).vm.visible ).toBe( true );
                selectComponents.at( 1 ).vm.queryChange( '1' );
                expect( selectComponents.at( 1 ).vm.visible ).toBe( false );
                selectComponents.at( 1 ).vm.queryChange( '2' );
                expect( selectComponents.at( 1 ).vm.visible ).toBe( true );
                selectComponents.at( 2 ).vm.queryChange( '4' );
                expect( selectComponents.at( 2 ).vm.visible ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'destroy', () => {
            test( 'destroy', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                            >
                                {
                                    this.optData && this.optData.map( ( ele ) => {
                                        return (
                                            <j-option
                                                value={ele}
                                                key={ele.key}
                                            >{ele}</j-option>
                                        );
                                    } )
                                }
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: '',
                            optData: [
                                {
                                    value: '1',
                                    key: 1,
                                },
                                {
                                    value: '2',
                                    key: 2,
                                },
                            ],
                        };
                    },
                    methods: {
                        setOption() {
                            this.optData = [ { value: '3', key: 3 } ];
                        },
                    },
                };

                const elm = document.createElement( 'div' );
                document.body.appendChild( elm );

                const instance = new Vue( Component ).$mount( elm );

                instance.setOption();

                await instance.$nextTick().then( ()=>{
                    const opt = instance.$children[ 0 ].options;
                    expect( opt.length ).toBe( 1 );
                } );

                expect( Component ).toMatchSnapshot();
            } );
        } );
    } );

    describe( 'extra test', () => {
        test( 'optionMenu width', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '1',
                },
            } );

            await wrapper.setData( { inputWidth: 100 } );

            const optionMenuComponent = wrapper.findComponent( JOptionMenu );
            expect( optionMenuComponent.vm.dropdownWidth ).toBe( '0px' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'select JInput vModel', async () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '',
                },
            } );

            const inputComponent = wrapper.findComponent( JInput );
            const inputElement = inputComponent.find( 'input' );

            inputElement.element.value = '2';
            await inputElement.trigger( 'input' );

            expect( wrapper.vm.selectedLabel ).toBe( '2' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'select handleClose', () => {
            const wrapper = mount( JSelect, {
                propsData: {
                    value: '',
                },
            } );

            wrapper.vm.handleClose();
            expect( wrapper.vm.visible ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'hoverIndex', async () => {
            jest.useFakeTimers();

            const Component = {
                render() {
                    return (
                        <j-select
                            vModel={this.value}
                            multiple
                            filterable
                        >
                            <j-option
                                value="1"
                            >1</j-option>
                            <j-option
                                value="2"
                            >2</j-option>
                            <j-option
                                value="3"
                            >3</j-option>
                        </j-select>
                    );
                },
                components: {
                    JSelect,
                    JOption,
                },
                data() {
                    return {
                        value: [],
                    };
                },
            };

            const wrapper = mount( Component );

            const optionComponents = wrapper.findAllComponents( JOption );
            const queryElement = wrapper.find( '.j_select_tags_input' );

            await wrapper.trigger( 'click' );

            await optionComponents.at( 0 ).trigger( 'mouseenter' );
            expect( optionComponents.at( 0 ).vm.hover ).toBe( true );

            await queryElement.trigger( 'input' );
            jest.runAllTimers();
            expect( optionComponents.at( 0 ).vm.hover ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'multiple choice', () => {
        describe( 'create', () => {
            test( 'create and value is string', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: '1',
                        multiple: true,
                    },
                } );

                expect( wrapper.vm.selected ).toEqual( [] );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'create and have default value', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [ '1', '2' ],
                        };
                    },
                };

                const wrapper = mount( Component );

                const selectComponent = wrapper.findComponent( JSelect );
                const selectElement = wrapper.find( '.j_select' );
                expect( selectElement.exists() ).toBe( true );
                expect( selectComponent.exists() ).toBe( true );

                const inputComponent = wrapper.findComponent( JInput );
                expect( inputComponent.exists() ).toBe( true );

                await inputComponent.trigger( 'mouseenter' );
                expect( selectComponent.vm.inputHovering ).toBe( true );


                await inputComponent.trigger( 'mouseleave' );
                expect( selectComponent.vm.inputHovering ).toBe( false );

                const OptionMenuComponent = wrapper.findComponent( JOptionMenu );
                expect( OptionMenuComponent.exists() ).toBe( true );

                const OptionMenuListElement = wrapper.find( '.j_option_menu_list' );
                expect( OptionMenuListElement.exists() ).toBe( true );

                const selectTagsElement = wrapper.find( '.j_select_tags' );
                expect( selectTagsElement.exists() ).toBe( true );

                const tagComponents = wrapper.findAllComponents( JTag );
                expect( tagComponents.at( 0 ).exists() ).toBe( true );
                expect( tagComponents.at( 1 ).exists() ).toBe( true );
                expect( selectComponent.vm.selected.length ).toBe( 2 );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'create and no have default value', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [],
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectTagsElement = wrapper.find( '.j_select_tags' );
                expect( selectTagsElement.exists() ).toBe( true );
                expect( selectTagsElement.element ).toBeEmptyDOMElement();

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'size', ()=>{
            test( 'small size', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        size: 'small',
                        filterable: true,
                        multiple: true,
                        value: [],
                    },
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                expect( queryElement.classes( 'j_select_tags_input_small' ) ).toBe( true );

                expect( queryElement ).toMatchSnapshot();
            } );


            test( 'large size', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        size: 'large',
                        filterable: true,
                        multiple: true,
                        value: [],
                    },
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                expect( queryElement.classes( 'j_select_tags_input_large' ) ).toBe( true );

                expect( queryElement ).toMatchSnapshot();
            } );
        } );

        describe( 'value', () => {
            test( 'pass  value', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [ '1', '2' ],
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );
                expect( selectComponent.vm.options.length ).toBe( 3 );
                expect( selectComponent.vm.selected.length ).toBe( 2 );

                await wrapper.setData( { value: [] } );
                expect( selectComponent.vm.options.length ).toBe( 3 );
                expect( selectComponent.vm.selected.length ).toBe( 0 );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'clearable', () => {
            test( 'pass clearable', async () => {
                const onInput = jest.fn();
                const onChange = jest.fn();
                const onClear = jest.fn();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [ '1' ],
                        clearable: true,
                        multiple: true,
                    },
                    listeners: {
                        input: onInput,
                        change: onChange,
                        clear: onClear,
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.exists() ).toBe( true );
                expect( closeElement.classes( 'j-icon_tag_close' ) ).toBe( true );

                await closeElement.trigger( 'click' );
                expect( onInput ).toHaveBeenCalledTimes( 1 );
                expect( onInput.mock.calls[ 0 ][ 0 ] ).toEqual( [] );
                expect( onChange ).toHaveBeenCalledTimes( 1 );
                expect( onChange.mock.calls[ 0 ][ 0 ] ).toEqual( [] );
                expect( onClear ).toHaveBeenCalledTimes( 1 );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'pass clearable and showClose is false', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [ '1' ],
                        clearable: true,
                        disabled: true,
                        multiple: true,
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.exists() ).toBe( true );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_caret' ) ).toBe( true );

                await wrapper.setData( { visible: true } );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_reverse' ) ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'no pass clearabel', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [ '1' ],
                        multiple: true,
                    },
                } );
                await wrapper.setData( { inputHovering: true } );

                const closeElement = wrapper.find( '.j_input_icon_gesture' );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );

                await wrapper.setData( { visible: true } );
                expect( closeElement.classes( 'j-icon_down_arrow' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_reverse' ) ).toBe( true );
                expect( closeElement.classes( 'j_select_caret' ) ).toBe( true );

                await closeElement.trigger( 'click' );
                expect( wrapper.vm.value ).toEqual( [ '1' ] );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );


        describe( 'placeholder', () => {
            test( 'pass placeholder', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                                placeholder='请选择选项'
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [],
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );

                await wrapper.setData( { value: [ '1' ] } );
                expect( selectComponent.vm.currentPlaceholder ).toBe( '' );

                await wrapper.setData( { value: [] } );
                expect( selectComponent.vm.currentPlaceholder ).toBe( '请选择选项' );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'no pass placeholder', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [],
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );

                await wrapper.setData( { value: [ '1' ] } );
                expect( selectComponent.vm.currentPlaceholder ).toBe( '' );

                await wrapper.setData( { value: [] } );
                expect( selectComponent.vm.currentPlaceholder ).toBe( '请选择' );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'placeholder change', async () => {
                const Component = {
                    render() {
                        return (
                            <j-select
                                vModel={this.value}
                                multiple
                                placeholder={this.placeholder}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                                <j-option
                                    value="3"
                                >3</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [],
                            placeholder: '请选择选项',
                        };
                    },
                    methods: {
                        changePlaceholder() {
                            this.placeholder = '请准确选择选项';
                        },
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );
                wrapper.vm.changePlaceholder();

                await wrapper.vm.$nextTick();
                expect( selectComponent.vm.currentPlaceholder ).toBe( '请准确选择选项' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'filterable', () => {
            test( 'pass filterable', () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [],
                        multiple: true,
                        filterable: true,
                    },
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                expect( queryElement.exists() ).toBe( true );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'queryElement input event', async () => {
                jest.useFakeTimers();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [],
                        multiple: true,
                        filterable: true,
                    },
                } );

                await wrapper.trigger( 'click' );
                expect( wrapper.vm.query ).toBe( '' );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                await queryElement.trigger( 'input' );
                queryElement.element.value = '1';

                jest.runAllTimers();
                expect( wrapper.vm.hoverIndex ).toBe( -1 );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'queryElement focus event', async () => {
                const onFocus = jest.fn();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [],
                        multiple: true,
                        filterable: true,
                    },
                    listeners: {
                        focus: onFocus,
                    },
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                await queryElement.trigger( 'focus' );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                expect( wrapper ).toMatchSnapshot();
            } );


            test( 'queryElement blur event', async () => {
                jest.useFakeTimers();
                const onBlur = jest.fn();

                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [],
                        multiple: true,
                        filterable: true,
                    },
                    listeners: {
                        blur: onBlur,
                    },
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                await queryElement.trigger( 'blur' );

                jest.runAllTimers();

                expect( onBlur ).toHaveBeenCalledTimes( 1 );
                expect( wrapper.vm.softFocus ).toBe( false );

                expect( wrapper ).toMatchSnapshot();
            } );

            test( 'queryElement keyup event', async () => {
                const wrapper = mount( JSelect, {
                    propsData: {
                        value: [],
                        multiple: true,
                        filterable: true,
                    },
                    attachTo: document.body,
                } );

                const queryElement = wrapper.find( '.j_select_tags_input' );
                await queryElement.trigger( 'input' );
                queryElement.element.value = '3';

                await queryElement.trigger( 'keyup', {
                    key: '3',
                } );

                expect( wrapper.vm.currentPlaceholder ).toBe( '' );


                await queryElement.trigger( 'input' );
                queryElement.element.value = '';
                await queryElement.trigger( 'keyup', {
                    key: '',
                } );
                expect( wrapper.vm.currentPlaceholder ).toBe( '请选择' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'option select event', () => {
            test( 'option select event', async () => {
                jest.useFakeTimers();

                const onInput = jest.fn();
                const onChange = jest.fn();
                const onFocus = jest.fn();
                const onBlur = jest.fn();
                const onVisibleChange = jest.fn();

                const Component = {
                    render() {
                        return (
                            <j-select
                                multiple
                                filterable
                                vModel={this.value}
                                vOn:Input={onInput}
                                vOn:Change={onChange}
                                vOn:Focus={onFocus}
                                vOn:Blur={onBlur}
                                vOn:Visible-change={onVisibleChange}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [ '1' ],
                        };
                    },
                };

                const wrapper = mount( Component );
                const selectComponent = wrapper.findComponent( JSelect );
                const optionComponents = wrapper.findAllComponents( JOption );

                expect( optionComponents.length ).toBe( 2 );

                await selectComponent.trigger( 'click' );
                expect( onVisibleChange ).toHaveBeenCalledTimes( 1 );
                expect( onVisibleChange.mock.calls[ 0 ][ 0 ] ).toEqual( true );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                await optionComponents.at( 1 ).trigger( 'click' );
                jest.runAllTimers();


                expect( onBlur ).toHaveBeenCalledTimes( 0 );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                expect( onInput ).toHaveBeenCalledTimes( 1 );
                expect( onChange ).toHaveBeenCalledTimes( 1 );
                expect( onInput.mock.calls[ 0 ][ 0 ] ).toEqual( [ '1', '2' ] );
                expect( onChange.mock.calls[ 0 ][ 0 ] ).toEqual( [ '1', '2' ] );

                expect( selectComponent.vm.softFocus ).toBe( false );


                await optionComponents.at( 1 ).trigger( 'click' );
                jest.runAllTimers();


                expect( onBlur ).toHaveBeenCalledTimes( 0 );
                expect( onFocus ).toHaveBeenCalledTimes( 1 );

                expect( onInput ).toHaveBeenCalledTimes( 2 );
                expect( onChange ).toHaveBeenCalledTimes( 2 );
                expect( onInput.mock.calls[ 1 ][ 0 ] ).toEqual( [ '1' ] );
                expect( onChange.mock.calls[ 1 ][ 0 ] ).toEqual( [ '1' ] );

                expect( selectComponent.vm.softFocus ).toBe( false );
                expect( selectComponent.vm.query ).toBe( '' );

                await selectComponent.setData( { visible: false } );
                jest.runAllTimers();

                expect( optionComponents.at( 0 ).vm.hover ).toBe( true );
                expect( optionComponents.at( 1 ).vm.hover ).toBe( false );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );

        describe( 'delete tag event', () => {
            test( 'delete tag event', async ()=>{
                const onInput = jest.fn();
                const onChange = jest.fn();
                const onRemoveTag = jest.fn();

                const Component = {
                    render() {
                        return (
                            <j-select
                                multiple
                                vModel={this.value}
                                vOn:Input={onInput}
                                vOn:Change={onChange}
                                vOn:Remove-tag={onRemoveTag}
                            >
                                <j-option
                                    value="1"
                                >1</j-option>
                                <j-option
                                    value="2"
                                >2</j-option>
                            </j-select>
                        );
                    },
                    components: {
                        JSelect,
                        JOption,
                    },
                    data() {
                        return {
                            value: [ '1' ],
                        };
                    },
                };

                const wrapper = mount( Component );
                await wrapper.vm.$nextTick();


                const tagOne = wrapper.findAllComponents( JTag ).at( 0 );
                const closeElement = tagOne.find( '.j-icon_tag_close' );
                await closeElement.trigger( 'click' );

                expect( onInput ).toHaveBeenCalledTimes( 1 );
                expect( onChange ).toHaveBeenCalledTimes( 1 );
                expect( onRemoveTag ).toHaveBeenCalledTimes( 1 );
                expect( onInput.mock.calls[ 0 ][ 0 ] ).toEqual( [] );
                expect( onChange.mock.calls[ 0 ][ 0 ] ).toEqual( [] );
                expect( onRemoveTag.mock.calls[ 0 ][ 0 ] ).toEqual( '1' );

                expect( wrapper ).toMatchSnapshot();
            } );
        } );
    } );
} );
