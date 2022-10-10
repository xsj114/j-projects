import JButton from './src/main';

JButton.install = function( Vue ) {
    Vue.component( JButton.name, JButton );
};

export default JButton;
