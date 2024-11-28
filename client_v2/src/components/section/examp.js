function add(a, b) {
  return a + b; // What if `a` or `b` is not a number?
}

console.log(add(5, "5")); // Output: "55" (String concatenation, not addition)
