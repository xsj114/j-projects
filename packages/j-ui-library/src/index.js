import JAutocomplete from './packages/autocomplete/index.js';
import JBubble from './packages/bubble/index.js';
import JButton from './packages/button/index.js';
import JCard from './packages/card/index.js';
import JInput from './packages/input/index.js';
import JTag from './packages/tag/index.js';
import JSelect from './packages/select/index.js';
import JOption from './packages/option/index.js';


const components = [
    JAutocomplete,
    JBubble,
    JButton,
    JCard,
    JInput,
    JTag,
    JSelect,
    JOption,
];

const install = function( Vue, opts = {} ) {
    components.forEach( ( component ) => {
        Vue.component( component.name, component );
    } );
    Vue.prototype.$JUI = {
        size: opts.size || '',
    };
};


export default {
    install,
    JAutocomplete,
    JBubble,
    JButton,
    JCard,
    JInput,
    JTag,
    JSelect,
    JOption,
};


/*
 * 如何封装一个组件
 * 我要使用者在什么场景下，如何使用这个组件，解决什么问题？
 * 1. 使用者如何引入这个组件。
 * 2. 组件应该支持多大程度的灵活性？设计哪些参数？
 * 3. 组件应该包含哪些功能，不包含哪些功能？
 * 4. 哪些功能应该被封装在组件内部，哪些可能需要外面知道？
 * 5. 除了常规的参数，还需要对外暴露什么？Selectors？Events？Callback？
 * 6. 做为UI组件，是否需要做响应式的处理？
 *
 * 区分动态和静态的部分
 * 确定组件内部应该做什么，不应该做什么
 * */
