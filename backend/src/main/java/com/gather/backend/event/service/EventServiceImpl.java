package com.gather.backend.event.service;

import com.gather.backend.common.exception.InvalidEventException;
import com.gather.backend.common.exception.OrganizerNotFoundException;
import com.gather.backend.common.exception.EventNotFoundException;
import com.gather.backend.event.dto.CreateEventRequest;
import com.gather.backend.event.dto.CreateEventResponse;
import com.gather.backend.event.dto.EventDetailsResponse;
import com.gather.backend.event.dto.OrganizerEventResponse;
import com.gather.backend.event.entity.EventEntity;
import com.gather.backend.event.repository.EventRepository;
import com.gather.backend.organizer.repository.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventServiceImpl
        implements EventService {
    private final EventRepository eventRepository;
    private final OrganizerRepository organizerRepository;

    @Override
    public CreateEventResponse createEvent(
            CreateEventRequest request
    ) {

        organizerRepository.findById(request.organizerItsNo())
                .orElseThrow(() -> new OrganizerNotFoundException("Organizer not found"));

        if (!request.rsvpDeadline().
                isBefore(request.eventTime())) {
            throw new InvalidEventException(
                    "RSVP deadline must be before event time"
            );

        }

        if (request.rsvpOpenAt().isAfter(request.rsvpDeadline())) {
            throw new InvalidEventException(
                    "RSVP start time must be before RSVP deadline"
            );
        }

        if (request.rsvpOpenAt().isAfter(request.eventTime())) {
            throw new InvalidEventException(
                    "RSVP start time must be before event time"
            );
        }

        EventEntity event =
                EventEntity.builder()
                        .id(UUID.randomUUID())
                        .title(request.title())
                        .description(request.description())
                        .location(request.location())
                        .eventTime(request.eventTime())
                        .rsvpOpenAt(request.rsvpOpenAt())
                        .rsvpDeadline(request.rsvpDeadline())
                        .shareToken(UUID.randomUUID().toString())
                        .organizerItsNo(request.organizerItsNo())
                        .createdAt(LocalDateTime.now())
                        .build();

        eventRepository.save(event);

        return new CreateEventResponse(
                event.getId(),
                event.getShareToken()
        );
    }

    public EventDetailsResponse getEventByShareToken(
            String shareToken
    ){
        EventEntity event =
                eventRepository.findByShareToken(shareToken)
                        .orElseThrow(
                                () -> new EventNotFoundException(
                                        "Event not found"
                                )
                        );

        return new EventDetailsResponse(
                event.getTitle(),
                event.getDescription(),
                event.getLocation(),
                event.getEventTime(),
                event.getRsvpOpenAt(),
                event.getRsvpDeadline()
        );
    }

    @Override
    public List<OrganizerEventResponse> getEventsByOrganizerItsNo(String itsNo) {
        organizerRepository.findById(itsNo)
                .orElseThrow(() -> new OrganizerNotFoundException("Organizer not found"));

        return eventRepository.findByOrganizerItsNoOrderByCreatedAtDesc(itsNo)
                .stream()
                .map(event -> new OrganizerEventResponse(
                        event.getId(),
                        event.getTitle(),
                        event.getLocation(),
                        event.getEventTime(),
                        event.getRsvpOpenAt(),
                        event.getRsvpDeadline(),
                        event.getShareToken()
                ))
                .toList();
    }
}