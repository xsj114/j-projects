#!/usr/bin/env node

const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const path = require( 'path' );
const process = require( 'process' );
const { exec } = require( 'child_process' );
const prompts = require('./prompt/index.cjs')

const pkg = {
    name,
    version: '0.1.0',
    dependencies: {},
    devDependencies: {},
}

inquirer.prompt(prompts).then(res=>{
    console.log(res)
})
