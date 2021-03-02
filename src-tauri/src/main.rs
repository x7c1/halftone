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

fn handler(_webview: &mut Webview<'_>, arg: &str) -> Result<(), String> {
    let command = serde_json::from_str(arg).map_err(|e| e.to_string())?;
    match command {
        Cmd::MyCustomCommand { arg1, arg2 } => {
            println!("main > handler: arg1={}, arg2={}", arg1, arg2);
        }
    }
    Ok(())
}
