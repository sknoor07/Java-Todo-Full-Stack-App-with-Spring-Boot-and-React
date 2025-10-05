package com.notes.notes.RepositoryJPA;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{
	Users findByUsername(String username);
}
