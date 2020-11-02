package com.masterpiece.FreeSportCamp.entities;

import java.time.LocalDateTime;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="users", indexes = {
		@Index(name = "users_city_id_IDX", columnList = "city_id" ),
		@Index(name = "users_role_id_IDX", columnList = "role_id")
		
})
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", columnDefinition = "INT UNSIGNED")
	private Long id;
	
	@Column(name="full_name",  nullable = false, length = 45)
	private String fullName;

	@Column(name="username", nullable = false, length = 45, unique = true)
	private String userName;
	
	@Column(name="email", nullable = false, length = 45, unique = true)
	private String email;

	@Column(name="password", nullable = false, length = 45)
	private String password;
	
    @Column(name="phone_number", length = 25)
	private String phoneNumber;
    
    @Column(name="birthdate")
    private LocalDateTime birthdate;
    
    @Column(name="sex")
    private Sex sex;
    

	@OneToOne
    @JoinColumn(nullable = false, name="city_id", foreignKey = @ForeignKey(name= "users_city_id_FK"))
    private City city;
    
    @OneToOne
    @JoinColumn(nullable = false, name="role_id", foreignKey = @ForeignKey(name="users_role_id_FK")) 
    private Role role;

	public User() {
		
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public LocalDateTime getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDateTime birthdate) {
		this.birthdate = birthdate;
	}



	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
		public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	
	
}
