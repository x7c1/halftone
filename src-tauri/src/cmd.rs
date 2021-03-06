use crate::tasks::{invoke, promise};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    InvokeSample(invoke::Request),
    PromisifySample(promise::Request),
}
