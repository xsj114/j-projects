
# webpack


## webpack原理


```
    st=>start: 找到入口文件
    op1=>operation: 分析文件中的依赖
    op2=>operation: 将文件中的依赖依次存到队列中，转换队列生成一个依赖图
    op3=>operation: 根据依赖图，生成编译后的代码
    
    st->op1->op2->op3
```



```js
/* index.js */
import message from './message.js'
console.log(message)

/* message.js */
import {word} from './word.js'
const message = `say ${word}`
export default message

/* word.js */
export const word = 'hello'
```


```js
const fs = require( 'fs' )
const path = require( 'path' )
const parser = require( '@babel/parser' )
const traverse = require( '@babel/traverse' ).default
const babel = require( '@babel/core' )


const moduleAnalyser = ( filename ) => {
    const content = fs.readFileSync( filename, 'utf-8' )
    // 利用@babel/parser,将源代码转换成抽象语法树
    const ast = parser.parse( content, {
        sourceType: 'module'
    } )
    // 分析抽象语法树的import声明
    const dependencies = {}
    traverse( ast, {
        ImportDeclaration ( { node } ) {
            const dirname = path.dirname( filename )
            const newFile = path.join( dirname, node.source.value )
            dependencies[ node.source.value ] = newFile
        }
    })
    // 因为代码是ES Module的代码，浏览器不能直接运行，所以将源代码进行一次编译
    const { code } = babel.transformFromAst( ast, null, {
        presets: [ "@babel/preset-env" ]
    } )
    return {
        filename,
        dependencies,
        code
    }
}

const makeDependenciesGraph = ( entry ) => {
    const entryModule = moduleAnalyser( entry )
    const graphArray = [ entryModule ]
    for ( let i = 0; i < graphArray.length; i++ ) {
        const item = graphArray[ i ]
        const { dependencies } = item
        if ( dependencies ) {
            for ( let j in dependencies ) {
                graphArray.push( moduleAnalyser( dependencies[ j ] ) )
            }
        }
    }
    const graph = {}
    graphArray.forEach(item => {
        graph[ item.filename ] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })

    return graph
}

const generateCode = ( entry ) => {
    const graph = JSON.stringify( makeDependenciesGraph( entry ) )
    return `
        ( function( graph ) {
            function require( module ) {
                // 因为eval执行中的代码是相对路径，此函数将它转为绝对路径
                function localRequire( relativePath ) {
                    return require( graph[ module ].dependencies[ relativePath ] );
                }
                var exports = {};
                // 因为每个模块导出怕污染全局环境，所以都是一个闭包
                ( function( require, exports, code ) {
                    eval( code )
                } )( localRequire, exports, graph[module].code );
                return exports
            };
            require( '${entry}' );
        } )( ${graph} );
    `
}

const code = generateCode( './src/index.js' )
console.log( code )
```

::: tip
源代码经过编译后，有 `require` 方法和 `exports`对象，这两个在浏览器中都未实现，因此需要我们手写
:::


## webpack性能优化

跟上技术的迭代（`Node`,`Npm`,`Yarn`）<br/>
在尽可能少的模块上应用`Loader`
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}
```
`Plugin`尽可能精简并确保可靠<br/>
`resolve`参数合理配置<br/>
```js
/*
    下面配置的extensions和mainFiles属性都要合理配置，webpack会搜索相应文件，如果滥用，会影响webpack打包速度
*/
module.exports = {
    resolve: {
        // 此配置的意思是，当我去引入一个其他目录下的模块的时候，我会先到这个目录下去找.js结尾的文件，然后在找以.jsx结尾的文件
        extensions: ['.js', '.jsx'],
        // 此配置的意思是，当我去引入一个目录下的内容的时候，我会先去尝试引入以index开头的这个文件，在去尝试引入以child开头的这个文件
        mainFiles: ['index', 'child'],
        alias: {
            child: path.resolve(__dirname, '../src/child')
        }
    }
}
```
使用`DllPlugin`提高打包速度
```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
}
```
使用`noParse`提高打包速度
```js
module.exports = {
    module: {
        noParse: /lodash/
    }
}
```
::: tip
`noParse`的意思是直接通知`webpack`哪些库不去进行解析
:::
控制包文件大小<br/>
合理使用`sourceMap`
