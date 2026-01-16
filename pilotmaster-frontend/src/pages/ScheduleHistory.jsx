import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleService from "../api/ScheduleService";
import "../styles/history.css";
import PageContainer from "../components/PageContainer";


export default function ScheduleHistory() {
  const { scheduleId } = useParams();

  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        setStatus("loading");

        const data = await ScheduleService.getHistory(scheduleId);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadHistory();
  }, [scheduleId]);

  return (
   <PageContainer title="Histórico Global">
   <ul className="history-list">
  {history.map(item => (
    <TimelineEvent
      key={item.id}
      action={item.action}
      description={item.description}
      date={new Date(item.createdAt).toLocaleString()}
    />
  ))}
</ul>

  </PageContainer>
  );
}
