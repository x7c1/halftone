#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use halftone_core::hello;
use serde::Serialize;
use tauri::Webview;

mod cmd;
mod error;

use error::Error;
use error::Result;

use cmd::Cmd;

fn main() {
    println!("{}", hello());

    tauri::AppBuilder::new()
        .invoke_handler(handler)
        .build()
        .run();
}

fn handler(webview: &mut Webview<'_>, arg: &str) -> std::result::Result<(), String> {
    let command = serde_json::from_str(arg).map_err(|e| e.to_string())?;
    println!("command: {:?}", command);

    match command {
        Cmd::Sample1(command) => {
            println!("Sample1: command={:?}", command);
        }
        Cmd::Sample2(command) => {
            println!("Sample2: command={:?}", command);
            let (callback, error) = (command.callback.to_string(), command.error.to_string());
            tauri::execute_promise(webview, move || to_response(command.run()), callback, error)
        }
    }
    Ok(())
}

fn to_response<A>(result: crate::Result<A>) -> tauri::Result<Response<A, Error>> {
    let response = match result {
        Ok(x) => Response::Success(x),
        Err(x) => Response::Failure(x),
    };
    Ok(response)
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "payload")]
pub enum Response<A, E> {
    Success(A),
    Failure(E),
}
