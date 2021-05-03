package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity handleException(CustomException e) {
        return ResponseEntity
                .status(e.status)
                .headers(e.headers)
                .body(new ErrorResponse(e.message));
    }
}
