package com.gather.backend.organizer.repository;

import com.gather.backend.organizer.entity.OrganizerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizerRepository
        extends JpaRepository<OrganizerEntity, String> {
}
