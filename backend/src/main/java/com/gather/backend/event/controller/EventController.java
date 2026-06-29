package com.gather.backend.event.controller;

import com.gather.backend.event.dto.CreateEventRequest;
import com.gather.backend.event.dto.CreateEventResponse;
import com.gather.backend.event.dto.EventDetailsResponse;
import com.gather.backend.event.dto.OrganizerEventResponse;
import com.gather.backend.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<CreateEventResponse> createEvent(
            @RequestBody CreateEventRequest request
    ) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }

    @GetMapping("/organizer/{itsNo}")
    public ResponseEntity<List<OrganizerEventResponse>> getOrganizerEvents(
            @PathVariable String itsNo
    ) {
        return ResponseEntity.ok(eventService.getEventsByOrganizerItsNo(itsNo));
    }

    @GetMapping("/{shareToken}")
    public ResponseEntity<EventDetailsResponse>
    getEvent(
            @PathVariable String shareToken
    ){

        return ResponseEntity.ok(
                eventService.getEventByShareToken(
                        shareToken
                )
        );
    }
}
