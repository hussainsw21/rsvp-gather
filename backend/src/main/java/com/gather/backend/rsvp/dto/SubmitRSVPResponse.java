package com.gather.backend.rsvp.dto;

import java.util.UUID;
public record SubmitRSVPResponse(
        UUID rsvpId,
        String message
) {
}
