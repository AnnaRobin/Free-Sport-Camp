package com.masterpiece.FreeSportCamp.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.masterpiece.FreeSportCamp.errors.ValidationError;

@RestControllerAdvice
public class ControllerAdvice extends ResponseEntityExceptionHandler {
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request){
		BindingResult result = ex.getBindingResult();
		List<FieldError> fieldErrors = result.getFieldErrors();
		List <ValidationError> validationErrors = new ArrayList<>();
		for (FieldError fieldError : fieldErrors) {
			String object = fieldError.getObjectName();
			String attribute = fieldError.getField();
			String code = fieldError.getCode();
			ValidationError validationError = new ValidationError(object, attribute, code);
			validationErrors.add(validationError);
		}
		
		return super.handleExceptionInternal(ex, validationErrors, headers, status, request);
	}

}
