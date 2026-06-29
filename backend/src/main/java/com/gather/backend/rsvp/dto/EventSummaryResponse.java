package com.gather.backend.rsvp.dto;

public record EventSummaryResponse(
        long yesCount,
        long noCount,
        long maybeCount,
        int totalGuests
) {
}
