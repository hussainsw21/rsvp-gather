package com.gather.backend.rsvp.dto;

import com.gather.backend.rsvp.entity.RSVPStatus;

import java.time.LocalDateTime;

public record RSVPResponse(
        String itsNo,
        String attendeeName,
        String attendeePhone,
        String attendeeEmail,
        RSVPStatus status,
        Integer guestCount,
        String comment,
        LocalDateTime updatedAt
) {
}
