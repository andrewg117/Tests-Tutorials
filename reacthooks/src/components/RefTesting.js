import React from 'react'

const RefTesting = () => {
  let a = () => {
    return 0;
  };
  let b = () => {
    return 0;
  };
  let c = a;
  console.log(a);

  return (
    <div>
      {a === b ? 'match' : 'no match'}
      <br />
      {a === c ? 'match' : 'no match'}
      <br />
    </div>
  )
}

export default RefTesting
