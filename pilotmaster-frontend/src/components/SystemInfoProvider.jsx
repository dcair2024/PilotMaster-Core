import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiConfig";


const SystemInfoContext = createContext(null);

export function SystemInfoProvider({ children }) {
  const [info, setInfo] = useState(null);

 useEffect(() => {
  api.get("/system/info")
    .then(res => setInfo(res.data))
    .catch(err => console.error("Erro ao carregar system info", err));
}, []);

  return (
    <SystemInfoContext.Provider value={info}>
      {children}
    </SystemInfoContext.Provider>
  );
}

export function useSystemInfo() {
  return useContext(SystemInfoContext);
}
