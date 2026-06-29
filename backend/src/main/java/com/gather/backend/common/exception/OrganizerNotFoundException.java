package com.gather.backend.common.exception;

public class OrganizerNotFoundException
        extends RuntimeException {

    public OrganizerNotFoundException(String message) {
        super(message);
    }
}
