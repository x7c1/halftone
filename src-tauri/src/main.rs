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
    println!("command received: {:?}", command);

    match command {
        Cmd::InvokeSample(task) => task.run(),
        Cmd::PromisifySample(task) => promise(task, webview),
    }
    Ok(())
}

fn promise<A, X>(task: A, webview: &mut Webview<'_>)
where
    A: Task<X>,
    X: Serialize,
{
    let (callback, error) = task.for_tauri();
    tauri::execute_promise(
        webview,
        move || Ok(to_response(task.run())),
        callback,
        error,
    )
}

fn to_response<A>(result: crate::Result<A>) -> BackendResult<A, Error> {
    match result {
        Ok(x) => BackendResult::Success(x),
        Err(x) => BackendResult::Failure(x),
    }
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "payload")]
pub enum BackendResult<A, E> {
    Success(A),
    Failure(E),
}
