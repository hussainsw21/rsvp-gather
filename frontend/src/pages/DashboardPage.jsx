import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import RSVPTable from "../components/RSVPTable";
import SummaryCards from "../components/SummaryCards";

const STATUSES = ["YES", "NO", "MAYBE"];

function sortRsvpsByLatest(first, second) {
  return new Date(second.updatedAt) - new Date(first.updatedAt);
}

function DashboardPage() {
  const { eventId } = useParams();

  const [summary, setSummary] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (eventId) {
      loadDashboard();
    }
  }, [eventId]);

  const loadDashboard = async () => {
    try {
      const [summaryResponse, ...rsvpResponses] = await Promise.all([
        api.get(`/public/events/dashboard/${eventId}/summary`),
        ...STATUSES.map((status) =>
          api.get(`/public/events/dashboard/${eventId}`, {
            params: { status },
          }),
        ),
      ]);

      const allRsvps = rsvpResponses
        .flatMap((response) => response.data)
        .filter(
          (rsvp, index, list) =>
            list.findIndex((entry) => entry.itsNo === rsvp.itsNo) === index,
        )
        .sort(sortRsvpsByLatest);

      setSummary(summaryResponse.data);
      setRsvps(allRsvps);
      setError("");
    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.message || "Unable to load dashboard data.",
      );
    }
  };

  if (error) {
    return (
      <main className="page-shell">
        <section className="panel dashboard-panel">
          <p className="eyebrow">Event Dashboard</p>
          <h1>Dashboard unavailable</h1>
          <p className="lead">{error}</p>
        </section>
      </main>
    );
  }

  if (!summary) {
    return (
      <main className="page-shell">
        <section className="panel dashboard-panel">
          <p className="eyebrow">Event Dashboard</p>
          <h1>Loading dashboard...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel dashboard-panel">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Event Dashboard</p>
            <h1>RSVP overview</h1>
          </div>

          <p className="dashboard-caption">
            {rsvps.length} {rsvps.length === 1 ? "response" : "responses"}{" "}
            received
          </p>
        </div>

        <SummaryCards summary={summary} />
        <RSVPTable rsvps={rsvps} />
      </section>
    </main>
  );
}

export default DashboardPage;
