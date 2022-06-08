import { useState } from "react";

import Context from "./Context";

function Provider({ children }) {
  const [TAW, setTAW] = useState(0);
  const [TBF, setTBF] = useState(0);
  const [TCF, setTCF] = useState(0);
  const [EF, setEF] = useState(0);
  const [P, setP] = useState(0);
  const [salary, setSalary] = useState(0);

  return (
    <Context.Provider
      value={{
        TAW,
        setTAW,
        TBF,
        setTBF,
        TCF,
        setTCF,
        EF,
        setEF,
        P,
        setP,
        salary,
        setSalary,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
