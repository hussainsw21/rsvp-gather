package com.gather.backend.common.exception;

public class RsvpNotOpenYetException
        extends RuntimeException {

    public RsvpNotOpenYetException(
            String message
    ) {
        super(message);
    }
}
