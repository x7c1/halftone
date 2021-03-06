pub mod sample1;
pub mod sample2;

// stands for (callback, error)
pub type Callbacks = (String, String);

pub trait Task<X>: Send + 'static {
    fn run(&self) -> crate::Result<X>;
    fn for_tauri(&self) -> Callbacks;
}
