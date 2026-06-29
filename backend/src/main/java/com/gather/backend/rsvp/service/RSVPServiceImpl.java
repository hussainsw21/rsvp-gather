package com.gather.backend.rsvp.service;

import com.gather.backend.common.exception.EventNotFoundException;
import com.gather.backend.common.exception.RsvpDeadlinePassedException;
import com.gather.backend.common.exception.RsvpNotOpenYetException;
import com.gather.backend.event.entity.EventEntity;
import com.gather.backend.event.repository.EventRepository;
import com.gather.backend.rsvp.dto.EventSummaryResponse;
import com.gather.backend.rsvp.dto.RSVPResponse;
import com.gather.backend.rsvp.dto.SubmitRSVPRequest;
import com.gather.backend.rsvp.dto.SubmitRSVPResponse;
import com.gather.backend.rsvp.entity.RSVP;
import com.gather.backend.rsvp.entity.RSVPStatus;
import com.gather.backend.rsvp.repository.RSVPRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RSVPServiceImpl implements RSVPService {

    private final RSVPRepository rsvpRepository;
    private final EventRepository eventRepository;

    @Override
    public SubmitRSVPResponse submitRSVP(
            String shareToken,
            SubmitRSVPRequest request
    ) {

        EventEntity event =
                eventRepository.findByShareToken(shareToken)
                        .orElseThrow(
                                () -> new EventNotFoundException("Event not found")
                        );

        if (LocalDateTime.now()
                .isBefore(event.getRsvpOpenAt())) {

            throw new RsvpNotOpenYetException(
                    "RSVP submissions have not opened yet"
            );
        }

        if (LocalDateTime.now()
                .isAfter(event.getRsvpDeadline())) {

            throw new RsvpDeadlinePassedException(
                    "RSVP deadline has passed"
            );
        }

        RSVP existingRsvp =
                rsvpRepository.
                        findByEventIdAndItsNo(
                                event.getId(),
                                request.itsNo()
                        )
                        .orElse(null);

        if (existingRsvp != null) {

            existingRsvp.setAttendeeName(
                    request.name()
            );

            existingRsvp.setAttendeePhone(
                    request.phone()
            );

            existingRsvp.setAttendeeEmail(
                    request.email()
            );

            existingRsvp.setStatus(
                    request.status()
            );

            existingRsvp.setGuestCount(
                    request.guestCount()
            );

            existingRsvp.setComment(
                    request.comment()
            );

            existingRsvp.setUpdatedAt(
                    LocalDateTime.now()
            );

            rsvpRepository.save(existingRsvp);

            return new SubmitRSVPResponse(
                    existingRsvp.getId(),
                    "RSVP updated successfully"
            );
        }

        RSVP rsvp =
                RSVP.builder()
                        .id(UUID.randomUUID())
                        .eventId(event.getId())
                        .itsNo(request.itsNo())
                        .attendeeName(request.name())
                        .attendeePhone(request.phone())
                        .attendeeEmail(request.email())
                        .status(request.status())
                        .guestCount(request.guestCount())
                        .comment(request.comment())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

        rsvpRepository.save(rsvp);

        return new SubmitRSVPResponse(
                rsvp.getId(),
                "RSVP submitted successfully"
        );
    }

    @Override
    public List<RSVPResponse> getEventRSVPs(
            UUID eventId,
            RSVPStatus status
    ) {

        return rsvpRepository.findByEventId(eventId)
                .stream()
                .filter(rsvp ->
                        status == null || rsvp.getStatus() == status
                )
                .map(rsvp ->
                        new RSVPResponse(
                                rsvp.getItsNo(),
                                rsvp.getAttendeeName(),
                                rsvp.getAttendeePhone(),
                                rsvp.getAttendeeEmail(),
                                rsvp.getStatus(),
                                rsvp.getGuestCount(),
                                rsvp.getComment(),
                                rsvp.getUpdatedAt()
                        )
                )
                .toList();
    }

    @Override
    public EventSummaryResponse getEventSummary(
            UUID eventId
    ) {

        List<RSVP> rsvps =
                rsvpRepository.findByEventId(
                        eventId
                );

        long yesCount =
                rsvps.stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RSVPStatus.YES
                        )
                        .count();

        long noCount =
                rsvps.stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RSVPStatus.NO
                        )
                        .count();

        long maybeCount =
                rsvps.stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RSVPStatus.MAYBE
                        )
                        .count();

        int totalGuests =
                rsvps.stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RSVPStatus.YES
                        )
                        .mapToInt(r ->
                                r.getGuestCount() == null
                                        ? 0
                                        : r.getGuestCount()
                        )
                        .sum();

        return new EventSummaryResponse(
                yesCount,
                noCount,
                maybeCount,
                totalGuests
        );
    }
}