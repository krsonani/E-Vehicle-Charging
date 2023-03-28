package com.estation.controller;

import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.estation.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.estation.dto.UserLoginResponce;
import com.estation.model.User;
import com.estation.service.JwtService;
import com.estation.service.UserService;

@RestController

 @CrossOrigin(origins = {"*"}, allowedHeaders = "*",
  allowCredentials = "false")

public class UserController {

	
	@Autowired
	private  UserService userservice;
	@Autowired
	private OrderService orderService;
	@Autowired
	private PasswordEncoder encorder;
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping(value= {"/addUser"})
	public String addUser( @RequestBody User user)
	{ 
		user.setPassword(encorder.encode(user.getPassword()));
		userservice.add(user);
		return "success";	

	}
	@PutMapping(value= {"/updateUser"})
	public String updateUser(@RequestBody User user)
	{
		user.setPassword(encorder.encode(user.getPassword()));
		System.out.println(user);
		userservice.update(user);
		return "success";

	}

	
	@GetMapping(value= {"/getStation/{city}"})
	public List<User> getStationDetails(@PathVariable String city)
	{
		return userservice.getStation(city);
		 
	}
	
	@PostMapping(value= {"/getUser"})
	public ResponseEntity<?> getUserDetails(@RequestBody User user) 
	{
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				user.getEmail(), user.getPassword());
		System.out.println(authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = authenticationManager.authenticate(authToken);
			User userAuth = userservice.getUser(user.getEmail());
			// => auth succcess
		//System.out.println(authenticatedDetails);
			
			System.out.println(userAuth.getEmail()+" "+userAuth.getPassword());
			return ResponseEntity
					.ok(new UserLoginResponce(userAuth,jwtService.genrateToken(user.getEmail())));
		} catch (Exception e) { 
			System.out.println("hi");// lab work : replace this by a method in global exc handler
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@GetMapping(value= {"/getSession"})
	public User getSession(HttpServletRequest request )
	{
		String token=null;
		String username=null;
		User usersession=null;
		String authHeader= request.getHeader("Authorization");
		System.out.println(authHeader);
		if(authHeader!=null && authHeader.startsWith("Bearer "))
		{
			System.out.println("hello");
			token=authHeader.substring(7);
			username =jwtService.extractUsername(token);
		}

		if(username!=null)
		{
			usersession = userservice.getUser(username);
		}
		return usersession;
	}
	@GetMapping(value= {"/signout"})
	public String signoutUser()
	{

		return "sucess";
	}
	
	@PostMapping(value= {"/deleteAccount"})
	public String deleteAccount(@RequestBody User user) 
	{
		if(user.getType().equals("vendor"))
		{
			orderService.removeByVendor(user);
		}else
		{
			orderService.removeByUser(user);
		}
		 userservice.remove(user.getUid());
		 return "sucess";
	}
	
	@PostMapping(value= {"/changeAvailibilty"})
	public String changeAvailibilty(@RequestBody User user)
	{
		System.out.println(user.getStatus());
		if(user.getStatus().equals("on"))
	    user.setStatus("off");
		else
		user.setStatus("on");
		
	    userservice.update(user);
	    
		return "sucess";	
	}
	
	
	@GetMapping(value= {"/getAlluser/{type}"})
	public List<User> getAllUser(@PathVariable String type)
	{
		return userservice.getAllUser(type);
	}
	
	@DeleteMapping (value= {"/deleteAccount/{id}"})
	public String deleteUser(@PathVariable int id )
	{
		User user = userservice.getUserById(id);

		if(user.getType().equals("vendor"))
		{
			orderService.removeByVendor(user);
		}else
		{
			orderService.removeByUser(user);
		}

		 userservice.remove(id);
		 return "sucess";
	}
	
	@GetMapping(value= {"/api/verifytoken"})
	public ResponseEntity<?>  varifyToken(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("hi");
		String token=null;
		String authHeader= request.getHeader("Authorization");
		System.out.println(authHeader);
		if(authHeader!=null && authHeader.startsWith("Bearer "))
		{
			System.out.println("hello");
			token=authHeader.substring(7);	
		}
	     boolean bool=	jwtService.isTokenExpired(token);
	     System.err.println(bool);
		 if(!bool)
		 {
			 return ResponseEntity.ok(null);
		 }else
		 {
			 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		 }
		
	}
	
	@GetMapping(value= {"/checkEmailIsRegisteredOrNot/{email}"})
	public String checkEmailAvailability(@PathVariable String email) {
		
		if(userservice.existsByEmail(email) == true) {
			
			return "found";
		}
		return "not found";
		
	}

		@PostMapping(value = {"/forgotpassword/{email}/{newpass}"})
	public String forgotPassword(@PathVariable String email,@PathVariable String newpass)
	{
		User user=userservice.getUser(email);
		user.setPassword(encorder.encode(newpass));
		userservice.update(user);
		return "sucess";
	}

	
	
}
