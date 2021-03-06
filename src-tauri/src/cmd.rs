use serde::{Deserialize, Serialize};

/*
   note that rename_all = "camelCase": you need to use "myCustomCommand" on JS
*/
#[derive(Debug, Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Sample1(Sample1),
    Sample2(Sample2),
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
    pub callback: String,
    pub error: String,
}

impl Sample2 {
    pub fn run(&self) -> crate::Result<Sample2Response> {
        let message = format!("hello...(from rust!) : {:?}", self);
        let response = Sample2Response {
            sample_greeting: message,
        };
        Ok(response)
    }
}

#[derive(Serialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub struct Sample2Response {
    sample_greeting: String,
}
