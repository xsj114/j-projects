#!/usr/bin/env node

const { exec } = require('node:child_process');

const lint = async () => {
    exec('yarn workspaces list --json', ( error, stdout, stderr ) => {
        let result = stdout.split( '\n' ).filter( ele =>  ele ? true : false  ).map( ele => {
            ele = (new Function("return " + ele))()
            return ele
        } )
        for (let val of result) {
            exec( `yarn workspace ${val.name} lint`, ( error, stdout, stderr ) => {
                console.log(stdout)
            } )
        }
    })
}

lint()
