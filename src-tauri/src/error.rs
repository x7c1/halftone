use serde::Serialize;

pub type Result<A> = std::result::Result<A, Error>;

#[allow(dead_code)]
#[derive(Debug, Serialize)]
#[serde(tag = "type")]
pub enum Error {
    IllegalOperation { message: String },
    Unexpected { message: String },
}
