package com.gather.backend.rsvp.controller;

import com.gather.backend.rsvp.dto.EventSummaryResponse;
import com.gather.backend.rsvp.dto.RSVPResponse;
import com.gather.backend.rsvp.dto.SubmitRSVPRequest;
import com.gather.backend.rsvp.dto.SubmitRSVPResponse;
import com.gather.backend.rsvp.entity.RSVPStatus;
import com.gather.backend.rsvp.service.RSVPService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/public/events")
@RequiredArgsConstructor
public class RSVPController {

    private final RSVPService rsvpService;

    @PostMapping("/{shareToken}/rsvp")
    public ResponseEntity<SubmitRSVPResponse> submitRSVP(
            @PathVariable String shareToken,
            @RequestBody SubmitRSVPRequest request
    ) {

        return ResponseEntity.ok(
                rsvpService.submitRSVP(
                        shareToken,
                        request
                )
        );
    }

    @GetMapping("/dashboard/{eventId}")
    public ResponseEntity<List<RSVPResponse>>
    getEventRSVPs(
            @PathVariable UUID eventId,
            @RequestParam(required = false)
            RSVPStatus status
    ) {

        if (status != null) {
            return ResponseEntity.ok(
                    rsvpService.getEventRSVPs(
                            eventId,
                            status
                    )
            );
        }

        return ResponseEntity.ok(
                rsvpService.getEventRSVPs(
                        eventId,
                        null
                )
        );
    }

    @GetMapping("/dashboard/{eventId}/summary")
    public ResponseEntity<EventSummaryResponse>
    getEventSummary(
            @PathVariable UUID eventId
    ) {

        return ResponseEntity.ok(
                rsvpService.getEventSummary(
                        eventId
                )
        );
    }
}