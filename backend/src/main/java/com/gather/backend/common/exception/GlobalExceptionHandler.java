package com.gather.backend.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            EventNotFoundException.class
    )
    public ResponseEntity<Map<String, String>>
    handleEventNotFound(
            EventNotFoundException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        Map.of(
                                "message",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(
            InvalidEventException.class
    )
    public ResponseEntity<Map<String, String>>
    handleInvalidEvent(
            InvalidEventException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "message",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(
            RsvpNotOpenYetException.class
    )
    public ResponseEntity<Map<String, String>>
    handleRsvpNotOpenYet(
            RsvpNotOpenYetException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "message",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(
            RsvpDeadlinePassedException.class
    )
    public ResponseEntity<Map<String, String>>
    handleDeadlinePassed(
            RsvpDeadlinePassedException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "message",
                                ex.getMessage()
                        )
                );
    }
}