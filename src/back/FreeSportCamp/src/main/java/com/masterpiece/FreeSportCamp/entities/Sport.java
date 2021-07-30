package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author Anna Cuilhé 
 * The Sport class mapped to the database
 *
 */
@Entity
@Table(name = "sports")
public class Sport extends AbstractEntity {

	protected Sport() {

	}

	public Sport(Long id) {
		this.setId(id);
	}

}
