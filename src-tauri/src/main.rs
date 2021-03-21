#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use halftone_core::hello;
use serde::Serialize;

mod error;

use error::Error;
use error::Result;

mod tasks;

fn main() {
    println!("{}", hello());

    tauri::AppBuilder::default()
        .invoke_handler(tauri::generate_handler![
            tasks::promise::promisify_sample,
            tasks::invoke::invoke_sample,
        ])
        .build(tauri::generate_context!())
        .run();
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "payload")]
pub enum HalftoneResult<A, E> {
    Success(A),
    Failure(E),
}

pub type BackendResult<A> = HalftoneResult<A, Error>;
