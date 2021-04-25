use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
    arg1: String,
    arg2: i64,
}

#[tauri::command]
pub fn invoke_sample(request: Request) -> String {
    let message = format!("invoke_sample > {:#?}", request);
    println!("invoked...{}", message);
    message
}
