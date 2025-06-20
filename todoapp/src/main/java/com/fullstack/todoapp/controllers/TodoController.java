package com.fullstack.todoapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.todoapp.model.Todo;
import com.fullstack.todoapp.service.TodoService;

@RestController
public class TodoController {
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/basicauth")
	public String basicauthCheck(){
		return "Success";
	}
	
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

	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,@PathVariable int id, @RequestBody Todo todo) {
		todoService.updateTodo(todo);
		return ResponseEntity.ok(todo);
	}
	
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Todo> insertTodo(@PathVariable String username, @RequestBody Todo todo) {
		todoService.AddTodo(username,todo.getDescription(),todo.getTargetDate(),todo.isDone());
		return ResponseEntity.ok(todo);
	}
	
}
