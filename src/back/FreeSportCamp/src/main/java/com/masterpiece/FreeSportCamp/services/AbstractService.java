package com.masterpiece.FreeSportCamp.services;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.config.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractService {
	/**
	 * ModelMapper - Performs object mapping, maintains {@link Configuration} and
	 * stores {@link TypeMap TypeMaps}.
	 */
	@Autowired
	private ModelMapper mapper;

	protected AbstractService() {

	}

	protected final ModelMapper getMapper() {
		return mapper;
	}

}
