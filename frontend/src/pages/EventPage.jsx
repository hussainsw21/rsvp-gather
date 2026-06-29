import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RSVPForm from "../components/RSVPForm";
import api from "../api/api";

function formatDateTime(value) {
  if (!value) {
    return "To be announced";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(value));
}

function EventPage() {
  const { shareToken } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/events/${shareToken}`)
      .then((response) => {
        setEvent(response.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError(
          err?.response?.data?.message || "Unable to load the event details.",
        );
      });
  }, [shareToken]);

  if (error) {
    return (
      <main className="page-shell">
        <section className="panel event-panel">
          <p className="eyebrow">Private Invitation</p>
          <h1>Event unavailable</h1>
          <p className="lead">{error}</p>
        </section>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page-shell">
        <section className="panel event-panel">
          <p className="eyebrow">Private Invitation</p>
          <h1>Loading event details...</h1>
        </section>
      </main>
    );
  }

  const rsvpOpenAtTime = new Date(event.rsvpOpenAt).getTime();
  const isRsvpOpen = Number.isFinite(rsvpOpenAtTime)
    ? rsvpOpenAtTime <= Date.now()
    : true;

  return (
    <main className="page-shell">
      <section className="panel event-panel">
        <div className="event-hero">
          <div className="event-copy">
            <p className="eyebrow">Private Invitation</p>
            <h1>{event.title}</h1>
            <p className="lead">
              {event.description || "We would be honored by your response."}
            </p>
          </div>

          <dl className="event-details">
            <div className="detail-card">
              <dt>Venue</dt>
              <dd>{event.location || "Location to be shared privately"}</dd>
            </div>

            <div className="detail-card">
              <dt>Event time</dt>
              <dd>{formatDateTime(event.eventTime)}</dd>
            </div>

            <div className="detail-card">
              <dt>RSVP opens</dt>
              <dd>{formatDateTime(event.rsvpOpenAt)}</dd>
            </div>

            <div className="detail-card">
              <dt>RSVP deadline</dt>
              <dd>{formatDateTime(event.rsvpDeadline)}</dd>
            </div>
          </dl>
        </div>

        <section className="form-section">
          <div className="section-heading">
            <p className="eyebrow">Response Form</p>
            <h2>Kindly confirm your attendance</h2>
          </div>

          {!isRsvpOpen ? (
            <div className="scheduled-notice">
              <p className="eyebrow">Scheduled Opening</p>
              <p className="lead">
                RSVP submissions will open on {formatDateTime(event.rsvpOpenAt)}.
              </p>
            </div>
          ) : (
            <RSVPForm shareToken={shareToken} />
          )}
        </section>
      </section>
    </main>
  );
}

export default EventPage;
