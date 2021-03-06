use serde::{Deserialize, Serialize};

// stands for (callback, error)
pub type Callbacks = (String, String);

pub trait Task<X>: Send + 'static {
    fn run(&self) -> crate::Result<X>;
    fn for_tauri(&self) -> Callbacks;
}

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

impl Task<Sample2Response> for Sample2 {
    fn run(&self) -> crate::Result<Sample2Response> {
        let message = format!("hello...(from rust!) : {:?}", self);
        let response = Sample2Response {
            sample_greeting: message,
        };
        Ok(response)
    }
    fn for_tauri(&self) -> Callbacks {
        (self.callback.to_string(), self.error.to_string())
    }
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub struct Sample2Response {
    sample_greeting: String,
}
