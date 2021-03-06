export class EitherPromise<T1, E1> {
  promise: Promise<T1>;

  constructor(promise: Promise<T1>) {
    this.promise = promise;
  }

  then<T2>(f: (t: T1) => T2 | PromiseLike<T2>): EitherPromise<T2, E1> {
    return new EitherPromise(this.promise.then(f));
  }

  catch<E2>(f: (e: E1) => E2): EitherPromise<T1 | E2, E1> {
    return new EitherPromise(this.promise.catch(e => f(e)));
  }
}
