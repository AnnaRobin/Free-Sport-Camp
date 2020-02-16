
package com.masterpiece.FreeSportCamp.repositoires;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.masterpiece.FreeSportCamp.entities.Member;
@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{

}
