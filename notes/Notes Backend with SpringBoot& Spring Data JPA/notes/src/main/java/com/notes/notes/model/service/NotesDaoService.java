package com.notes.notes.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.notes.notes.RepositoryJPA.NotesRepository;
import com.notes.notes.RepositoryJPA.UserRepository;
import com.notes.notes.model.Notes;
import com.notes.notes.model.Users;

@Component
public class NotesDaoService {
private NotesRepository notesRepository;
	
	
	
	public NotesDaoService(NotesRepository notesRepository) {
		super();
		this.notesRepository = notesRepository;
	}

	public List<Notes> findAll(){
		return notesRepository.findAll();
	}	
	
	public Notes Notes (int id) {
		return notesRepository.findById(id).orElse(null);
		
	}
	
	public Notes save(Notes notes) {
		return notesRepository.save(notes);
	}
}
