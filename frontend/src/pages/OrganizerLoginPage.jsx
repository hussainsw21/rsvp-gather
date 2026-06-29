import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { setOrganizerSession } from "../utils/organizerSession";

function OrganizerLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itsNo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.itsNo || !form.password) {
      setError("ITS number and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/api/auth/login", form);

      setOrganizerSession({
        itsNo: response.data.itsNo,
        loggedInAt: new Date().toISOString(),
      });

      navigate("/organizer/events");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <div className="section-heading">
          <p className="eyebrow">Organizer Access</p>
          <h1>Manage your events</h1>
          <p className="lead">
            Organizer access is now validated by the backend and event ownership
            is stored server-side.
          </p>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-grid">
            <label className="field">
              <span>ITS Number</span>
              <input
                value={form.itsNo}
                placeholder="Enter organiser ITS number"
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    itsNo: e.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                placeholder="Enter password"
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default OrganizerLoginPage;
