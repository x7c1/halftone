use crate::BackendResult;
use crate::HalftoneResult::Success;
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
    sample_arg1: String,
    arg2: i64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    sample_greeting: String,
}

#[tauri::command]
pub fn promisify_sample(request: Request) -> BackendResult<Response> {
    let message = format!("promisify_sample > {:#?}", request);
    println!("sleeping...{}", message);
    thread::sleep(Duration::from_millis(1000));
    Success(Response {
        sample_greeting: message,
    })
    // Failure(crate::Error::IllegalOperation { message })
}
