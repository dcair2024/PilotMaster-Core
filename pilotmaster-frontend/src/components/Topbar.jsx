import { useSystemInfo } from "./SystemInfoProvider";


export default function Topbar() {
  const info = useSystemInfo();

  return (
    <div className="app-topbar">
      <strong>{info?.systemName ?? "PilotMaster"}</strong>
    </div>
  );
}

