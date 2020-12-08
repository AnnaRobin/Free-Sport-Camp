package com.masterpiece.FreeSportCamp.errors;

public class ValidationError {
	private final String object;
	private final String attribute;
	private final String code;


public ValidationError (String object, String attribute, String code) {
	 this.object = object;
	 this.attribute = attribute;
	 this.code = code;
		
	}

public String getObject() {
	return object;
}

public String getAttribute() {
	return attribute;
}

public String getCode() {
	return code;
}




}
