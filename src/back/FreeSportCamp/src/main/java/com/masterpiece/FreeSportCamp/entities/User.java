package com.masterpiece.FreeSportCamp.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


/**
 * @author Anna Cuilhé
 * The User class mapped to the database
 *
 */
@Entity
@Table(name="users", indexes = {
		@Index(name = "users_city_id_IDX", columnList = "city_id" )
		
})
public class User {

	@Id// id field is the primary key
    // The id is auto-incremented by database (identity):
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", nullable = false, length= 10,  columnDefinition = "INT UNSIGNED")
	private Long id;
	
	@Column(name="full_name",  nullable = false, length = 45)// Column specifications
	private String fullName;

	@Column(name="username", nullable = false, length = 45, unique = true)
	private String userName;
	
	@Column(name="email", nullable = false, length = 45, unique = true)
	private String email;

	@Column(name="password", nullable = false, length = 250)
	private String password;
	
    @Column(name="phone_number", length = 25)
	private String phoneNumber;
    
    @Column(name="birthdate")
    private LocalDate birthDate;
    
    @Column(name="sex")
    @Enumerated(EnumType.STRING)
    private Sex sex;
    
    @Column(name="presentation", length = 500)
    private String presentation;
    
    @Convert(converter = BooleanConverter.class)
    @Column(length = 1, nullable = false)
    private boolean enabled;
    
    // Many User to One City	
	@ManyToOne
    @JoinColumn(nullable = true, name="city_id", foreignKey = @ForeignKey(name= "users_city_id_FK"))
    private City city;
	
	// Many User to Many Event
	@ManyToMany
	@JoinTable(name = "participations", 
	  joinColumns = @JoinColumn(name = "user_id"), 
	  inverseJoinColumns = @JoinColumn(name = "event_id"))
	List<Event> subscribedEvents;
	
	
	/**
	 * Many User to Many Role 
	 * The EAGER strategy is a requirement on the persistenceprovider runtime that data must be eagerly fetched. 
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles", 
	    joinColumns = @JoinColumn(name = "user_id"),
	    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
	
	public User() {
		
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

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthdate(LocalDate birthDate) {
		this.birthDate = birthDate;
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
	
	public List<Event> getSubscribedEvents(){
		return this.subscribedEvents;
	}
	
	public User(Long id) {
		this.id=id;
	}
	  /**
     * Creates a new enabled custom user.
     *
     * @param password an encrypted password
     * @param username a unique userName
     * @param roles    some roles
     */
    public User(String password, String userName, Set<Role> roles) {
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
    public User(String password, String userName, Set<Role> roles,
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
			+ ", birthDate=" + birthDate + ", sex=" + sex 
			+ ", city=" + city + ", presentation=" + presentation +"}";
	
    }}
