export function debounce(fn: (args: any) => any, t: number) {
  let timeoutID: number;

  return function (...args: any) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => fn([...args]), t) as unknown as number;
  };
}
