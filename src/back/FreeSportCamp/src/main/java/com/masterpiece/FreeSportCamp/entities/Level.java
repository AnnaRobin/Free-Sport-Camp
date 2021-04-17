package com.masterpiece.FreeSportCamp.entities;


import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="levels")
public class Level extends AbstractEntity {

	protected Level() {}
	public Level(Long id) {
		this.setId(id);
		
	}
	
}
