#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use halftone_core::hello;
use serde::Serialize;
use tauri::Webview;

mod cmd;

use cmd::Cmd;

mod error;

use crate::tasks::Task;
use error::Error;
use error::Result;

mod tasks;

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
        Cmd::Sample1(task) => {
            println!("Sample1: task={:?}", task);
        }
        Cmd::Sample2(task) => promise(task, webview),
    }
    Ok(())
}

fn promise<A, X>(task: A, webview: &mut Webview<'_>)
where
    A: Task<X>,
    X: Serialize,
{
    let (callback, error) = task.for_tauri();
    tauri::execute_promise(webview, move || to_response(task.run()), callback, error)
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
