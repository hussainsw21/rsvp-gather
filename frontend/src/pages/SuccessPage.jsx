import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <main className="page-shell">
      <section className="panel success-panel">
        <p className="eyebrow">Response Received</p>
        <h1>Thank you for your reply</h1>
        <p className="lead">
          {state?.attendeeName
            ? `${state.attendeeName}, your RSVP has been recorded.`
            : "Your RSVP has been recorded."}
        </p>
        <p className="success-status">
          Attendance status: {state?.status || "Confirmed"}
        </p>
        <button
          className="secondary-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Edit RSVP
        </button>
      </section>
    </main>
  );
}

export default SuccessPage;
