import { mount } from '@vue/test-utils';
import JAutocomplete from '../index';
import JAutocompleteSuggest from '../src/autocomplete-suggest';
import JInput from '@packages/input';
import { debounce } from '@utils/utils';


describe( 'JAutocomplete', () => {
    describe( 'create', () => {
        test( 'create', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );
            expect( wrapper.findComponent( JAutocompleteSuggest ).exists() ).toBe( true );
            expect( wrapper.findComponent( JInput ).exists() ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'placement', () => {
        test( 'pass placement is top', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    placement: 'top',
                    fetchSuggest: jest.fn(),
                },
            } );

            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.placement ).toBe( 'top' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'no pass placement', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );
            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.placement ).toBe( 'bottom' );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'visibleArrow', () => {
        test( 'pass visibleArrow is false', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    visibleArrow: false,
                    fetchSuggest: jest.fn(),
                },
            } );
            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.visibleArrow ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'no pass visibleArrow', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );

            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.visibleArrow ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'appendToBody', () => {
        test( 'pass appendToBody is false', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    appendToBody: false,
                    fetchSuggest: jest.fn(),
                },
            } );
            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.appendToBody ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass appendToBody', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );
            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.appendToBody ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'disabled', () => {
        test( 'pass disabled is false', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    disabled: true,
                    fetchSuggest: jest.fn(),
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.disabled ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass appendToBody', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.disabled ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'readonly', () => {
        test( 'pass readonly is false', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    readonly: true,
                    fetchSuggest: jest.fn(),
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.readonly ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass readonly', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.readonly ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'round', () => {
        test( 'pass round is false', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    round: true,
                    fetchSuggest: jest.fn(),
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.round ).toBe( true );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass round', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.round ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'value', () => {
        test( 'pass value is test', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    value: 'test',
                    fetchSuggest: jest.fn(),
                },
            } );


            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.value ).toBe( 'test' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'no pass value', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );


            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.value ).toBeUndefined();

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'valueKey', () => {
        test( 'pass valueKey is text', async () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    valueKey: 'text',
                    fetchSuggest: jest.fn(),
                },
            } );

            await wrapper.setData( {
                suggestList: [
                    {
                        text: 'text',
                        value: 'value',
                    },
                ],
                activated: true,
            } );


            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );

            const Component = {
                render() {
                    return (
                        <div>{JAutocompleteSuggestWrapper.vm.$scopedSlots.default()}</div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<li class="j_autocomplete_suggest_list_item">text</li>' );

            expect( wrapper ).toMatchSnapshot();
        } );

        test( 'no pass valueKey', async () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );

            await wrapper.setData( {
                suggestList: [
                    {
                        text: 'text',
                        value: 'value',
                    },
                ],
                activated: true,
            } );

            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );

            const Component = {
                render() {
                    return (
                        <div>{JAutocompleteSuggestWrapper.vm.$scopedSlots.default()}</div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<li class="j_autocomplete_suggest_list_item">value</li>' );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'debounce', () => {
        test( 'pass debounce 100', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    debounce: 100,
                    fetchSuggest: jest.fn(),
                },
            } );

            expect( wrapper.vm.debounce ).toBe( 100 );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'no pass debounce', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
            } );
            expect( wrapper.vm.debounce ).toBe( 300 );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'fetchSuggest', () => {
        test( 'pass fetchSuggest and value is array', () => {
            const mockFn = jest.fn( ( queryString, callback ) => {
                callback( [ { value: 'value' } ] );
            } );

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: mockFn,
                },
            } );

            wrapper.vm.getData( 'test' );

            expect( mockFn ).toHaveBeenCalledTimes( 1 );
            expect( wrapper.vm.suggestList ).toEqual( [ { value: 'value' } ] );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'pass fetchSuggest and value not is array', () => {
            const mockFn = jest.fn( ( queryString, callback ) => {
                callback( 'test' );
            } );

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: mockFn,
                },
            } );

            wrapper.vm.getData( 'test' );

            expect( wrapper.vm.suggestList ).toEqual( [] );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'size', () => {
        test( 'small size', async () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                    size: 'small',
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.size ).toBe( 'small' );


            await wrapper.setData( {
                suggestList: [
                    {
                        text: 'text',
                        value: 'value',
                    },
                ],
            } );


            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );

            const Component = {
                render() {
                    return (
                        <div>{JAutocompleteSuggestWrapper.vm.$scopedSlots.default()}</div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toHaveClass( 'j_autocomplete_suggest_list_item_small' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'large size', async () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                    size: 'large',
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            expect( JInputWrapper.vm.size ).toBe( 'large' );


            await wrapper.setData( {
                suggestList: [
                    {
                        text: 'text',
                        value: 'value',
                    },
                ],
            } );


            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );

            const Component = {
                render() {
                    return (
                        <div>{JAutocompleteSuggestWrapper.vm.$scopedSlots.default()}</div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toHaveClass( 'j_autocomplete_suggest_list_item_large' );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'input event', () => {
        test( 'input', async () => {
            const inputFn = jest.fn();

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                listeners: {
                    input: inputFn,
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            const inputWrapper = JInputWrapper.find( 'input' );
            inputWrapper.element.value = 'test';
            await inputWrapper.trigger( 'input' );

            expect( inputFn ).toHaveBeenCalledTimes( 1 );
            expect( inputFn.mock.calls[ 0 ][ 0 ] ).toBe( 'test' );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'focus event', () => {
        test( 'focus', async () => {
            const focusFn = jest.fn();

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                listeners: {
                    focus: focusFn,
                },
            } );


            const JInputWrapper = wrapper.findComponent( JInput );
            const inputWrapper = JInputWrapper.find( 'input' );
            await inputWrapper.trigger( 'focus' );

            expect( wrapper.vm.activated ).toBe( true );
            expect( focusFn ).toHaveBeenCalledTimes( 1 );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );

    describe( 'blur event', () => {
        test( 'blur', async () => {
            const blurFn = jest.fn();

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                listeners: {
                    blur: blurFn,
                },
            } );

            const JInputWrapper = wrapper.findComponent( JInput );
            const inputWrapper = JInputWrapper.find( 'input' );
            await inputWrapper.trigger( 'blur' );

            expect( blurFn ).toHaveBeenCalledTimes( 1 );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'select event', () => {
        test( 'select', async () => {
            const inputFn = jest.fn();
            const selectFn = jest.fn();

            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                listeners: {
                    input: inputFn,
                    select: selectFn,
                },
            } );
            await wrapper.setData( {
                suggestList: [
                    { value: 'value' },
                ],
            } );

            const suggestElement = wrapper.find( '.j_autocomplete_suggest_list_item' );
            await suggestElement.trigger( 'click' );

            expect( inputFn ).toHaveBeenCalledTimes( 1 );
            expect( inputFn.mock.calls[ 0 ][ 0 ] ).toBe( 'value' );

            expect( selectFn ).toHaveBeenCalledTimes( 1 );
            expect( selectFn.mock.calls[ 0 ][ 0 ] ).toEqual( {
                value: 'value',
            } );

            expect( wrapper.vm.suggestList ).toEqual( [] );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'slot', () => {
        test( 'prepend', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                scopedSlots: {
                    prepend: '<i>Http://</i>',
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );

            const Component = {
                render() {
                    return (
                        <div>
                            {
                                JInputWrapper.vm.$scopedSlots.prepend()
                            }
                        </div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<i>Http://</i>' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'append', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                scopedSlots: {
                    append: '<i>.COM</i>',
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );

            const Component = {
                render() {
                    return (
                        <div>
                            {
                                JInputWrapper.vm.$scopedSlots.append()
                            }
                        </div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<i>.COM</i>' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'prefix', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                scopedSlots: {
                    prefix: '<i>prefix</i>',
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );

            const Component = {
                render() {
                    return (
                        <div>
                            {
                                JInputWrapper.vm.$scopedSlots.prefix()
                            }
                        </div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<i>prefix</i>' );

            expect( wrapper ).toMatchSnapshot();
        } );


        test( 'suffix', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                scopedSlots: {
                    suffix: '<i>suffix</i>',
                },
            } );
            const JInputWrapper = wrapper.findComponent( JInput );

            const Component = {
                render() {
                    return (
                        <div>
                            {
                                JInputWrapper.vm.$scopedSlots.suffix()
                            }
                        </div>
                    );
                },
            };

            const ComponentWrapper = mount( Component );
            expect( ComponentWrapper.element.firstElementChild ).toContainHTML( '<i>suffix</i>' );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'JAutocomplete method', () => {
        test( 'close', () => {
            const fetchSuggestFn = jest.fn();
            const Component = {
                render() {
                    return (
                        <j-autocomplete ref="autocomplete" fetchSuggest={fetchSuggestFn}></j-autocomplete>
                    );
                },
                components: {
                    JAutocomplete,
                },
            };

            const ComponentWrapper = mount( Component );
            ComponentWrapper.vm.$refs.autocomplete.close();

            const wrapper = ComponentWrapper.findComponent( JAutocomplete );
            expect( wrapper.vm.activated ).toBe( false );
            expect( wrapper.vm.suggestVisible ).toBe( false );

            const JAutocompleteSuggestWrapper = wrapper.findComponent( JAutocompleteSuggest );
            expect( JAutocompleteSuggestWrapper.vm.showPopper ).toBe( false );
            expect( JAutocompleteSuggestWrapper.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );


    describe( 'destroyed', () => {
        test( 'destroyed', () => {
            const wrapper = mount( JAutocomplete, {
                propsData: {
                    fetchSuggest: jest.fn(),
                },
                attachTo: document.body,
            } );

            expect( document.body ).not.toBeEmptyDOMElement();
            expect( wrapper ).toMatchSnapshot();

            wrapper.destroy();
            expect( document.body ).not.toContainElement( wrapper.element );
        } );
    } );


    describe( 'user operation', () => {
        test( 'user input value out then click on the document then click input', async () => {
            jest.useFakeTimers();

            const fetchSuggestFn = jest.fn( ( queryString, callback ) => {
                callback( [ { value: 'value' } ] );
            } );

            const Component = {
                render() {
                    return (
                        <div class="box">
                            <j-autocomplete fetchSuggest={fetchSuggestFn}></j-autocomplete>
                        </div>
                    );
                },
                components: {
                    JAutocomplete,
                },
            };


            const wrapper = mount( Component, {
                attachTo: document.body,
            } );

            const JAutocompleteWrapper = wrapper.findComponent( JAutocomplete );

            const JInputWrapper = JAutocompleteWrapper.findComponent( JInput );
            const inputWrapper = JInputWrapper.find( 'input' );

            const JAutocompleteSuggestWrapper = JAutocompleteWrapper.findComponent( JAutocompleteSuggest );

            await inputWrapper.trigger( 'focus' );
            inputWrapper.element.value = 'test';
            await inputWrapper.trigger( 'input' );

            debounce( 300, jest.fn() );
            jest.runAllTimers();

            expect( JAutocompleteWrapper.vm.suggestList ).toEqual( [ { value: 'value' } ] );

            await JAutocompleteWrapper.vm.$nextTick();
            expect( JAutocompleteSuggestWrapper.isVisible() ).toBe( true );

            const boxWrapper = wrapper.find( '.box' );
            await boxWrapper.trigger( 'mousedown' );
            await boxWrapper.trigger( 'mouseup' );


            await JAutocompleteWrapper.vm.$nextTick();
            expect( JAutocompleteSuggestWrapper.isVisible() ).toBe( false );

            await inputWrapper.trigger( 'focus' );

            expect( JAutocompleteSuggestWrapper.isVisible() ).toBe( true );


            const suggestElement = wrapper.find( '.j_autocomplete_suggest_list_item' );
            await suggestElement.trigger( 'click' );
            expect( JAutocompleteWrapper.vm.suggestList ).toEqual( [] );
            expect( JAutocompleteSuggestWrapper.isVisible() ).toBe( false );

            expect( wrapper ).toMatchSnapshot();
        } );
    } );
} );
