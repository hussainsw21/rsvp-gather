package com.gather.backend.event.repository;

import com.gather.backend.event.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventRepository
        extends JpaRepository<EventEntity, UUID> {

    Optional<EventEntity> findByShareToken(
            String shareToken
    );
}