package ch.amphytrion.project.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
public class CustomException extends Throwable {
    public String message;
    public HttpStatus status;
    public HttpHeaders headers;
}
