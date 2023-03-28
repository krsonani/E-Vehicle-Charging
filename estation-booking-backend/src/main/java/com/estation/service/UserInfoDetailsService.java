package com.estation.service;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.estation.dao.UserDao;
import com.estation.model.User;

@Service
@Transactional
public class UserInfoDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userdao;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
	   
		User user = userdao.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Invalid Email id"));
		System.out.println(user.getEmail()+" "+user.getType());
		return	new UserInfoUserDetails(user);
	}

}