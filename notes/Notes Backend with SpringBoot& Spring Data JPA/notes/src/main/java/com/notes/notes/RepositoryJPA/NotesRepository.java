package com.notes.notes.RepositoryJPA;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.model.Notes;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Integer>{

}
