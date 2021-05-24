package ch.amphytrion.project.authentication.google_authentication;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.utils.AbstractMultiReadAuthenticationProcessingFilter;
import ch.amphytrion.project.authentication.utils.JwtUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
// verify user credential and asssign token
public class GoogleAuthenticationFilter extends AbstractMultiReadAuthenticationProcessingFilter {

    private AuthenticationManager authenticationManager;
    private static final String TEST_TOKEN = "tokenTest";

    @Autowired
    public GoogleAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(SecurityConstants.LOGIN_URL, authenticationManager);
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected boolean requiresAuthentication(HttpServletRequest req, HttpServletResponse res){
        if (res.getHeader(SecurityConstants.HEADER_STRING) != null) {
            return false;
        }
        if(new AntPathRequestMatcher(SecurityConstants.SIGN_UP_URL_STUDENT).matches(req)){
            return false;
        }
        //TODO : A check Alois - Ajout pour signup host
        if(new AntPathRequestMatcher(SecurityConstants.SIGN_UP_URL_HOST).matches(req)){
            return false;
        }
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String requestData = reader.lines().collect(Collectors.joining());
            JsonObject jsonBody =  new Gson().fromJson(requestData, JsonObject.class);
            return jsonBody != null && jsonBody.get("tokenID") != null;
        } catch (IOException e){
            return false;
        }
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            // Make DTO class to map request to
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String requestData = reader.lines().collect(Collectors.joining());
            JsonObject jsonBody =  new Gson().fromJson(requestData, JsonObject.class);
            return authenticationManager.authenticate(
                    new GoogleAuthenticationToken(
                            null,
                            jsonBody.get("tokenID").getAsString()
                    )
            );
        }catch (IOException  e ) {
            throw new AuthenticationCredentialsNotFoundException("Credentials not found");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(auth);
        JwtUtils.AddTokenWithSuccessfullAuthentication(req, res, chain, auth);
        chain.doFilter(req, res);
    }
}
