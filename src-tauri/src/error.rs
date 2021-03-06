use serde::{Serialize};

pub type Result<A> = std::result::Result<A, Error>;

#[derive(Debug, Serialize)]
#[serde(tag = "type")]
pub enum Error {
    IllegalOperation { message: String },
    Unexpected { message: String },
}
