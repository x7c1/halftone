use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct Sample1 {
    arg1: String,
    arg2: i64,
}

#[derive(Debug, Deserialize)]
pub struct Sample2 {
    arg1: String,
    // reserved fields by tauri
    callback: String,
    error: String,
}

impl Sample2 {
    pub fn run(&self) -> crate::Result<Sample2Response> {
        let message = format!("hello...(from rust!) : {:?}", self);
        let response = Sample2Response {
            sample_greeting: message,
        };
        Ok(response)
    }
    pub fn for_promise(&self) -> (String, String) {
        (self.callback.to_string(), self.error.to_string())
    }
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub struct Sample2Response {
    sample_greeting: String,
}
