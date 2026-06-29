const SESSION_KEY = "gather.organizer.session";

export function getOrganizerSession() {
  const raw = window.localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setOrganizerSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearOrganizerSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
