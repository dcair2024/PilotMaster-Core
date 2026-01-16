import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShipsService from "../api/shipsService";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";


export default function ShipHistory() {
  const { shipId } = useParams();

  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        setStatus("loading");

        const data = await ShipsService.getShipHistory(shipId);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch {
        setStatus("error");
      }
    }

    loadHistory();
  }, [shipId]);

  return (<PageContainer title="Histórico Global">
    <ul className="history-list">
  {history.map(item => (
    <TimelineEvent
      key={item.id}
      action={item.action}
      description={`Schedule #${item.scheduleId} — ${item.description}`}
      date={new Date(item.createdAt).toLocaleString()}
    />
  ))}
</ul>

  </PageContainer>
  );
}
