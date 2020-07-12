export const randId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const deepCopy = (input) => {
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  let output = Array.isArray(input) ? [] : {};
  for (let key in input) {
    let value = input[key];
    output[key] = deepCopy(value);
  }
  return output;
};

export const sortArr = (arr) => {
  let sorted = deepCopy(arr);
  sorted.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
  return sorted;
};
