use serde::Deserialize;

/*
   note that rename_all = "camelCase": you need to use "myCustomCommand" on JS
*/
#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
    SampleCommand1 {
        arg1: String,
        arg2: i64,
    },
    SampleCommand2 {
        arg1: String,
        // preserved fields by tauri
        callback: String,
        error: String,
    },
}
