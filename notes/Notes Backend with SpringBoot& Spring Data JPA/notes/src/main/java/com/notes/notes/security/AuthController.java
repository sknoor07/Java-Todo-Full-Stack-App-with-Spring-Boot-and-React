package com.notes.notes.security;

import java.net.URI;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.notes.notes.model.Users;
import com.notes.notes.model.service.UserDaoService;
import com.notes.notes.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsService userDetailsService; // MyUserDetailsService
    @Autowired private JwtUtil jwtUtil; // or JwtUtilRsa
    @Autowired private UserDaoService userDaoService;
    @Autowired private PasswordEncoder passwordEncoder;

    // Register - always encrypt new passwords
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody Users user) {
        // if password already looks like bcrypt, just save, otherwise encrypt
        String pw = user.getPassword() == null ? "" : user.getPassword();
        if (!pw.startsWith("$2a$") && !pw.startsWith("$2b$") && !pw.startsWith("$2y$")) {
            user.setPassword(passwordEncoder.encode(pw));
        }
        Users saved = userDaoService.save(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    // Authenticate - lazy migration: verify, upgrade legacy plaintext -> bcrypt, then generate JWT
    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthRequest request) throws Exception {
        Users user = userDaoService.getUserByUsername(request.getUsername());
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        // 1) Verify password using hybrid encoder
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        // 2) If legacy plaintext, upgrade to BCrypt and save
        if (!user.getPassword().startsWith("$2a$") && !user.getPassword().startsWith("$2b$") && !user.getPassword().startsWith("$2y$")) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userDaoService.save(user);
            // Optional: log upgrade
            System.out.println("🔒 Password upgraded for user: " + user.getUsername());
        }

        // 3) (Optional) authenticate via AuthenticationManager so any other providers run
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        // 4) generate token
        UserDetails ud = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(ud.getUsername());

        return ResponseEntity.ok(Map.of("token", token, "userid", user.getId()));
    }
}

// small DTO
class AuthRequest {
    private String username;
    private String password;
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }
}
