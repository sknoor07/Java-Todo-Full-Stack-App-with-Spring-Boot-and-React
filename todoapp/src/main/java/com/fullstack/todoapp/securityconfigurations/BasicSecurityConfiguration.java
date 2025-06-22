package com.fullstack.todoapp.securityconfigurations;


import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class BasicSecurityConfiguration {
	@SuppressWarnings("removal")
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return 
				http
				.authorizeHttpRequests(auth-> auth.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll().anyRequest().authenticated())
				.httpBasic(Customizer.withDefaults())
				.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.csrf().disable()
				.build();
	}
	
	/*
	 * @Bean public DataSource dataSource() { return new
	 * EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).addScript(
	 * JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION).build(); }
	 */
	
	@Bean
	public UserDetailsService userDetailsService(DataSource dataSource) {
		var admin=User.withUsername("Noor Alam").password("{noop}1234").roles("ADMIN").build();
		var user=User.withUsername("Pratham Thummar").password("{noop}1234").roles("User").build();
		var jdbcUserDetailsManager=new JdbcUserDetailsManager(dataSource);
		if (!jdbcUserDetailsManager.userExists(admin.getUsername())) {
	        jdbcUserDetailsManager.createUser(admin);
	    }

	    if (!jdbcUserDetailsManager.userExists(user.getUsername())) {
	        jdbcUserDetailsManager.createUser(user);
	    }
		return jdbcUserDetailsManager;
	}
}
