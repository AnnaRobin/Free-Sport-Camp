package com.masterpiece.FreeSportCamp.entities;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="users", indexes = {
		@Index(name = "users_city_id_IDX", columnList = "city_id" )
		
})
public class CustomUser {

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
    
    @Column(name="presentation")
    private String presentation;
    
    @Convert(converter = BooleanConverter.class)
    @Column(length = 1, nullable = false)
    private boolean enabled;
    


	@OneToOne
    @JoinColumn(nullable = false, name="city_id", foreignKey = @ForeignKey(name= "users_city_id_FK"))
    private City city;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles", 
	    joinColumns = @JoinColumn(name = "user_id"),
	    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
    
	public CustomUser() {
		
	}
	
	
	public String getPresentation() {
		return presentation;
	}

	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
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
	
    public boolean isEnabled() {
		return enabled;
	}


	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	  /**
     * Creates a new enabled custom user.
     *
     * @param password an encrypted password
     * @param username a unique userName
     * @param roles    some roles
     */
    public CustomUser(String password, String userName, Set<Role> roles) {
	this(password, userName, roles, true);
    }

    /**
     * Creates a new custom user.
     *
     * @param password an encrypted password
     * @param username a unique userName
     * @param roles    some roles
     * @param enabled  {@code true} if enabled; {@code false} otherwise
     */
    public CustomUser(String password, String userName, Set<Role> roles,
    		boolean enabled) {
	this.password = password;
	this.userName = userName;
	this.roles = roles;
	this.enabled = enabled;
	
    }
	
    @Override
    public String toString() {
	// password=[PROTECTED] for not displaying in logs
	return "{id=" + id + ", userName=" + userName
			+ ", password=[PROTECTED], roles=" + roles + ", enabled="
			+ enabled + ", fullName=" + fullName
			+ ", email=" + email
			+ ", phoneNumber=" + phoneNumber
			+ ", birthbade=" + birthdate + ", sex=" + sex 
			+ ", city=" + city + ", presentation=" + presentation +"}";
	
	
    }}
