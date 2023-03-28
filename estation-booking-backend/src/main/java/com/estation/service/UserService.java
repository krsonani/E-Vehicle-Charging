package com.estation.service;

import java.util.List;

import com.estation.model.User;

public interface UserService {
	
	void add(User user);
	void remove(int uid);
	void update(User user);
	List<User> getStation(String location);
	User getUser(String email);
	List<User> getAllUser(String type);
	boolean existsByEmail(String email);

	User getUserById(int id);

}
