package com.notes.notes.model.Controller;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notes.notes.model.Notes;
import com.notes.notes.model.Users;
import com.notes.notes.model.service.NotesDaoService;
import com.notes.notes.model.service.UserDaoService;

@RestController
public class NotesController {
	
	private UserDaoService userDaoService;
	private NotesDaoService notesDaoService;
	
	
	
	public NotesController(UserDaoService userDaoService, NotesDaoService notesDaoService) {
		super();
		this.userDaoService = userDaoService;
		this.notesDaoService= notesDaoService;
	}



	@GetMapping("/user/{id}/notes")
	public List<Notes> retrieveNotesForUser(@PathVariable int id){
		Users user= userDaoService.findOne(id);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+id);
		}
		return user.getNotes();
	}
	
	@PostMapping("/user/{id}/notes")
	public Notes creteNotesForUser(@PathVariable int id, @RequestBody Notes notes) {
		Users user= userDaoService.findOne(id);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+id);
		}
		notes.setUsers(user);
		return notesDaoService.save(notes);
	}
	
}
