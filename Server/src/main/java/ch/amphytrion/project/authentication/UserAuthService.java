package ch.amphytrion.project.authentication;

import ch.amphytrion.project.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserAuthService implements UserDetailsService {

    private UserService userService;

    public UserAuthService(UserService userService){
        this.userService = userService;
    }

    public UserService getUserService(){
        return userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDetailsImpl(userService.findByUsername(username));
    }
}
