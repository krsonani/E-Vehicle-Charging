package com.estation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.estation.dao.UserDao;
import com.estation.model.User;

@Repository
public class UserServiceImpl implements UserService {
	
	

	@Autowired
	private  UserDao userdao;
	
	@Override
	public void add(User user) {
		userdao.save(user);
		
		
	}

	@Override
	public void remove(int uid) {
		userdao.deleteById(uid);
		
		
	}

	@Override
	public void update(User user) {
		userdao.save(user);
		
	}
	
	public List<User> getStation(String location) 
	{
		return  userdao.selectByTypeAndLocation("vendor",location);
		
	}

	@Override
	public User getUser(String email) {
		return  userdao.selectByEmail(email);
	}

	@Override
	public List<User> getAllUser(String type) {
		
		return userdao.selectByType(type);
	}

	@Override
	public boolean existsByEmail(String email) {
		return userdao.existsByEmail(email);
	}

	@Override
	public User getUserById(int id) {
		Optional<User> user= userdao.findById(id);
		return  user.get();
	}

}
