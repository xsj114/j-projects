const Koa = require( 'koa' );
const app = new Koa();
const serve = require( 'koa-static' );

app.use( serve( './views/' ) );
app.listen( 8888, ()=>{
    console.log( '服务启动在8888端口' );
} )
