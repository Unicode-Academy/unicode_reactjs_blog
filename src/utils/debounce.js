export const debounce = (callback, timeout = 500) => {
  let timer; //Gán giá trị của setTimeout
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
