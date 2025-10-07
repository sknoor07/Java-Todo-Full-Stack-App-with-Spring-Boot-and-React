package com.notes.notes.model.Controller;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping("/basicauth")
	public String basicAuth() {
		return "Success";
	}



	@GetMapping("/user/{id}/notes")
	public List<Notes> retrieveNotesForUser(@PathVariable int id){
		Users user= userDaoService.findOne(id);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+id);
		}
		return user.getNotes();
	}
	
	@GetMapping("/user/{userid}/note/{noteid}")
	public Notes retrieveNoteForUser(@PathVariable int userid, @PathVariable int noteid){
		Users user= userDaoService.findOne(userid);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+userid);
		}
		List<Notes>notes=user.getNotes();
		return notes.stream().filter((note)->note.getId()==noteid).findFirst().orElse(null);
		
	}
	
	@PostMapping("/user/{userid}/notes")
	public Notes createNotesForUser(@PathVariable int userid, @RequestBody Notes notes) {
		Users user= userDaoService.findOne(userid);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+userid);
		}
		notes.setUsers(user);
		notes.setUsername(user.getUsername());
		return notesDaoService.save(notes);
	}
	
	@PutMapping("/user/{userid}/note/{noteid}")
	public Notes updateNotesForUser(@PathVariable int userid ,@PathVariable int noteid, @RequestBody Notes note) {
		Users user= userDaoService.findOne(userid);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+userid);
		}
		note.setUsers(user);
		note.setId(noteid);
		note.setUsername(user.getUsername());
		return notesDaoService.save(note);
	}
	
	@DeleteMapping("/user/{userid}/notes/{noteid}")
	public Notes deleteNotesForUser(@PathVariable int userid,@PathVariable int noteid) {
		Users user= userDaoService.findOne(userid);
		if(user==null) {
			throw new RuntimeErrorException(null, "User Not Found"+userid);
		}
		return notesDaoService.delete(noteid);
	}
	
	
	
}
