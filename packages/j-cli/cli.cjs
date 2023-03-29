#!/usr/bin/env node

const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const path = require( 'path' );
const process = require( 'process' );
const { exec } = require( 'child_process' );
const prompts = require('./prompt/index.cjs')
const Generator = require('./lib/generator/index.cjs')
const generator = new Generator()


const generate_package_json = (res) => {
    for (let val of res.features) {
        const module = require( path.join(__dirname, `./lib/generator/${val}.cjs`))
        module && ( generator.extend( module( res ) ) )
    }
    console.log(generator.pkg)
}

inquirer.prompt( prompts ).then( res => {
    generate_package_json(res)
} )



