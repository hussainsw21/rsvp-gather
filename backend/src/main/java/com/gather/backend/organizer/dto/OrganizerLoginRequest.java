package com.gather.backend.organizer.dto;

public record OrganizerLoginRequest(
        String itsNo,
        String password
) {
}
