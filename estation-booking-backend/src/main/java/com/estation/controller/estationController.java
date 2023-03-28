package com.estation.controller;

import java.util.List;

import com.estation.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estation.model.Estation;
import com.estation.model.User;
import com.estation.service.EstationService;

@RestController
@CrossOrigin(origins = {"*"}, allowedHeaders = "*",
allowCredentials = "false")
public class estationController {
	
	@Autowired
	private EstationService estationservice;

	@Autowired
	private OrderService orderService;
	
	
	@PostMapping(value= {"/addBooth/{noOfBooth}/{id}"})
	public String addUser(@RequestBody Estation e1,@PathVariable int  noOfBooth,@PathVariable  int id)
	{ 
		for(int i=1;i<=noOfBooth;i++)
		{
			Estation estation = new Estation();
			User user = new User();
			user.setUid(id);
			estation.setUser(user);
			estation.setStatus("on");
			estation.setType(e1.getType());
			estation.setPrice(e1.getPrice());
			estationservice.add(estation);
			
		}
		return "success";
	}
	
	
	@GetMapping(value= {"/changeBoothStatus/{boothid}"})
	public String changeBoothStatus(@PathVariable int boothid) {


		
		Estation estation = estationservice.getBooth(boothid);
			
			if(estation.getStatus().equals("on")) {
				
				estation.setStatus("of");
				
			}else {
				
				estation.setStatus("on");
			}
			
			estationservice.update(estation);
			
		
		return "success";

	}
		
	@DeleteMapping(value= {"/deleteBooth/{boothid}"})
	public String deleteBooth(@PathVariable int boothid) {

		orderService.removeByEstation(boothid);
			estationservice.remove(boothid);


			
		
		return "success";

	}
	
	
	@GetMapping(value= {"/getBoothDetails/{vid}"})
	public List<Estation> getBoothDetails(@PathVariable  int vid)
	{
		User user= new User();
		user.setUid(vid);
		
		return estationservice.getBoothDetails(user);
	}
	

}
