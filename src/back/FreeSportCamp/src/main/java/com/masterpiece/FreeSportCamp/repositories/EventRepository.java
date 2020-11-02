package com.masterpiece.FreeSportCamp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.entities.Event;



public interface EventRepository extends JpaRepository<Event, Long>{

}
