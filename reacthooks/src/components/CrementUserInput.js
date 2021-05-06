import React, { useState, useEffect } from 'react';
import { useValue, useChangeValue } from './InDeCrementContext';

const CrementUserInput = ({ changeAmount, initialValue }) => {
  const value = useValue();
  const changeValue = useChangeValue();

  const [valueColor, changeColor] = useState(() => {
    return checkValueColor(initialValue);
  });

  useEffect(() => {
    changeColor(checkValueColor(value));

    return () => {
      checkValueColor('black');
    }
  }, [value])

  return(
    <div>
      <ValueDisplay
        value={value}
        valueColor={valueColor}
      />
      <IncrementButton
        changeValue={changeValue}
        changeAmount={changeAmount}
      />
      <DecrementButton
        changeValue={changeValue}
        changeAmount={changeAmount}
      />
      <ResetButton
        changeValue={changeValue}
        initialValue={initialValue}
      />
    </div>
  )
}

const IncrementButton = ({ changeValue, changeAmount }) => {
  const increment = () => {
    changeValue((state) => {
      const newState = state + changeAmount;
      return newState;
    }
    );
  }

  return (
    <UserButton changeValue={increment} text="+" />
  );
}

const DecrementButton = ({ changeValue, changeAmount }) => {
  const decrement = () => {
    changeValue((state) => {
      const newState = state - changeAmount;
      return newState;
    }
    );
  }

  return (
    <UserButton changeValue={decrement} text="-" />
  );
}

const ResetButton = ({ changeValue, initialValue }) => {
  const reset = () => {
    changeValue(() => {
      const newState = initialValue;
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

export default CrementUserInput;