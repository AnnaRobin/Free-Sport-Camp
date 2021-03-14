package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.NotNull;

public class EventEditorDto extends EventCreatorDto{
	
	public EventEditorDto() {}
	public EventEditorDto(@NotNull long id) {
		
		this.id = id;
	}

	@NotNull
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	

}
