package com.gather.backend.organizer.service;

import com.gather.backend.common.exception.InvalidCredentialsException;
import com.gather.backend.organizer.dto.OrganizerLoginRequest;
import com.gather.backend.organizer.dto.OrganizerLoginResponse;
import com.gather.backend.organizer.entity.OrganizerEntity;
import com.gather.backend.organizer.repository.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizerServiceImpl implements OrganizerService {

    private final OrganizerRepository organizerRepository;

    @Override
    public OrganizerLoginResponse login(OrganizerLoginRequest request) {
        OrganizerEntity organizer = organizerRepository.findById(request.itsNo())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid ITS number or password"));

        if (!organizer.getPassword().equals(request.password())) {
            throw new InvalidCredentialsException("Invalid ITS number or password");
        }

        return new OrganizerLoginResponse(organizer.getItsNo());
    }
}
