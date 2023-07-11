import { Func } from "./types";

function memoize<T, R>(func: Func<T, R>): Func<T, R> {
  const cache = new Map<T, R>();

  const memoizedFunc: Func<T, R> = (arg: T) => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = func(arg);
    cache.set(arg, result);
    return result;
  };

  return memoizedFunc;
}

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(5)); 
console.log(memoizedFibonacci(5)); 