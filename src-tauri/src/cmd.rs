use crate::tasks::{Sample1, Sample2};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Sample1(Sample1),
    Sample2(Sample2),
}
