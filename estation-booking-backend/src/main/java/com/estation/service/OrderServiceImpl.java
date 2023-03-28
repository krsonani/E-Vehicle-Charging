package com.estation.service;

import java.util.List;
import java.util.Optional;

import com.estation.model.Estation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.estation.dao.OrderDao;
import com.estation.model.Orders;
import com.estation.model.User;

import javax.transaction.Transactional;

@Repository
@Transactional

public class OrderServiceImpl implements OrderService{

	@Autowired
	private  OrderDao orderdao;
	private Integer oid;
	@Override
	public void add(Orders order) {
		orderdao.save(order);
		
	}

	@Override
	public void remove(int oid) {
		orderdao.deleteById(oid);
		
	}

	@Override
	public void update(Orders order) {
		orderdao.save(order);
		
	}

	@Override
	public List<Orders> getOrders(User esid, int tid) {
		
		return  orderdao.selectByVendorAndTid(esid,tid);
	}
	
	@Override
	public List<Orders> getOrder(User user) {
		
		System.out.println(user.getType());
		if(user.getType().equals("user"))
		{
			return  orderdao.selectByUser(user);
		}
		else
		{
			return  orderdao.selectByVendor(user);
		}		
	}
	
	@Override
	public Orders findOrder(int oid)
	{
		   Optional<Orders> order= orderdao.findById(oid);
		   return order.get();
	}

	@Override
	public void removeByUser(User user) {
		orderdao.deleteByUser(user);
	}

	@Override
	public void removeByVendor(User vendor) {
		orderdao.deleteByVendor(vendor);
	}

	@Override
	public void removeByEstation(int boothid) {
		Estation booth = new Estation();
		booth.setBootid(boothid);
		orderdao.deleteByBooth(booth);
	}


}
