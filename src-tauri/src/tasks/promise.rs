use crate::error::Error::IllegalOperation;
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
#[serde(rename_all = "camelCase")]
pub struct Response {
    sample_greeting: String,
}

impl Task<Response> for Request {
    fn run(&self) -> crate::Result<Response> {
        let message = format!("promise::Task > {:?}", self);
        let response = Response {
            sample_greeting: message,
        };
        Ok(response)
        // Err(IllegalOperation { message })
    }
    fn for_tauri(&self) -> Callbacks {
        (self.callback.to_string(), self.error.to_string())
    }
}
