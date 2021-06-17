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
    initFileRetrievers(validate);
    
    // make sure we log straight into html 
    logContext = document.getElementsByClassName("output")[0];
    highjackLogger(logContext);
}

/**
 * validate a cityjson
 * @param {string} instanceStr 
 */
async function validate(instanceStr) {
    
    // prepare
    stopwatch.time();

    // init the validator using the schema corresponding to the specific cityjson instance
    stopwatch.time();
    let schemaStr = await GetCJSchema(instanceStr);
    validator = CityJsonValidator.new_from_string(schemaStr);
    stopwatch.log("initalized validator.")

    // the actual validation
    let success = validator.validate_from_str(instanceStr);
    stopwatch.log("validated city.")

    // print feedback to user
    console.log("---------------");
    console.log("| Conclusion: |");
    console.log("---------------");
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