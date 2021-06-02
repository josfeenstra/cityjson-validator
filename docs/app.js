// name:    app.js
// author:  Jos Feenstra
// purpose: entry point 

import { initFileRetrievers } from './js/file-retrieval.js';
import { Stopwatch } from "./js/stopwatch.js";
import init, { CityJsonValidator } from './bin/cityjson_validator.js';

// I'm getting cross-origin troubles usng this directly, so im using a local file instead. 
// const PATH_TO_CITYJSON_SCHEMA = "https://3d.bk.tudelft.nl/schemas/cityjson/1.0.2/cityjson.min.schema.json";
const PATH_TO_CITYJSON_SCHEMA = './data/cityjson.min.schema.json'
var validator;
const stopwatch = Stopwatch.new();

async function main() {

    // init wasm
    await init(); 

    // get the schema.json as a string
    const res = await fetch(PATH_TO_CITYJSON_SCHEMA);
    const schemaStr = await res.text();

    // init the validator using the schema
    stopwatch.time();
    validator = CityJsonValidator.new_from_string(schemaStr);
    stopwatch.log("initalized validator")

    // bootstrap all the file select / drag&drop functionality
    // once we get something with a .json extension -> pass it to the 'validate' function
    initFileRetrievers(validate);
    
    // make sure we log straight into html 
    let logContext = document.getElementsByClassName("output")[0];
    highjackLogger(logContext);
}

/**
 * validate a cityjson
 * @param {string} cityjsonInstance 
 */
function validate(cityjsonInstance) {
    
    // prepare
    console.clear();
    stopwatch.time();

    // the actual validation
    let res = validator.validate_from_str(cityjsonInstance);

    // print feedback to user
    console.log("---------------");
    console.log("| Conclusion: |");
    console.log("---------------");
    if (res) {
        console.log("json is valid!");
    } else {
        console.log("json is NOT valid!");
    }
    console.log("...");
    stopwatch.log("this");
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
            context.innerHTML += '<code>' + arguments[i] + '</code>'+  '<br />';
        }
        console.logOld(...arguments);
    }

    console.clear = function() {
        context.innerHTML = "";
        console.clearOld();
    }
}

main();