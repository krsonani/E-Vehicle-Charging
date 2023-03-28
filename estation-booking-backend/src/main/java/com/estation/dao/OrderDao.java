package com.estation.dao;

import java.util.List;

import com.estation.model.Estation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.estation.model.Orders;
import com.estation.model.User;

public interface OrderDao extends JpaRepository<Orders,Integer>
{
	
	@Query(value = "select u from Orders u where u.vendor =:vendor and u.tid=:tid")
	public List<Orders> selectByVendorAndTid(@Param(value="vendor") User vendor ,@Param(value="tid")int tid);

	
	@Query(value = "select u from Orders u where u.user =:user")
	public List<Orders> selectByUser(@Param(value="user") User user);
	
	@Query(value = "select u from Orders u where u.vendor =:vendor")
	public List<Orders> selectByVendor(@Param(value="vendor") User vendor);

	public void deleteByUser(User user);

	public  void deleteByVendor(User vendor);

	public void deleteByBooth(Estation booth);
	
}
