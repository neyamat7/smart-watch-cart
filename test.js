let num = 344;

function countDigit(num) {
  return Math.floor(Math.log10(num)) + 1;
}

console.log(countDigit(num));