package com.gather.backend.event.service;

import com.gather.backend.event.dto.CreateEventRequest;
import com.gather.backend.event.dto.CreateEventResponse;
import com.gather.backend.event.dto.EventDetailsResponse;

public interface EventService {
    CreateEventResponse createEvent(CreateEventRequest request);
    EventDetailsResponse getEventByShareToken(String shareToken);
}