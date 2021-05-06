package ch.amphytrion.project.authentication;

import ch.amphytrion.project.authentication.dev_authentication.DevAuthenticationFilter;
import ch.amphytrion.project.authentication.dev_authentication.DevAuthenticationProvider;
import ch.amphytrion.project.authentication.google_authentication.GoogleAuthenticationFilter;
import ch.amphytrion.project.authentication.google_authentication.GoogleAuthenticationProvider;
import ch.amphytrion.project.authentication.jwt_authentication.JWTAuthorizationFilter;
import ch.amphytrion.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private static final String[] AUTH_WHITELIST = {
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**",
            SecurityConstants.SIGN_UP_URL_STUDENT,
            SecurityConstants.SIGN_UP_URL_HOST,
            "/**",
    };


    @Autowired
    private DevAuthenticationProvider devAuthenticationProvider;
    @Autowired
    private GoogleAuthenticationProvider googleAuthenticationProvider;
    private UserAuthService userAuthService;

    public WebSecurity(UserService userService) {
        this.userAuthService = new UserAuthService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest().authenticated()
                .and()
//                // Filter for authentication with DevToken
                .addFilterBefore(
                        new DevAuthenticationFilter(authenticationManager(), userAuthService.getUserService()),
                        BasicAuthenticationFilter.class
                )
                // Filter for authentication by GoogleOpenID
                .addFilterBefore(
                        new GoogleAuthenticationFilter(authenticationManager()),
                        BasicAuthenticationFilter.class
                )
                // Filter for authentication by JWT
//                .addFilter(new JWTAuthenticationFilter(authenticationManager(), userAuthService.getUserService()))
//                // Fitler for authorization by JWT
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), userAuthService.getUserService()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(devAuthenticationProvider).authenticationProvider(googleAuthenticationProvider).userDetailsService(userAuthService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
