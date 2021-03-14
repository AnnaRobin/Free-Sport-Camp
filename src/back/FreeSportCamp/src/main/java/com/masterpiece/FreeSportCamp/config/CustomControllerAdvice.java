package com.masterpiece.FreeSportCamp.config;

import javax.validation.ConstraintViolationException;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomControllerAdvice extends ResponseEntityExceptionHandler{
	
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
