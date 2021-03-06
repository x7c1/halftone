use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
    arg1: String,
    arg2: i64,
}

impl Request {
    pub fn run(&self) {
        println!("Sample1: task={:?}", self);
    }
}
