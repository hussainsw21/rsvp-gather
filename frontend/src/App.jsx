import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";
import OrganizerEventsPage from "./pages/OrganizerEventsPage";
import OrganizerLoginPage from "./pages/OrganizerLoginPage";
import SuccessPage from "./pages/SuccessPage";
import DashboardPage from "./pages/DashboardPage";

function RouteNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const malformedDashboardPath = location.pathname.match(
      /^\/dashboard\/https?:\/\/[^/]+\/dashboard\/([^/?#]+)/,
    );

    if (malformedDashboardPath) {
      navigate(`/dashboard/${malformedDashboardPath[1]}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <>
      <RouteNormalizer />

      <Routes>
        <Route path="/" element={<OrganizerLoginPage />} />
        <Route path="/organizer/events" element={<OrganizerEventsPage />} />
        <Route
          path="/organizer/events/new"
          element={<CreateEventPage />}
        />
        <Route path="/events/:shareToken" element={<EventPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard/:eventId" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
