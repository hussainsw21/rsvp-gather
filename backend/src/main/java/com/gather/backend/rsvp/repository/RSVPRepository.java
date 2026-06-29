package com.gather.backend.rsvp.repository;

import com.gather.backend.rsvp.entity.RSVP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface RSVPRepository
        extends JpaRepository<RSVP, UUID> {
    List<RSVP> findByEventId(UUID eventId);
    Optional<RSVP> findByEventIdAndItsNo(
            UUID eventID,
            String itsNo
    );
}