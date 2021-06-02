TODO
====

All Steps
--------------

  - [X] write intro to Clara 
  - [X] build markup interface, drag & drop a json, and print it out
  - [X] make a 'on dry land' cityjson validator, aka : a pure rust cli-app which correctly validates a cityjson. 
    - [X] Build simple cli interface
    - [X] get serde & jsonschema libraries to work
    - [X] print out the errors in a consistent way
  - [X] make a hello world - level connection to wasm 
    > [JF] I completed a bit of the tutorial on the rust X wasm page, where you have to implement the game of life. 

  - [X] overcome obstacle : jsonschema crate is not compilable to wasm
    > [JF] I fixed this by downgrading a certain crate, and by turning certain default features of `jsonschema` off.
  - [X] give the json string to rust, somehow
  - [X] validate an actual city-json 
  - [X] print everything that is wrong with the json in rust 
    - [X] Make the error statements nice: location, kind of error, etc.
    - [X] if duplicate, show which vertices are duplicate
  - [X] print everything that is wrong with the json in the web console
  - [X] print everything that is wrong with the json in the webpage itself.
  - [X] publish to github pages
  - [X] send report to clara

Stretch Goals 
-------------
  
- [ ] add extra functionality 
  - [X] check for duplicate vertices
  - [ ] check for duplicate names 
> no idea how to do this...

  - [X] check if hierarchies are correct (check all parent-child relationships)
  - [ ] automatically load the latest schema from the schema site, instead of this hardcoded solution.


Original mail from Hugo
-----------------------

- make the equivalent of [gltf validator](https://github.khronos.org/glTF-Validator/) : 
  - a simple page where you drag a cityjson file and you get the report of the schema validation

> [JF] This works right now!

- ideally should be w/o npm or large package manager. 
  - [This seems promising](http://www.furidamu.org/blog/2020/07/10/rust-webassembly-in-the-browser/) (parceljs is what Stelios uses but I’ve never used it)

> [JF] Didn't use any package manager aside from `wasm-pack`. Thank you for that link btw! it was really instrumental. 

- The validation should be only in the browser, no upload of a file anywhere 
> [JF] drag & drop, or 'select file', check!_

- The latest schema of cityjson (minified) is there: https://3d.bk.tudelft.nl/schemas/cityjson/1.0.2/cityjson.min.schema.json

> [JF] I hardcoded it into the repo. 

- So the idea is to use WASM/Rust, the best/fastest validator is https://docs.rs/jsonschema/0.6.1/jsonschema/
- The rust code for validation should be minimal here, I fiddled 2h a while ago to test it: (link removed)
- The validator of cjio has more custom functions to validate, but I will code those after (eg checking duplicate vertices, cannot be done with a schema…).

> [JF] I've done a couple already, but not all of them.

Comments to myself
------------------
- TODO : convert all functions to async & await syntax, instead of this callback adventure.



Links 
=====

- inspired by: [gltf validator](https://github.khronos.org/glTF-Validator/)       
- [serde (json IO)](https://docs.serde.rs/serde_json/)
- [rust triangulation](https://hugoledoux.github.io/startin_wasm/www/dist/)


Important documentation
=======================

- [rust + wasm book](https://rustwasm.github.io/docs/book/introduction.html)
- [wasm-pack book](https://rustwasm.github.io/docs/wasm-pack/)

