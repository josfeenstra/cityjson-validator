// name:    app.js
// author:  Jos Feenstra
// purpose: entry point 
// note:    I dislike js very much, but I think js is appreciated over a typescript implementation

function main() {
    console.log("setting up...");

    // setup drop mechanic
    let drops = document.querySelectorAll(".dropbox");
    if (drops.length == 0) {
        console.error("cant find the dropbox...");
        return;
    }
    for(let drop of drops) {

        setupDragAndDrop(drop, process);

        // make the link within clickable
        let s = drop.querySelector(".selector");
        if (!s) {
            console.error("cant find selector...");
            return;
        }
        
        s.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("click")
        })
    }
}


/**
 * @param {HTMLElement} element The HTML element to drag & drop onto.
 * @param {(files: FileList) => void} callback what to run when files are recieved
 */
function setupDragAndDrop(element, callback) {
    console.log("setting up drag events...");
    element.addEventListener(
        "dragenter",
        function (ev) {
            ev.preventDefault();
            console.log("entering entering...");
            return true;
        },
        true,
    );

    // setup file upload
    element.addEventListener(
        "dragover",
        function (ev) {
            ev.preventDefault();
            console.log("over drag....");
            return true;
        },
        true,
    );

    element.addEventListener(
        "dragleave",
        function (ev) {
            ev.preventDefault();
            console.log("leaving drag....");
            return true;
        },
        true,
    );

    element.addEventListener(
        "drop",
        function (ev) {
            //prevent browser from opening the file when drop off
            ev.stopPropagation();
            ev.preventDefault();

            //retrieve uploaded files data
            var files = ev.dataTransfer.files;

            callback(files);
            return true;
        },
        true,
    );
}

/**
 * @param {FileList} files 
 */
function process(files) {

    console.log("processing cityjson...");


}

window.addEventListener("load", main);