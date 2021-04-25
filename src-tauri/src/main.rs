#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use halftone_core::hello;

mod error;

#[allow(unused)]
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
