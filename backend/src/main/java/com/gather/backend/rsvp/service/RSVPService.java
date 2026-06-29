package com.gather.backend.rsvp.service;

import com.gather.backend.rsvp.dto.EventSummaryResponse;
import com.gather.backend.rsvp.dto.RSVPResponse;
import com.gather.backend.rsvp.dto.SubmitRSVPRequest;
import com.gather.backend.rsvp.dto.SubmitRSVPResponse;
import com.gather.backend.rsvp.entity.RSVPStatus;

import java.util.List;
import java.util.UUID;

public interface RSVPService {

    SubmitRSVPResponse submitRSVP(
            String shareToken,
            SubmitRSVPRequest request
    );

    List<RSVPResponse> getEventRSVPs(
            UUID eventId,
            RSVPStatus status
    );

    EventSummaryResponse getEventSummary(
            UUID eventId
    );
}