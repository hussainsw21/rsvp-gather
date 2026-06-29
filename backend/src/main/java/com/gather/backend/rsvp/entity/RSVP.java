package com.gather.backend.rsvp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "rsvps",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_event_its",
                        columnNames = {
                                "eventId",
                                "itsNo"
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RSVP {

    @Id
    private UUID id;

    private UUID eventId;

    private String itsNo;

    private String attendeeName;

    private String attendeePhone;

    private String attendeeEmail;

    @Enumerated(EnumType.STRING)
    private RSVPStatus status;

    private Integer guestCount;

    private String comment;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}