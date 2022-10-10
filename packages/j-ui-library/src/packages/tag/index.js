import JTag from './src/main';

JTag.install = function( Vue ) {
    Vue.component( JTag.name, JTag );
};

export default JTag;
