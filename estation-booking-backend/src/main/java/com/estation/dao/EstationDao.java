package com.estation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.estation.model.Estation;
import com.estation.model.User;

public interface EstationDao extends JpaRepository<Estation,Integer>{

	@Query(value="select e from Estation e where e.user=:user")
	List<Estation> selectByUser(@Param(value="user") User user);
}
