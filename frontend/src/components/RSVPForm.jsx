import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function RSVPForm({ shareToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    itsNo: "",
    name: "",
    phone: "",
    email: "",
    status: "YES",
    guestCount: "0",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.itsNo || !form.name) {
      setError("ITS Number and Name are required");

      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      setLoading(true);

      await api.post(`/public/events/${shareToken}/rsvp`, form);

      setSuccessMessage("Your response has been recorded.");

      navigate("/success", {
        state: {
          attendeeName: form.name,
          status: form.status,
        },
      });
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {successMessage && <div className="form-success">{successMessage}</div>}

      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <label className="field">
          <span>ITS Number</span>
          <input
            placeholder="Enter your ITS number"
            value={form.itsNo}
            onChange={(e) =>
              setForm({
                ...form,
                itsNo: e.target.value,
              })
            }
          />
        </label>

        <label className="field">
          <span>Full Name</span>
          <input
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </label>

        <label className="field">
          <span>Phone</span>
          <input
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </label>

        <label className="field">
          <span>Attendance</span>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="YES">Accepts with pleasure</option>
            <option value="NO">Regrets respectfully</option>
            <option value="MAYBE">Tentative</option>
          </select>
        </label>

        <label className="field">
          <span>Guests</span>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={form.guestCount}
            onChange={(e) =>
              setForm({
                ...form,
                guestCount: Number(e.target.value),
              })
            }
          />
        </label>
      </div>

      <label className="field">
        <span>Message</span>
        <textarea
          placeholder="Add any note for the hosts"
          value={form.comment}
          onChange={(e) =>
            setForm({
              ...form,
              comment: e.target.value,
            })
          }
        />
      </label>

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit RSVP"}
        </button>
      </div>
    </form>
  );
}

export default RSVPForm;
