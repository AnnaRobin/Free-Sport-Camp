package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Anna Cuilhé
 * The Role class mapped to the database
 */
@Entity
@Table(name = "roles")
public class Role {

	@Id
	// id field is the primary key
    // The id is auto-incremented by database (identity):
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id",  nullable = false, length= 10, columnDefinition = "INT UNSIGNED") // Column specifications
	private Long id;

	@Column(name="code", length = 45, nullable = false, unique = true)
	private String code;

	/**
	 * A custom converter to convert entity {@code Boolean} attribute state into
     * database column representation and back again.
	 */
	@Convert(converter = BooleanConverter.class)
	@Column(name="default_role", length = 1, nullable = false)
	private boolean defaultRole = false;
	
	
	protected Role() {

	}

	public Role(String code) {
		setCode(code);
	}

	public Long getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	private void setCode(String code) {
		this.code = code;
	}

	public boolean isDefaultRole() {
		return defaultRole;
	}

	@Override
	public String toString() {
		return "{id=" + id + ", code=" + code + "}";
	}

}
