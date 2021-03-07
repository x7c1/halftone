pub mod invoke;
pub mod promise;

// stands for (callback, error)
pub type Callbacks = (String, String);

pub trait Task<X>: Send + 'static {
    fn run(&self) -> crate::Result<X>;
    fn for_tauri(&self) -> Callbacks;
}
