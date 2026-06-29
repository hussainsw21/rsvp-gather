package com.gather.backend.event.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrganizerEventResponse(
        UUID eventId,
        String title,
        String location,
        LocalDateTime eventTime,
        LocalDateTime rsvpOpenAt,
        LocalDateTime rsvpDeadline,
        String shareToken
) {
}
