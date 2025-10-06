package com.notes.notes.model.service;


import java.util.ArrayList;
import java.util.List;

import com.notes.notes.model.Users;

public class UserDaoService2 {
	
	private static List<Users> users = new ArrayList<>();
	private static int usersCount=0;
	
	static {
		users.add(new Users(++usersCount,"Noor Alam","1111"));
		users.add(new Users(++usersCount,"Pratham Thummar","1111"));
		users.add(new Users(++usersCount,"Saud","1111"));
	}
	
	public List<Users> findAll(){
		return users;
	}	
	
	public Users findOne(int id) {
		return users.stream().filter(user->user.getId()==id).findFirst().orElse(null);
	}
	
	public Users save(Users user) {
		user.setId(++usersCount);
		this.users.add(user);
		return user;
	}
	

}
