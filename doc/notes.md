# Notes 

## Template
There are A LOT of options concerning how to set up a project using wasm + rust. 
I would have preferred a setup without the complexity of both cargo & npm, but I think we are sort of forced to. 

I used [this](https://github.com/rustwasm/rust-webpack-template) template. I chose it over the [Standard](https://rustwasm.github.io/docs/book/game-of-life/hello-world.html) one, for the following reasons:
- our project sounds like a "monorepo-style Web application", which this template supports.
- less jitter in the root folder, more clarity overall.
- no yaml files, custom allocators, or other bonus features.
  - I don't want to think about those features at this stage, lets just create something which works, then afterwards optimize it. 


