import { createContext, useState } from "react";

export const ContextDatas = createContext();

const Context = ({ children }) => {
  const [User, setUser] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [urlPath, seturlPath] = useState(window.location.pathname ?? "/");

  return (
    <ContextDatas.Provider
      value={{
        User,
        setUser,
        urlPath,
        seturlPath,
      }}
    >
      {children}
    </ContextDatas.Provider>
  );
};

export default Context;
