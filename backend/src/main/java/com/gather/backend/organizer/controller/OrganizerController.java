package com.gather.backend.organizer.controller;

import com.gather.backend.organizer.dto.OrganizerLoginRequest;
import com.gather.backend.organizer.dto.OrganizerLoginResponse;
import com.gather.backend.organizer.service.OrganizerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class OrganizerController {

    private final OrganizerService organizerService;

    @PostMapping("/login")
    public ResponseEntity<OrganizerLoginResponse> login(
            @RequestBody OrganizerLoginRequest request
    ) {
        return ResponseEntity.ok(organizerService.login(request));
    }
}
