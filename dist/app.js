// name:    app.js
// author:  Jos Feenstra
// purpose: entry point 

import { initFileSelectors } from './js/parsing.js';
import init, { CityJsonValidator } from './bin/cityjson_validator.js';
import { Stopwatch } from "./js/stopwatch.js";

// I'm getting cross-origin troubles using this directly 
// const PATH_TO_CITYJSON_SCHEMA = "https://3d.bk.tudelft.nl/schemas/cityjson/1.0.2/cityjson.min.schema.json";
const PATH_TO_CITYJSON_SCHEMA = './data/cityjson.min.schema.json'
var validator;
const stopwatch = Stopwatch.new();


async function main() {
    fetchSchema() 
    await init();
    let schemaStr = await fetchSchema();
    stopwatch.time();
    validator = CityJsonValidator.new_from_string(schemaStr);
    stopwatch.log("initalized validator")

    // init all the file select / drag&drop functionality AFTER the validator is initalized
    // not that anyone will be fast enough to validate  
    initFileSelectors(validate);
}

async function fetchSchema() {
    const res = await fetch(PATH_TO_CITYJSON_SCHEMA);
    return await res.text();
}

function validate(cityjsonInstance) {
    stopwatch.time();
    let res = validator.validate_from_str(cityjsonInstance);
    console.log("response", res);
    stopwatch.log("validated cityjson");
}


main();



//#endregion