package com.fullstack.todoapp.jwtsecurityconfigurations;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationResource {
	
	private final JwtTokenService jwtTokenService;
	private final AuthenticationManager authenticationManager;
	
	public JwtAuthenticationResource(JwtTokenService jwtTokenService,AuthenticationManager authenticationManager) {
		this.jwtTokenService=jwtTokenService;
		this.authenticationManager=authenticationManager;
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody JwtTokenRequest jwtTokenRequest ) {
		var authenticationtoken=new UsernamePasswordAuthenticationToken(jwtTokenRequest.username(), jwtTokenRequest.password());
		var authentication=authenticationManager.authenticate(authenticationtoken);
		var token=jwtTokenService.createToken(authentication);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
}
 record JwtTokenRequest(String username, String password) {}
record JwtResponse(String token) {} 