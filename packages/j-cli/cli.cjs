#!/usr/bin/env node

const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const path = require( 'path' );
const process = require( 'process' );
const { exec } = require( 'child_process' );
const prompts = require('./prompt/index.cjs')
const generator = require('./lib/generator/index.cjs')


inquirer.prompt( prompts ).then( res => {
    for (let val of res.features) {
        try{
            const module = require( path.join(__dirname, `./lib/template/${val}`) )
            console.log(module)
            module && ( generator.extend( module ) )
        }catch(e){

        }
    }
} )
