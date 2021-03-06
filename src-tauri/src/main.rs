#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use halftone_core::hello;
use tauri::Webview;

mod cmd;

use cmd::Cmd;

fn main() {
    println!("{}", hello());

    tauri::AppBuilder::new()
        .invoke_handler(handler)
        .build()
        .run();
}

fn handler(webview: &mut Webview<'_>, arg: &str) -> Result<(), String> {
    let command = serde_json::from_str(arg).map_err(|e| e.to_string())?;
    match command {
        Cmd::SampleCommand1 { arg1, arg2 } => {
            println!("SampleCommand1: arg1={}, arg2={}", arg1, arg2);
        }
        Cmd::SampleCommand2 { arg1, callback, error } => {
            println!("SampleCommand2: arg1={}", arg1);
            tauri::execute_promise(
                webview,
                move || {
                    Ok(format!("hello (from rust): arg1:{}", arg1))
                },
                callback,
                error,
            )
        }
    }
    Ok(())
}
