import React, { useState } from "react";

export const areaContext = React.createContext();

const Store = ({ children }) => {
  const [areas, setAreas] = useState([]);

  return (
    <areaContext.Provider value={[areas, setAreas]}>
      {children}
    </areaContext.Provider>
  );
};

export default Store;
