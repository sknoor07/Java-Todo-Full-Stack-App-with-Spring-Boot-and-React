package com.notes.notes.model.Controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.notes.notes.model.Users;
import com.notes.notes.model.service.UserDaoService;

@RestController
public class UserController {
	
	private UserDaoService userDaoService;
	public UserController(UserDaoService userDaoService) {
		super();
		this.userDaoService = userDaoService;
	}

	@GetMapping("/users")
	public List<Users> getAllUsers(){
		return userDaoService.findAll();
		
	}
	
	@GetMapping("/users/{id}")
	public Users getUser(@PathVariable int id) {
		return userDaoService.findOne(id);
	}
	
	@PostMapping("/users")
	public ResponseEntity<Users> createUser(@RequestBody Users user) {
		Users users= userDaoService.save(user);
		URI uri= ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(users.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
