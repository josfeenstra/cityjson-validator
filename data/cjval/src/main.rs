use jsonschema::{CompilationError, Draft, JSONSchema};
use serde_json::{json, Value};

fn main() -> Result<(), CompilationError> {
    let s = r#"
    {
       "$schema": "http://json-schema.org/draft-07/schema#",
       "title": "Product",
       "description": "A product from Acme's catalog",
       "type": "object",
       "properties": {
      
          "id": {
             "description": "The unique identifier for a product",
             "type": "integer"
          },
          "name": {
             "description": "Name of the product",
             "type": "string"
          },
          "price": {
             "type": "number",
             "minimum": 0,
             "exclusiveMinimum": true
          }
       },
       "required": ["id", "name", "price"]
    }"#;
    let schema: Value = serde_json::from_str(s).unwrap();
    let compiled = JSONSchema::compile(&schema);

    match compiled {
        Err(e) => println!("xxx {}", e),
        Ok(f) => println!("{:?}", f),
    };

    // let data = r#"
    //     {
    //         "id": 2.1,
    //         "name": "An ice sculpture",
    //         "price": 12.50
    //     }"#;
    // let instance = serde_json::from_str(data).unwrap();
    // let result = compiled.validate(&instance);
    // if let Err(errors) = result {
    //     for error in errors {
    //         println!("Validation error: {}", error)
    //     }
    // }
    Ok(())
}

// use std::fs;
// use std::io::BufReader;

// use jsonschema::{CompilationError, JSONSchema};
// use serde_json::{json, Result, Value};

// // fn main() -> Result<(), CompilationError> {
// //     let schema = json!({"maxLength": 5});
// //     let instance = json!("foo");
// //     let compiled = JSONSchema::options()
// //         .with_draft(Draft::Draft7)
// //         .compile(&schema)?;
// //     let result = compiled.validate(&instance);
// //     if let Err(errors) = result {
// //         for error in errors {
// //             println!("Validation error: {}", error)
// //         }
// //     }
// //     Ok(())
// // }

// // fn main() -> Result<(), CompilationError> {
// //     // let br = BufReader::new(File::open("/Users/hugo/temp/cj/cityjson.min.schema.json").unwrap());
// //     let br = BufReader::new(File::open("/Users/hugo/temp/cj/s.json").unwrap());
// //     let schema = serde_json::from_reader(br).unwrap();

// //     let br2 = BufReader::new(File::open("/Users/hugo/temp/cj/i.json").unwrap());
// //     // BufReader::new(File::open("/Users/hugo/data/cityjson/v1.1/denhaag/b3.city.json").unwrap());
// //     let instance = serde_json::from_reader(br2).unwrap();

// //     let compiled = JSONSchema::compile(&schema).unwrap();
// //     let result = compiled.validate(&instance);
// //     if let Err(errors) = result {
// //         for error in errors {
// //             println!("Validation error: {}", error)
// //         }
// //     }
// //     Ok(())
// // }

// fn main() {

//     let schema_json = fs::read_to_string("/Users/hugo/temp/cj/cityjson.min.schema.json").unwrap();
//     let schema_json = serde_json::from_str(&schema_json).unwrap();
//     let schema = JSONSchema::compile(&schema_json).unwrap();

//     let instance_json = fs::read_to_string("/Users/hugo/temp/cj/i.json").unwrap();
//     let instance_json = serde_json::from_str(&instance_json).unwrap();
//     let validation = schema.validate(&instance_json);
//     let mut success = true;
//     match validation {
//         Ok(_) => println!("{} - VALID", "file"),
//         Err(errors) => {
//             success = false;

//             println!("{} - INVALID. Errors:", "fmyile");
//             for (i, e) in errors.enumerate() {
//                 println!("{}. {}", i + 1, e);
//             }
//         }
//     }
//     // Ok(())
// }
