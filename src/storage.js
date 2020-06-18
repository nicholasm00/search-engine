import { data } from './data';

export const searchItems = data;

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

export let dashboard = deepCopy(searchItems);

export const setDashboard = (newDash) => {
  dashboard = newDash;
};

export let darkMode = false;

export const setDarkMode = (isDark) => {
  darkMode = isDark;
};

export let defaultId = searchItems[0].id;

export const setDefaultId = (search) => {
  defaultId = search;
};
