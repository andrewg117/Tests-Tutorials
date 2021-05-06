import React, { useState, useContext } from 'react';

const ValueContext = React.createContext();
const ChangeValueContext = React.createContext();

export const useValue = () => {
  return useContext(ValueContext);
}
export const useChangeValue = () => {
  return useContext(ChangeValueContext);
}

const InDeCrementContext = ({ initialValue, children }) => {
  const [value, changeValue] = useState(() => {
    return initialValue;
  });

  return (
    <ValueContext.Provider value={value}>
      <ChangeValueContext.Provider value={changeValue}>
        {children}
      </ChangeValueContext.Provider>
    </ValueContext.Provider>
  );
}


export default InDeCrementContext;