# Cityjson schema validator, using Rust & Wasm 

| | |
|---|---|
|Author | Jos Feenstra 
|Email | me@josfeenstra.nl  
|Supervisor | Hugo Ledoux

<br>


Online
------
[Here](https://josfeenstra.github.io/cityjson-validator/)


What does it validate 
---------------------
* This web tool validates a given json against the [latest](https://3d.bk.tudelft.nl/schemas/cityjson/1.0.2/cityjson.min.schema.json) cityjson schema.


<br/><br/>

Design
------

### Why use WebAssembly? 

- To gain access some [very fast](https://github.com/Stranger6667/jsonschema-rs) libaries. 
- The ability to run the exact same code locally & on the web.

### Why use Rust?

- Rust offers fantastic support for wasm with `wasm-bindgen`, `wasm-pack`, and the fact that the rust compiler supports wasm straight out of the box. 
- Additionally, the design considerations rust is build upon (performance + safety) is a huge potential for geospatial activities. 


### Why two repo's?

- Decoupling

Both Repo's are created as strip down & pure as possible. This is why typescript, webpack, or web frameworks like react are omitted.

I find it important to show that this is that not only a way of making something on the web fast, but to also showcase how wasm enables interoperability: giving the web the exact same functionality as a local environment, while still remaining separate from it.

I thus opted to create the [cityjson-validator-rs](https://github.com/josfeenstra/cityjson-validator-rs) completely separate from the web environment, as just a very normal looking, bare-bones rust project.



<br/><br/>

Installation
------------

```
git clone https://github.com/josfeenstra/cityjson-validator
cd cityjson-validator
```

then host the `/docs` folder using something akin to [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or [Chrome Live Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb). The folder is named `/docs` due to github pages's hosting conventions...

To build the black box where all the magic happens, `/docs/bin`, see [cityjson-validator-rs](https://github.com/josfeenstra/cityjson-validator-rs)

<br/><br/>

Credits
-------

- Written as a GEO5010 research project for the Msc Geomatics @ Tu Delft 

