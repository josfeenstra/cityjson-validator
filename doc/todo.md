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



Second mail from Hugo
-----------------------

- Q: how many hours you spend?
  -> Enough, but I'm fine with spending some more hours to truly finish this :)

- Q: validate_hierarchy() ==> parent-child relationship is a better name IMO, I was confused at first
  -> [X] TODO : fix a name

- Q: robust for?
    - Q: non-json input
      - [X] TODO : better error messages when deserialization fails
    - Q: non cityjson input

> [JF] : It handles it no problem. the validator just states that none of the schema elements are present. 
> The User will have to surmise that this means that the json he/she presented is not a cityjson at all.
> Still, we could build something which makes this more explicit 

    - Q: fetch schema based on the version (for v1.1)
    - Q: “The cityjson must match the 1.0.2” ==> always only ”version”: “1.0” or 1.1, not the patch number
      TODO: 
      - [X] in js: deserialize first 100 characters or so to discover the version
        - [X] ignore hardcore validation: just parse the string, search for the `\"version\"\:` string exactly using regex
        - [X] pick latest version if you cannot find a version
        - [X] extract major and minor version
        - [ ] make sure it exists, add some local fail-save if the website is down or something
      - [ ] Fetch the this version from the site.
        - [ ] solve cross origin funky business...

> [JF]: I will try to do this at the js side of things. Update: I got stuck at cross-origin troubles. Must learn more about cross-origin web pages in general...

- Q: what about creating a cjval library and have it as a rust package at crates.io? Then the code for the wasm/website just use that?

> could work I think... but this would still require rust wrapper code added to the website code. If you want to publish a package straight for web usage, 
> that is possible, but that would mean creating a NPM package. npm can contain wasm, so this could work. 
> I will deal with npm & crates eventually for my thesis. I will inform you if I have figured out a nicer way for distributing this using either crates or npm. 

- Q: could you remove the dash from the name?

> [JF]: cj-val -> cjval, got it!

- Q: what about for the website having a table with the tests as rows and a green/yellow/red light column? That would mean that you call only certain tests (like duplicate vertices) when the schema is valid in the first place (like you did, this is fine). Each validation function should be public/exposed, but this is easy

> [JF]: ehhh, Im less sure about this one. The jsons whould have to be deserialized for each 
> step, I'm not sure how passing deserialized jsons between javascript and rust will work. 
> Also, if the user skips the schema validate check, We have no way of knowing for 
> sure if all cityjson elements are present.
>
> But I agree that the user should have some agency in turning on and off additional 
> checkers, to speed things up. 





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

