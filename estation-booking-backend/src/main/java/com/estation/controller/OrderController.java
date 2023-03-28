package com.estation.controller;


import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estation.model.Estation;
import com.estation.model.Orders;
import com.estation.model.User;
import com.estation.service.OrderService;

import javax.transaction.Transactional;

@RestController
@CrossOrigin(origins = {"*"}, allowedHeaders = "*",
allowCredentials = "false")
public class OrderController {
	
	@Autowired
	private OrderService orderservice;
	
	@GetMapping(value= {"addOrder/{uid}/{boothid}/{tid}/{vid}/{date}/{type}"})
	public String addOrder(@PathVariable int uid, @PathVariable int boothid,@PathVariable  int tid ,@PathVariable int vid, @PathVariable String date, @PathVariable String type) 
	{
		User user = new User();
		user.setUid(uid);
		User vendor = new User();
		vendor.setUid(vid);
		Estation estation = new Estation();
		estation.setBootid(boothid);
		Orders order = new Orders();
	    order.setUser(user);
	    order.setBooth(estation);
	    order.setTid(tid);
	    order.setVendor(vendor)	;  
	    order.setOrderDate(date);
	    if(type.equals("user"))
	    order.setStatus("Pending");
	    else
	    order.setStatus("Confirmed");	
	    orderservice.add(order);
		return "sucess";
	}
	
	@GetMapping(value= {"/getOrders/{esid}/{tid}"})
	public List<Orders> getOrders(@PathVariable  int esid,@PathVariable  int tid)
	{
		User user= new User();
				user.setUid(esid);
		
		return orderservice.getOrders(user, tid);
	}
	
	@GetMapping(value= {"/getOrder/{id}/{type}"})
	public List<Orders> getOrder(@PathVariable int id,@PathVariable String type)
	{
		User user= new User();
				user.setUid(id);
				user.setType(type);
				return	orderservice.getOrder(user);
	}
	
	@GetMapping(value = {"/confirmOrder/{id}"})
	public String confirmOrder(@PathVariable int id)
	{
		
		Orders order = orderservice.findOrder(id);
		order.setStatus("Confirmed");
		orderservice.update(order);
		return "sucess";		
	}
	
	
}
