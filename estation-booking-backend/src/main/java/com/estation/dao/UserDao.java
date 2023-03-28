package com.estation.dao;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.estation.model.User;

public interface UserDao extends JpaRepository<User,Integer> {

	@Query(value = "select u from User u where u.type =:type and u.location=:location")
	public List<User> selectByTypeAndLocation(@Param(value="type") String type ,@Param(value="location")String location);

	@Query(value = "select u from User u where u.email=:email")
	public User selectByEmail(@Param(value="email")String email);
	
	@Query(value = "select u from User u where u.type =:type")
	public List<User> selectByType(@Param(value="type") String type);

	public Optional<User> findByEmail(String username);
	
	public boolean existsByEmail(String email);
}
