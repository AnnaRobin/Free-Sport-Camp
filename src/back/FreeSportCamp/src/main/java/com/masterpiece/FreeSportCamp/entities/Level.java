package com.masterpiece.FreeSportCamp.entities;


import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="levels")
public class Level extends AbstractEntity {

	public Level() {}
	public Level(Long id) {
		this.setId(id);
		
	}
	
}
