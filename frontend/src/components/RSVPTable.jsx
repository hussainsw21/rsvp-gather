function formatUpdatedAt(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function RSVPTable({ rsvps }) {
  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <p className="eyebrow">Guest Responses</p>
          <h2>Attendance registry</h2>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <div className="empty-state">
          <p>No RSVP entries are available for this event yet.</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="rsvp-table">
            <thead>
              <tr>
                <th>ITS</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Guests</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={`${rsvp.itsNo}-${rsvp.updatedAt}`}>
                  <td>{rsvp.itsNo}</td>
                  <td>{rsvp.attendeeName}</td>
                  <td>{rsvp.attendeePhone || "—"}</td>
                  <td>{rsvp.attendeeEmail || "—"}</td>
                  <td>
                    <span className={`status-pill status-${rsvp.status?.toLowerCase()}`}>
                      {rsvp.status}
                    </span>
                  </td>
                  <td>{rsvp.guestCount ?? 0}</td>
                  <td>{formatUpdatedAt(rsvp.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RSVPTable;
