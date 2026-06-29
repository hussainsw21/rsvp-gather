CREATE TABLE rsvps (
    id UUID PRIMARY KEY,

    event_id UUID NOT NULL ,

    attendee_name VARCHAR(255) NOT NULL,

    attendee_phone VARCHAR(20),

    attendee_email VARCHAR(255),

    status VARCHAR(20) NOT NULL,

    guest_count INTEGER DEFAULT 0,

    comment TEXT,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_rsvp_event
           FOREIGN KEY (event_id)
           REFERENCES events(id)
);