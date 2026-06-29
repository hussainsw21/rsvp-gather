import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setOrganizerSession } from "../utils/organizerSession";

const DEFAULT_ITS_NO = "60421488";
const DEFAULT_PASSWORD = "hus5152";

function OrganizerLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itsNo: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.itsNo || !form.password) {
      setError("ITS number and password are required.");
      return;
    }

    if (
      form.itsNo !== DEFAULT_ITS_NO ||
      form.password !== DEFAULT_PASSWORD
    ) {
      setError("Invalid ITS number or password.");
      return;
    }

    setOrganizerSession({
      itsNo: form.itsNo,
      loggedInAt: new Date().toISOString(),
    });

    navigate("/organizer/events");
  };

  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <div className="section-heading">
          <p className="eyebrow">Organizer Access</p>
          <h1>Manage your events</h1>
          <p className="lead">
            This login is currently client-side only because the backend does
            not expose organiser authentication yet.
          </p>
          <p className="dashboard-caption">
            Default ITS: {DEFAULT_ITS_NO}
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
            <button className="primary-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default OrganizerLoginPage;
