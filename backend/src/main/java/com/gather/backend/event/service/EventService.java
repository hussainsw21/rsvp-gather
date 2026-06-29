package com.gather.backend.event.service;

import com.gather.backend.event.dto.CreateEventRequest;
import com.gather.backend.event.dto.CreateEventResponse;
import com.gather.backend.event.dto.EventDetailsResponse;
import com.gather.backend.event.dto.OrganizerEventResponse;

import java.util.List;

public interface EventService {
    CreateEventResponse createEvent(CreateEventRequest request);
    EventDetailsResponse getEventByShareToken(String shareToken);
    List<OrganizerEventResponse> getEventsByOrganizerItsNo(String itsNo);
}