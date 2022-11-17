const { 
    series,
    parallel,
    src,
    dest
} = require( 'gulp' );
let stylus = require('gulp-stylus');
let clean = require('gulp-clean');

const compileStylus = () => {
    return src( [ 'src/packages/theme/*.styl' ] )
    .pipe( stylus() )
    .pipe( dest( 'lib/theme' ))
}

const compileFonts = () => {
    return src( [ 'src/packages/theme/fonts/*' ] ).pipe( dest( 'lib/theme/fonts' ) )
}


const cleanDir = async () => {
    return src( 'lib/theme/*' ).pipe( clean() )
}

exports.default = series( cleanDir, parallel( compileStylus, compileFonts ) )
