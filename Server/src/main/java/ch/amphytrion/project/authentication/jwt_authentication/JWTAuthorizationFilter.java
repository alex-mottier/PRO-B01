package ch.amphytrion.project.authentication.jwt_authentication;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

// verify tokens and provide authorizations
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    protected UserService userService;

    public JWTAuthorizationFilter(AuthenticationManager authManager, UserService userService) {
        super(authManager);
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        try {
            JWTAuthorizationToken authentication = getAuthentication(req);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(req, res);
        } catch (TokenExpiredException e){
            return;
        }
    }

    // Reads the JWT from the Authorization header, and then uses JWT to validate the token
    private JWTAuthorizationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
            if (token != null) {
                // parse the token.
                String username = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()))
                        .build()
                        .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                        .getSubject();

                if (username != null) {
                    // new arraylist means authorities
                    User user = userService.findByUsername(username);
                    return new JWTAuthorizationToken(user, null, new ArrayList<>());
                }
            }
        return null;
    }
}
