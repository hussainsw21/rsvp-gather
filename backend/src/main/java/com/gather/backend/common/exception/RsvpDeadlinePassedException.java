package com.gather.backend.common.exception;

public class RsvpDeadlinePassedException
        extends RuntimeException {

    public RsvpDeadlinePassedException(
            String message
    ) {
        super(message);
    }
}