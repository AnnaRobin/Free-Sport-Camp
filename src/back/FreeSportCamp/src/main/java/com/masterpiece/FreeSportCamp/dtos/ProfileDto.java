package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;

import javax.validation.Constraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import com.masterpiece.FreeSportCamp.entities.Sex;
import org.hibernate.validator.constraints.SafeHtml;

public class ProfileDto {
	@SafeHtml
	private String presentation;
	
	@NotNull
	private Long cityId;
	
	private Sex sex;
	
	@NotBlank
	@Pattern(regexp = "^33[0-9]{9}$")
	private String phoneNumber;
	
	private LocalDate birthDate;
	
	public String getPresentation() {
		return presentation;
	}

	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}
	
	public Sex getSex() {
		return sex;
	}
	
	public void setSex(String sex) {
		switch(sex) {
			case "MALE":
				this.sex = Sex.MALE;
				break;
			case "FEMALE":
				this.sex = Sex.FEMALE;
				break;
		}
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
	
	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	
}
