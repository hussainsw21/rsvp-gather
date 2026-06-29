import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { clearOrganizerSession, getOrganizerSession } from "../utils/organizerSession";

function isRsvpOpen(rsvpOpenAt) {
  if (!rsvpOpenAt) {
    return true;
  }

  return new Date(rsvpOpenAt).getTime() <= Date.now();
}

function formatDateTimeLabel(value) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function OrganizerEventsPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [events, setEvents] = useState([]);
  const [copiedEventId, setCopiedEventId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const organizerSession = getOrganizerSession();

    if (!organizerSession) {
      navigate("/", { replace: true });
      return;
    }

    setSession(organizerSession);

    api
      .get(`/api/events/organizer/${organizerSession.itsNo}`)
      .then((response) => {
        setEvents(response.data);
        setError("");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Unable to load events.");
      });
  }, [navigate]);

  const handleCopy = async (shareToken, eventId) => {
    const shareUrl = `${window.location.origin}/events/${shareToken}`;

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      window.prompt("Copy this RSVP link", shareUrl);
    }

    setCopiedEventId(eventId);
    window.setTimeout(() => setCopiedEventId(""), 2000);
  };

  const handleLogout = () => {
    clearOrganizerSession();
    navigate("/", { replace: true });
  };

  if (!session) {
    return null;
  }

  return (
    <main className="page-shell">
      <section className="panel dashboard-panel">
        <div className="organizer-topbar">
          <div>
            <p className="eyebrow">Organizer Dashboard</p>
            <h1>Your events</h1>
            <p className="dashboard-caption">Logged in as {session.itsNo}</p>
          </div>

          <div className="toolbar-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => navigate("/organizer/events/new")}
            >
              Create Event
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <section className="table-card">
          <div className="table-header">
            <div>
              <p className="eyebrow">Event Registry</p>
              <h2>Created events</h2>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          {!error && events.length === 0 ? (
            <div className="empty-state">
              <p>No events have been created by this organiser yet.</p>
            </div>
          ) : null}

          {!error && events.length > 0 ? (
            <div className="table-scroll">
              <table className="rsvp-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>RSVP Status</th>
                    <th>Location</th>
                    <th>Event Time</th>
                    <th>Opens</th>
                    <th>RSVP Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event) => (
                    <tr key={event.eventId}>
                      <td>{event.title}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            isRsvpOpen(event.rsvpOpenAt)
                              ? "status-yes"
                              : "status-maybe"
                          }`}
                        >
                          {isRsvpOpen(event.rsvpOpenAt) ? "Live" : "Scheduled"}
                        </span>
                      </td>
                      <td>{event.location || "—"}</td>
                      <td>{formatDateTimeLabel(event.eventTime)}</td>
                      <td>{formatDateTimeLabel(event.rsvpOpenAt)}</td>
                      <td className="link-cell">{`/events/${event.shareToken}`}</td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="secondary-button small-button"
                            type="button"
                            onClick={() => navigate(`/dashboard/${event.eventId}`)}
                          >
                            View RSVPs
                          </button>

                          <button
                            className="secondary-button small-button"
                            type="button"
                            disabled={!isRsvpOpen(event.rsvpOpenAt)}
                            onClick={() =>
                              handleCopy(event.shareToken, event.eventId)
                            }
                          >
                            {!isRsvpOpen(event.rsvpOpenAt)
                              ? "Opens Later"
                              : copiedEventId === event.eventId
                                ? "Copied"
                                : "Copy Link"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}

export default OrganizerEventsPage;
