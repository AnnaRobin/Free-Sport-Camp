package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * @author Anna Cuilhé
 * Designates a class whose mapping information is applied to the entities that inherit from it.
 * A mapped superclass has no separate table defined for it.
 */
@MappedSuperclass
public abstract class AbstractEntity {
	
	
	@Id // id field is the primary key
    // The id is auto-incremented by database (identity):
	@GeneratedValue(strategy = GenerationType.IDENTITY)   
	@Column(name="id", nullable = false, length= 10, columnDefinition = "INT UNSIGNED") // Column specifications
	private Long id;
	
	@Column(name="name", nullable = false, length=45)
	private String name;

	protected AbstractEntity() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}	
}
