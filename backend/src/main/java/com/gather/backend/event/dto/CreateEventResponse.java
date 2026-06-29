package com.gather.backend.event.dto;

import java.util.UUID;

public record CreateEventResponse(UUID eventId, String shareToken) {
}