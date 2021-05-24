package ch.amphytrion.project.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

/**
 * Custom exception class containing a message, a HTTP error code and a header
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
public class CustomException extends Throwable {
    public String message;
    public HttpStatus status;
    public HttpHeaders headers;
}
