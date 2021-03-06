use crate::tasks::{sample1, sample2};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Sample1(sample1::Request),
    Sample2(sample2::Request),
}
