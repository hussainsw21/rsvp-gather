const SESSION_KEY = "gather.organizer.session";
const EVENTS_KEY_PREFIX = "gather.organizer.events";

function getEventsKey(itsNo) {
  return `${EVENTS_KEY_PREFIX}.${itsNo}`;
}

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

export function getOrganizerEvents(itsNo) {
  const raw = window.localStorage.getItem(getEventsKey(itsNo));

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrganizerEvent(itsNo, eventRecord) {
  const existing = getOrganizerEvents(itsNo);
  const next = [eventRecord, ...existing].filter(
    (event, index, list) =>
      list.findIndex((entry) => entry.eventId === event.eventId) === index,
  );

  window.localStorage.setItem(getEventsKey(itsNo), JSON.stringify(next));
}
