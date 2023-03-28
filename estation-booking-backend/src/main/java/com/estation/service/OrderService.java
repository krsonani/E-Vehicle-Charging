package com.estation.service;


import java.util.List;

import com.estation.model.Orders;
import com.estation.model.User;

public interface OrderService{

	void add(Orders order);
	void remove(int oid);
	void update(Orders order);
	List<Orders> getOrders(User user, int tid);
	List<Orders> getOrder(User user);
	 Orders findOrder(int oid);

	 void removeByUser(User user);
	 void removeByVendor(User vendor);

	 void removeByEstation(int boothid);
}
