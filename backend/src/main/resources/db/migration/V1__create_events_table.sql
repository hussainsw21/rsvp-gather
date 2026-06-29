CREATE TABLE events(
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    event_time TIMESTAMP NOT NULL,
    rsvp_deadline TIMESTAMP NOT NULL,
    share_token VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL
);