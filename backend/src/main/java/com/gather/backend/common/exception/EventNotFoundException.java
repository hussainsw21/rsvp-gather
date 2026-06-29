package com.gather.backend.common.exception;

public class EventNotFoundException
        extends RuntimeException {
    public EventNotFoundException(String message) {
        super(message);
    }

}
