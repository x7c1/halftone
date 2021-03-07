use crate::tasks::{Callbacks, Task};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
    sample_arg1: String,
    arg2: i64,
    // reserved fields by tauri
    callback: String,
    error: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    sample_greeting: String,
}

impl Task<Response> for Request {
    fn run(&self) -> crate::Result<Response> {
        let message = format!("promise::Task > {:#?}", self);
        println!("sleeping");
        thread::sleep(Duration::from_millis(1000));

        let response = Response {
            sample_greeting: message,
        };
        Ok(response)
        // or return Err to test tauri.promisified
        // Err(crate::Error::IllegalOperation { message })
    }
    fn for_tauri(&self) -> Callbacks {
        (self.callback.to_string(), self.error.to_string())
    }
}
