export {getCJVersionFromString, GetCJSchema}

const PATH_TO_CITYJSON_SCHEMA = `https://3d.bk.tudelft.nl/schemas/cityjson/{}/cityjson.min.schema.json`;
const PATH_TO_ALL_CITYJSON_SCHEMAS = `https://3d.bk.tudelft.nl/schemas/cityjson/`;
const LOCAL_PATH_TO_CITYJSON_SCHEMA = `./data/cityjson.min.schema.json`


/**
 * Load the schema corresponding to the cityjson instance
 * @param {string} cj 
 * @returns cityjson schema as string
 */
async function GetCJSchema(cj) {
    
    // extract the version from the cj instance
    let version = getCJVersionFromString(cj);

    // figure out which url corresponds to that version
    let path = "";
    if (!version) {
        // something went wrong, use the local v1.0.2
        path = LOCAL_PATH_TO_CITYJSON_SCHEMA;
    } else {
        path = await GetLatestAvailableURL(version);
    }
    
    console.log("fetching schema from: "+ path);
    let res = await fetch(path);
    let schemaStr = await res.text();
    return schemaStr;
}

/**
 * We need to discover the version of the cityjson to load the correct schema
 * @param {string} str
 */
 function getCJVersionFromString(str) {
    let sub = str.substr(0, 200); // make sure we only analyse a small part
    let re = /\"version\"\:\"(.*?)\"/
    let matches = re.exec(sub);
    if (matches && matches.length > 1) {
        let version = matches[1];
        console.log("cityjson version: " + version);
        version = getBaseVersion(version);
        console.log("cityjson base version: " + version);
        return version;
    } 
    console.log("no version found. using latest version...");
    return undefined;
}

/**
 * `figure out which URL we need to call to satisfy a certain version
 * @param {string} version
 */
 async function GetLatestAvailableURL(version) {
    
    let url = "";
    try {
        // fetch all available versions
        let res = await fetch(PATH_TO_ALL_CITYJSON_SCHEMAS);
        let versionWebpage = await res.text();
        let availableVersions = extractAvailableVersions(versionWebpage);

        // see which ones corresponds to 'version'
        // then pick the latest
        let chosenVersion = "";
        let bestPatch = '0';
        let bestMinorPatch = '0';
        for (let v of availableVersions) {
            if (version !== getBaseVersion(v)) {
                continue;
            }
            let [major, minor, patch, minorPatch] = deconstructVersion(v);
            if (patch > bestPatch) {
                chosenVersion = v;
                bestPatch = patch;
                bestMinorPatch = minorPatch;
            } else if (patch == bestPatch && minorPatch > bestMinorPatch) {
                chosenVersion = v;
                bestMinorPatch = minorPatch;
            }
        }

        // feedback
        console.log("latest corresponding version: " + chosenVersion);

        // contruct a url from it
        url = PATH_TO_CITYJSON_SCHEMA.replace("{}", chosenVersion);

    } catch(e) {
        console.log("" + e);
        console.log("NETWORK ERROR: switching to local cityjson schema v1.0.2")
        url = LOCAL_PATH_TO_CITYJSON_SCHEMA;
    }
    
    return url
}

/**
 * [JF]: ehm... I dont know if this is a recommended way of doing things, 
 * but... it works...
 * @param {string} webPage 
 */
function extractAvailableVersions(webPage) {
    let regex = /\<a.*?\>(.*?)<\/a>/gi;
    let matches = webPage.matchAll(regex);

    let availableVersions = [];
    for (let match of matches) {
        availableVersions.push(match[1].replace('\/', ''));
    }
    return availableVersions;
}

function getBaseVersion(version) {
    if (version.split('.').length > 2) {
        let parts = version.split('.');
        version = parts[0] + '.' + parts[1];
    }
    return version;
}

function deconstructVersion(version) {
    let comp = version.split('.');
    while (comp.length < 4) {
        comp.push('0');
    }
    return comp;
}