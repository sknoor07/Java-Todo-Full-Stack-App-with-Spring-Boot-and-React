package com.notes.notes.model.service;


import java.util.List;

import org.springframework.stereotype.Component;

import com.notes.notes.RepositoryJPA.UserRepository;
import com.notes.notes.model.Users;

@Component
public class UserDaoService {
	
	private UserRepository userRepository;
	
	
	
	public UserDaoService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	public List<Users> findAll(){
		return userRepository.findAll();
	}	
	
	public Users findOne(int id) {
		return userRepository.findById(id).orElse(null);
		
	}
	
	public Users save(Users user) {
		return userRepository.save(user);
	}

	public Users getUserByUsername(String username) {
		return userRepository.findByUsername(username);
		
	}
	

}
