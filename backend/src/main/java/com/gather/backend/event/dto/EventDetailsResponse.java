package com.gather.backend.event.dto;

import java.time.LocalDateTime;
public record EventDetailsResponse(
        String title,
        String description,
        String location,
        LocalDateTime eventTime,
        LocalDateTime rsvpOpenAt,
        LocalDateTime rsvpDeadline
) {
}
