// "use client"
// import React, { useState } from 'react'

// const Example = () => {
//   const [number ,setNumber] = useState(0)
//   return (
//     <div className=' bg-red-300'>
//       {number}
//       <button onClick={()=>setNumber(number+1)}>+</button>
//       <button onClick={()=>setNumber(number-1)}>-</button>
//     </div>
//   )
// }

// export default Example
//ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 5)); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// console.log(add(5, 5)); // Output: 10
