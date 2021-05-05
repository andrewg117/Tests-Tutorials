import React, { useState } from 'react';

const InDeCrement = ({ initialValue, changeAmount }) => {
  const [value, changeValue] = useState(() => {
    return initialValue;
  });

  const [valueColor, changeColor] = useState(() => {
    return checkValueColor(initialValue);
  });

  return (
    <div>
      <ValueDisplay
        value={value}
        valueColor={valueColor}
      />
      <IncrementButton
        changeValue={changeValue}
        changeColor={changeColor}
        changeAmount={changeAmount}
      />
      <DecrementButton
        changeValue={changeValue}
        changeColor={changeColor}
        changeAmount={changeAmount}
      />
      <ResetButton
        changeValue={changeValue}
        changeColor={changeColor}
        initialValue={initialValue}
      />
    </div>
  );
}

const IncrementButton = ({ changeValue, changeColor, changeAmount }) => {
  const increment = () => {
    changeValue((state) => {
      const newState = state + changeAmount;
      changeColor(checkValueColor(newState));
      return newState;
    }
    );
  }

  return (
    <UserButton changeValue={increment} text="+" />
  );
}

const DecrementButton = ({ changeValue, changeColor, changeAmount }) => {
  const decrement = () => {
    changeValue((state) => {
      const newState = state - changeAmount;
      changeColor(checkValueColor(newState));
      return newState;
    }
    );
  }

  return (
    <UserButton changeValue={decrement} text="-" />
  );
}

const ResetButton = ({ changeValue, changeColor, initialValue }) => {
  const reset = () => {
    changeValue(() => {
      const newState = initialValue;
      changeColor(checkValueColor(newState));
      return newState;
    })
  }

  return (
    <UserButton changeValue={reset} text="reset" />
  );
}

const UserButton = ({ changeValue, text }) => {
  return (
    <button onClick={changeValue}>{text}</button>
  );
}

const ValueDisplay = ({ value, valueColor }) => {
  return (
    <h1 style={{ color: valueColor }}>{value}</h1>
  );
}

const checkValueColor = (value) => {
  return value < 0 ? 'red' : 'black';
}

export default InDeCrement;