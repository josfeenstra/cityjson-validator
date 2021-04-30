<!-- This work should neither be part of the thesis, but serve as an starting point that can be referred within the thesis bibliography.

a half-page summary containing the following:
    
    *   name student
    *   name of the supervisor
    *   title of project
    *   main objectives and deliverables
    *   planned start and end 
    -->

Cityjson validator on the web using Rust
========================================

| | |
|---|---|
|Student | Jos Feenstra   
|Supervisor | Hugo Ledoux

what
----

The subject of this research-orientation project, is building a webpage in which you can load a cityjson file. This json is then subject to a number of validity tests, after which we respond the result of these tests to the user. 

The tool will be a webpage as opposed to a local piece of software, to improve the accessibility of the tool. 

The interesting part is that I will set this up using a language other than Javascript, namely Rust, compiled to webpage using WebAssembly. This is a very new language, and a new way of delivering web applications in general. Using Rust & WebAssembly (often shortened as Wasm), the process could be much faster and more reliable than using Javascript. 


why
----

It is meant as a 'type 2' research project: learning the necessary skills needed during my Thesis. "This work should not be part of the thesis, but serve as an starting point that can be referred within the thesis bibliography" This is exactly how I plan to use this opportunity. The precise content of my thesis is unknown at this point, but it will revolve around using the Web, Rust and Wasm for making geo web apps faster, more reliable, and more in-line with 'native' code. 

This research project is an excellent opportunity to learn the precise skills necessary to do something like that, and to work towards a more precise thesis topic.


main learning objectives 
---------------

- Using Rust for a Geomatics application
  - How to read through a json file using Rust
  - How to use a low-level json validator using Rust

- Deploying WebAssembly
  - Which browsers to support it? 
  - How much 'glue code' is needed?
  - What needs to be done to deploy as lightweight as possible?


deliverables
------------

For the precise deliverables, I would like to refer to the [GitHub Repo]() I will use for this project. The Readme contains a number of  


planning
--------

I plan to get going with this project as soon as I get a green light. I then plan to be done with it by the end of P4, This quarter.
