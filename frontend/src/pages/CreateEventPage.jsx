import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/api";
import { getOrganizerSession } from "../utils/organizerSession";

function CreateEventPage() {
  const navigate = useNavigate();
  const session = getOrganizerSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventTime: "",
    rsvpOpenAt: "",
    rsvpDeadline: "",
  });

  if (!session) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/api/events", {
        organizerItsNo: session.itsNo,
        ...form,
      });

      navigate("/organizer/events");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to create the event.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="panel event-panel">
        <div className="section-heading">
          <p className="eyebrow">Organizer Dashboard</p>
          <h1>Create a new event</h1>
          <p className="lead">
            This uses the current backend `POST /api/events` endpoint.
          </p>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-grid">
            <label className="field">
              <span>Event Title</span>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>Location</span>
              <input
                required
                value={form.location}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    location: e.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>Event Time</span>
              <input
                type="datetime-local"
                required
                value={form.eventTime}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    eventTime: e.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>RSVP Opens At</span>
              <input
                type="datetime-local"
                required
                value={form.rsvpOpenAt}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    rsvpOpenAt: e.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>RSVP Deadline</span>
              <input
                type="datetime-local"
                required
                value={form.rsvpDeadline}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    rsvpDeadline: e.target.value,
                  }))
                }
              />
            </label>
          </div>

          <label className="field">
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
            />
          </label>

          <div className="form-actions">
            <button className="primary-button" disabled={loading} type="submit">
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateEventPage;
