export const factorailCalc = (num) => {
  if (isNaN(num)) {
    return NaN;
  }
  if (num === 0 || num === 1) {
    return 1;
  }

  /*
  return Array.from(Array(num).keys()).reduce(
    (factorial, current) => factorial * (current + 1),
    1
  );*/
  return num * factorailCalc(num - 1);
};
