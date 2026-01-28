import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";
import EmptyState from "../components/EmptyState";
import { MICROCOPY } from "../ui/microcopy";


import { Link } from "react-router-dom";


export default function GlobalHistory() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await api.get("/history");

        if (!response.data || response.data.length === 0) {
          setStatus("empty");
          return;
        }

        setItems(response.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadHistory();
  }, []);

  return (
    <PageContainer title="Histórico Global">
      {status === "loading" && <p>{MICROCOPY.loading.globalHistory}</p>}

{status === "empty" && (
  <EmptyState
    title={MICROCOPY.empty.globalHistory.title}
    subtitle={MICROCOPY.empty.globalHistory.subtitle}
  />
)}

{status === "error" && (
  <EmptyState
    title={MICROCOPY.error.generic.title}
    subtitle={MICROCOPY.error.generic.subtitle}
  />
)}      

      {status === "success" && (
  <ul className="history-list">
    {items.map((item, index) => {
      let link = null;

      if (item.shipId) {
        link = `/ships/${item.shipId}/history`;
      } else if (item.scheduleId) {
        link = `/schedule/${item.scheduleId}/history`;
      }

      const timelineItem = (
        <TimelineEvent
          action={item.action}
          description={item.description}
          date={new Date(item.createdAt).toLocaleString()}
        />
      );

      return link ? (
        <Link
          key={`${item.id}-${item.createdAt}-${index}`}
          to={link}
          style={{ textDecoration: "none", display: "block" }}
        >
          {timelineItem}
        </Link>
      ) : (
        timelineItem
      );
    })}
  </ul>
)}

    </PageContainer>
  );
}
