import React, { useState, useEffect, useReducer } from 'react';

const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {value: state.value + action.payload.changeAmount}
    case ACTIONS.DECREMENT:
      return {value: state.value - action.payload.changeAmount}
    case ACTIONS.RESET:
      return {value: action.payload.initialValue}
    default:
      return state
  }
}


const InDeCrement = ({ initialValue, changeAmount }) => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  const [valueColor, changeColor] = useState(() => {
    return checkValueColor(initialValue);
  });

  useEffect(() => {
    changeColor(checkValueColor(state.value));

    return () => {
      checkValueColor('black');
    }
  }, [state.value])

  return (
    <div>
      <ValueDisplay
        value={state.value}
        valueColor={valueColor}
      />
      <IncrementButton
        changeValue={dispatch}
        changeAmount={changeAmount}
      />
      <DecrementButton
        changeValue={dispatch}
        changeAmount={changeAmount}
      />
      <ResetButton
        changeValue={dispatch}
        initialValue={initialValue}
      />
    </div>
  );
}

const IncrementButton = ({ changeValue, changeAmount }) => {
  const increment = () => {
    changeValue({type: ACTIONS.INCREMENT, payload: {changeAmount: changeAmount}});
  }

  return (
    <UserButton changeValue={increment} text="+" />
  );
}

const DecrementButton = ({ changeValue, changeAmount }) => {
  const decrement = () => {
    changeValue({type: ACTIONS.DECREMENT, payload: {changeAmount: changeAmount}});
  }

  return (
    <UserButton changeValue={decrement} text="-" />
  );
}

const ResetButton = ({ changeValue, initialValue }) => {
  const reset = () => {
    changeValue({type: ACTIONS.RESET, payload: {initialValue: initialValue}});
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