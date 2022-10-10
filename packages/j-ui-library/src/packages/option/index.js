import JOption from '../select/src/option';


JOption.install = function( Vue ) {
    Vue.component( JOption.name, JOption );
};


export default JOption;
