package com.masterpiece.FreeSportCamp.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractService {
	   @Autowired
	    private ModelMapper mapper;

	    protected AbstractService() {
		
	    }

	    protected final ModelMapper getMapper() {
		return mapper;
	    }

}
