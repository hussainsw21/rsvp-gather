package com.gather.backend.organizer.service;

import com.gather.backend.organizer.dto.OrganizerLoginRequest;
import com.gather.backend.organizer.dto.OrganizerLoginResponse;

public interface OrganizerService {
    OrganizerLoginResponse login(OrganizerLoginRequest request);
}
