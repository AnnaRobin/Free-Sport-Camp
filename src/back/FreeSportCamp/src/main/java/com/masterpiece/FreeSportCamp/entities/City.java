package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name="cities")
public class City extends AbstractEntity{
	
	
	@Column(name="zipcode", nullable = false, length=45)
	private String zipCode;	
	
	protected City() {}
	public City(Long id) {
		this.setId(id); 
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
}
