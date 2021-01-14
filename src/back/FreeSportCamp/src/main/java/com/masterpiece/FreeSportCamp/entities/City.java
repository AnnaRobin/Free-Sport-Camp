package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity

@Table(name="cities")
public class City extends AbstractEntity{
	
	
	@Column(name="zipcode", nullable = false,  length=45)
	private String zipCode;	
	
	public City() {}
	public City(Long id) {
		this.setId(id); 
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public class CityProxy extends City{
		
		public CityProxy(Long id) {
			super.id = id;
			
		}
		@Override
		public Long getId() {
			return super.getId();
		}
		@Override
		public String getName() {
			if(super.getName() == null) {
				
			}
			return super.getName();
		}
	}
}
