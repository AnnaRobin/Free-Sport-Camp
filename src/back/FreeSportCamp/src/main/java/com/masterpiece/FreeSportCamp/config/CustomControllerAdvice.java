package com.masterpiece.FreeSportCamp.config;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.http.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.masterpiece.FreeSportCamp.errors.ValidationError;

@RestControllerAdvice
public class CustomControllerAdvice extends ResponseEntityExceptionHandler{
	
	
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
		
		List<ObjectError> globalErrors = result.getGlobalErrors();
		for (ObjectError globalError : globalErrors) {
		    String object = globalError.getObjectName();
		    String code = globalError.getCode();
		    ValidationError validationError = new ValidationError(object, code);
		    validationErrors.add(validationError);
		}
		
		return super.handleExceptionInternal(ex, validationErrors, headers, status, request);
	}
	
	/*
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex,
			Object body,HttpHeaders headers,HttpStatus status,
			WebRequest request){
		return super.handleExceptionInternal(ex,body,headers,status,request);
	}
	*/
	
	@ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(javax.validation.ConstraintViolationException ex, WebRequest request) {
        return handleExceptionInternal(ex,null,null,HttpStatus.BAD_REQUEST,request);
    }

}
