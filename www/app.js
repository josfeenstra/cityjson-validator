// name:    app.js
// author:  Jos Feenstra
// purpose: entry point 

import { initFileRetrievers } from './js/file-retrieval.js';
import { Stopwatch } from "./js/stopwatch.js";
import init, { CityJsonValidator } from './bin/cityjson_validator.js';

// I'm getting cross-origin troubles using this directly, so im using a local file instead. 
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
    initFileRetrievers(validate);
}

function validate(cityjsonInstance) {
    stopwatch.time();
    let res = validator.validate_from_str(cityjsonInstance);
    console.log("response", res);
    stopwatch.log("validated cityjson");
}

main();