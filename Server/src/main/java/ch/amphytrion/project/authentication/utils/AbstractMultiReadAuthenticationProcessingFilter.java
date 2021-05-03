package ch.amphytrion.project.authentication.utils;

import me.jvt.multireadservlet.MultiReadHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class AbstractMultiReadAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {
    protected AbstractMultiReadAuthenticationProcessingFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    protected AbstractMultiReadAuthenticationProcessingFilter(RequestMatcher requiresAuthenticationRequestMatcher) {
        super(requiresAuthenticationRequestMatcher);
    }

    protected AbstractMultiReadAuthenticationProcessingFilter(String defaultFilterProcessesUrl, AuthenticationManager authenticationManager) {
        super(defaultFilterProcessesUrl, authenticationManager);
    }

    protected AbstractMultiReadAuthenticationProcessingFilter(RequestMatcher requiresAuthenticationRequestMatcher, AuthenticationManager authenticationManager) {
        super(requiresAuthenticationRequestMatcher, authenticationManager);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        MultiReadHttpServletRequest wrappedRequest =
                new MultiReadHttpServletRequest((HttpServletRequest) request);
        super.doFilter(wrappedRequest, (HttpServletResponse)response, chain);
    }

}
