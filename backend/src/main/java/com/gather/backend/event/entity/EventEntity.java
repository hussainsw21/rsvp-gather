package com.gather.backend.event.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventEntity {

    @Id
    private UUID id;

    private String title;

    private String description;

    private String location;

    private LocalDateTime eventTime;

    private LocalDateTime rsvpOpenAt;

    private LocalDateTime rsvpDeadline;

    private String shareToken;

    private String organizerItsNo;

    private LocalDateTime createdAt;
}