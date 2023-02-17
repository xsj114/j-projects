---
title: webpack
titleTemplate: 面试总结
outline: 'deep'
---

[toc]
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


## source-map

`source-map`解决的是当我们打包生成的代码出错的时候，如果不用`source-map`,我们只能知道打包出来的代码第几行出错了，但是我们并不知道它对应的源代码是哪里出错了，所以我们需要使用这个`source-map`,帮我们做一个源代码和目标生成代码之间的一个映射


| 配置 | 解释|
| ---- | ---- |
| source-map | 会生成.map文件 |
| inline-source-map | map文件里面的内容会变成base64字符串直接写在bundle里面 |
| cheap-source-map | 只提示行号,不会提示列号,且只针对业务代码 |
| cheap-module-source-map | 只提示行号,不会提示列号,除包含业务代码还包含第三方的代码,比如loader |
| eval | 在bundle里生成eval函数 |



:::details 原理
source-map会生成.map文件，这个文件是个对象<br/>
{<br/>
    version : 3, // Source map的版本<br/>
    file: "out.js", // 转换后的文件名<br/>
    sourceRoot : "", // 转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空<br/>
    sources: ["foo.js", "bar.js"], // 转换前的文件。该项是一个数组，表示可能存在多个文件合并<br/>
    names: ["src", "maps", "are", "fun"], // 转换前的所有变量名和属性名<br/>
    mappings: "AAgBC,SAAQ,CAAEA" // 记录位置信息的字符串<br/>
}<br/>
mappings属性是一个很长的字符串，它分成三层<br/>
第一层是行对应,以分号表示，每个分号对应转换后源码的一行<br/>
第二层是位置对应,以逗号表示，每个逗号对应转换后源码的一个位置<br/>
第三层是位置转换，以VLQ编码表示，代表该位置对应的转换前的源码位置<br/>
比如mappings:"AAAAA,BBBBB;CCCCC"<br/>
表示转换后的源码分成两行，第一行有两个位置，第二行有一个位置<br/>
每个位置使用五位，表示五个字段<br/>
第一位表示这个位置在（转换后的代码的）的第几列<br/>
第二位表示这个位置属于sources属性中的哪一个文件<br/>
第三位，表示这个位置属于转换前代码的第几行<br/>
第四位，表示这个位置属于转换前代码的第几列<br/>
第五位，表示这个位置属于names属性中的哪一个变量
:::



## webpack如何实现动态加载


把模块独立导出一个`js`文件,使用这个模块的时候，`webpack`会构造`script`标签插入`html`中，然后由浏览器发起异步请求


## webpack能动态加载require引入的模块吗


## Webpack和Vite的区别

`Vite`将应用中的模块区分为`依赖`和`源码`两类，`Vite`将会使用`esbuild`预构建`依赖`。以原生`ESM`方式提供`源码`。`Vite`同时利用 `HTTP`头来加速整个页面的重新加载,`源码`模块的请求会根据`304 Not Modified`进行协商缓存，而`依赖`模块请求则会通过`Cache-Control: max-age=31536000,immutable`进行强缓存，因此一旦被缓存它们将不需要再次请求。

在`HMR`方面，当改动了一个模块后，`Vite`仅需让浏览器重新请求该模块即可，不像`Webpack`那样需要把该模块的相关依赖模块全部编译一次，效率更高。

`Webpack`会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。

由于`Vite`在启动的时候不需要打包，也就意味着不需要分析模块的依赖,不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要,对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间。

`Vite`用`esbuild`预构建依赖，而`Webpack`基于`node`



