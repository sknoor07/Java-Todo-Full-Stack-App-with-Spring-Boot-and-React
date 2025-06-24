package com.fullstack.todoapp.jwtsecurityconfigurations;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {
	
	private final JwtEncoder jwtEncoder;
	
	public JwtTokenService(JwtEncoder jwtEncoder) {
		this.jwtEncoder=jwtEncoder;
	}
	
	public  String createToken(Authentication authentication) {
		var claims=JwtClaimsSet.builder()
		.issuer("self")
		.issuedAt(Instant.now())
		.expiresAt(Instant.now().plusSeconds(60*15))
		.subject(authentication.getName())
		.claim("authorities", createScope(authentication))
		.build();
		JwtEncoderParameters parameters=JwtEncoderParameters.from(claims);
		return jwtEncoder.encode(parameters).getTokenValue();
	}
	
	private String createScope(Authentication authentication) {
		return authentication.getAuthorities().stream()
		        .map(GrantedAuthority::getAuthority)
		        .collect(Collectors.joining(" "));	
	}

}