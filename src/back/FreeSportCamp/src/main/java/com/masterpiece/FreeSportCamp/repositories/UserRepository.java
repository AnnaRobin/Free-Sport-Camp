package com.masterpiece.FreeSportCamp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
