package com.notes.notes.security;

import com.notes.notes.model.Users;
import com.notes.notes.model.service.UserDaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDaoService userDaoService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userDaoService.getUserByUsername(username);
        if (user == null) throw new UsernameNotFoundException("User not found: " + username);

        // NOTE: passwords in your data.sql are plain text; we'll accept plain text in dev using NoOpPasswordEncoder.
        return User.withUsername(user.getUsername())
                   .password(user.getPassword())
                   .roles("USER")
                   .build();
    }
}
