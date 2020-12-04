
package com.masterpiece.FreeSportCamp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.masterpiece.FreeSportCamp.entities.CustomUser;
@Repository
public interface MemberRepository extends JpaRepository<CustomUser, Long>{
	int countByUserName(String userName);

	int countByEmail(String email);
	
	
}
