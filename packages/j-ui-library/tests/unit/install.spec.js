import Vue from 'vue';
import JInput from '@packages/input';
import JAutocomplete from '@packages/autocomplete';
import JBubble from '@packages/bubble';
import JButton from '@packages/button';
import JCard from '@packages/card';
import JTag from '@packages/tag';
import JSelect from '@packages/select';
import JOption from '@packages/option';

describe( 'install', () => {
    test( 'input', () => {
        Vue.component = jest.fn();
        JInput.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'autocomplete', () => {
        Vue.component = jest.fn();
        JAutocomplete.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'bubble', () => {
        Vue.component = jest.fn();
        JBubble.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'button', () => {
        Vue.component = jest.fn();
        JButton.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'card', () => {
        Vue.component = jest.fn();
        JCard.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'tag', () => {
        Vue.component = jest.fn();
        JTag.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'select', () => {
        Vue.component = jest.fn();
        JSelect.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'option', () => {
        Vue.component = jest.fn();
        JOption.install( Vue );
        expect( Vue.component ).toHaveBeenCalledTimes( 1 );
    } );
} );
