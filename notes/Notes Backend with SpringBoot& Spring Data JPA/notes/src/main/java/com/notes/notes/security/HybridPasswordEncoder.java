package com.notes.notes.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class HybridPasswordEncoder implements PasswordEncoder {

    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    @Override
    public String encode(CharSequence rawPassword) {
        // All new passwords get BCrypt
        return bcrypt.encode(rawPassword);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (encodedPassword == null) return false;

        String ep = encodedPassword;
        // detect BCrypt hash pattern
        if (ep.startsWith("$2a$") || ep.startsWith("$2b$") || ep.startsWith("$2y$")) {
            return bcrypt.matches(rawPassword, ep);
        } else {
            // legacy plaintext comparison
            return rawPassword.toString().equals(ep);
        }
    }
}
