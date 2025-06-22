package com.fullstack.todoapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

import com.fullstack.todoapp.model.Todo;
import com.fullstack.todoapp.repository.TodoRepository;

@Service
public class TodoService {
	private TodoRepository todoRepository;
	
	public TodoService(TodoRepository todoRepository) {
		this.todoRepository= todoRepository;
	}
	//private static List<Todo> todos= new ArrayList<Todo>();
	//private static int todosCount=0;
	
//	static {
//		todos.add(new Todo(++todosCount,"Noor Alam","Get Full Stack Project done",LocalDate.now().plusWeeks(10),false));
//		todos.add(new Todo(++todosCount,"Noor Alam","Go to india",LocalDate.now().plusMonths(2),false));
//		todos.add(new Todo(++todosCount,"Rohan Dhanani","Get Marriage done",LocalDate.now().plusMonths(3),false));
//		todos.add(new Todo(++todosCount,"Pratham Thummar","Get to Paris",LocalDate.now().plusMonths(8),false));
//		todos.add(new Todo(++todosCount,"Kishan ","Just Earn Money",LocalDate.now(),true));
//	}
	
	public List<Todo> findByUsername(String username){
		return todoRepository.findByUsername(username);
	}
	
	public  Todo AddTodo(String username, String description, LocalDate targetDate, boolean done ) {
		Todo todo= new Todo(username,description,targetDate,done);
		todoRepository.save(todo);
		return todo;
	}
	
	public void deleteById(int id) {
		todoRepository.deleteById(id);	
	}
	
	public Todo findById(int id) {
		return todoRepository.findById(id).orElse(null);
		
	}
	
	public void updateTodo(Todo todo) {
		todoRepository.save(todo);
	}
}
