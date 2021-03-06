use crate::tasks::{Callbacks, Task};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
    sample_arg1: String,
    // reserved fields by tauri
    callback: String,
    error: String,
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub struct Response {
    sample_greeting: String,
}

impl Task<Response> for Request {
    fn run(&self) -> crate::Result<Response> {
        let message = format!("hello...(from rust!) : {:?}", self);
        let response = Response {
            sample_greeting: message,
        };
        Ok(response)
    }
    fn for_tauri(&self) -> Callbacks {
        (self.callback.to_string(), self.error.to_string())
    }
}
