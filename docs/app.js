// name:    app.js
// author:  Jos Feenstra
// purpose: entry point 

import { initFileRetrievers } from './js/file-retrieval.js';
import { Stopwatch } from "./js/stopwatch.js";
import init, { CityJsonValidator } from './bin/cityjson_validator.js';
import { GetCJSchema } from './js/schema-version.js';

var validator;
const stopwatch = Stopwatch.new();
var logContext = null;

async function main() {

    // init wasm
    await init(); 

    // bootstrap all the file select / drag&drop functionality
    // once we get something with a .json extension -> pass its content as string to the 'validate' function
    initFileRetrievers(preValidate);
    
    // make sure we log straight into html 
    logContext = document.getElementsByClassName("output")[0];
    highjackLogger(logContext);
}

/**
 * Fire this before the actual process, to load the cj schema
 * @param {string} instanceStr 
 */
async function preValidate(instanceStr) {
    let schemaStr = await GetCJSchema(instanceStr);
    validate(instanceStr, schemaStr);
}

/**
 * If we want to avoid 'GetCJSchema', this how to directly load the local schema.
 * @param {string} instanceStr 
 */
async function preValidateWithLocalSchema(instanceStr) {
    const LOCAL_PATH_TO_CITYJSON_SCHEMA = `./data/cityjson.min.schema.json`
    let res = await fetch(LOCAL_PATH_TO_CITYJSON_SCHEMA);
    let schemaStr = await res.text();
    validate(instanceStr, schemaStr);
}


/**
 * validate a cityjson
 * @param {string} instanceStr 
 */
function validate(instanceStr, schemaStr) {
    
    // init the validator using the schema corresponding to the specific cityjson instance
    stopwatch.log("fetched schema.")
    validator = CityJsonValidator.new_from_string(schemaStr);
    stopwatch.log("initalized validator.")

    // the actual validation
    let success = validator.validate_from_str(instanceStr);
    stopwatch.log("validated city.")

    // print feedback to user
    console.log("+-------------+");
    console.log("| Conclusion: |");
    console.log("+-------------+");
    if (success) {
        console.log("json is valid!");
        logContext.style = "background: lightgreen";
    } else {
        console.log("json is NOT valid!");
        logContext.style = "background: pink";
    }
    console.log("Have a nice day!");
}

/**
 * highjack the console.log functionality, 
 * so we can also show the logs on the webpage itself
 * @param {HTMLElement} context
 */
function highjackLogger(context) {

    console.logOld = console.log;
    console.clearOld = console.clear;
    
    console.log = function() {
        for (var i = 0; i < arguments.length; i++) {
            let string = arguments[i].toString().replace("\n", "<br\>");
            context.innerHTML += '<code>' + string + '</code>'+  '<br/>';
        }
        console.logOld(...arguments);
    }

    console.clear = function() {
        context.innerHTML = "";
        context.style = "";
        console.clearOld();
    }
}

main();