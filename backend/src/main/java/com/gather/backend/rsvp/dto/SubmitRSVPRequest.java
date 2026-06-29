package com.gather.backend.rsvp.dto;

import com.gather.backend.rsvp.entity.RSVPStatus;

public record SubmitRSVPRequest(
        String itsNo,
        String name,
        String phone,
        String email,
        RSVPStatus status,
        Integer guestCount,
        String comment
) {
}