package com.fullstack.todoapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.todoapp.model.Todo;
import com.fullstack.todoapp.service.TodoService;

@RestController
public class TodoController {
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/users/{username}/todos")
	public List<Todo> getTodos(@PathVariable String username){
		return todoService.findByUsername(username);
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
		return todoService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username,@PathVariable int id) {
		todoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
}
