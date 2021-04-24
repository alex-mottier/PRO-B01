package ch.amphytrion.project.authentication.utils;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.google_authentication.GoogleAuthenticationToken;
import ch.amphytrion.project.entities.databaseentities.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Writer;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtils {



    public static void AddTokenWithSuccessfullAuthentication(HttpServletRequest req,
                                                             HttpServletResponse response,
                                                             FilterChain chain,
                                                             Authentication auth){
        String token = makeHeaderToken(((User) auth.getPrincipal()).getUsername());

        response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
    }

    public static String makeHeaderToken(String username){
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
    }
}
