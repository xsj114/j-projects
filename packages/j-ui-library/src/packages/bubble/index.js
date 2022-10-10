import JBubble from './src/main';


JBubble.install = function( Vue ) {
    Vue.component( JBubble.name, JBubble );
};

export default JBubble;
