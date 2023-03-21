#!/usr/bin/env node

const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const path = require( 'path' );
const process = require( 'process' );
const { exec } = require( 'child_process' );
const prompts = require('./prompt/index.cjs')

        console.log()

inquirer.prompt( prompts ).then( res => {
    for (let val of res.features) {
        const module = require( path.join(__dirname, `./lib/template/${val}`) )
        generator.extend(module) 
    }
} )
