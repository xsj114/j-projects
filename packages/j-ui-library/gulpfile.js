const { series } = require( 'gulp' );

function defaultTask() {
    series()
}

exports.default = defaultTask;
