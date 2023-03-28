package com.estation.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Estation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bootid;
	private String Type;
	private double price;
	@Override
	public String toString() {
		return "Estation [boothid=" + bootid + ", Type=" + Type + ", price=" + price + ", user=" + user + ", status="
				+ status + "]";
	}
	@ManyToOne
	@JoinColumn(name="uid")
	private User user;
	private String status;
	public void setBootid(int bootid) {
		this.bootid = bootid;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getBootid() {
		return bootid;
	}
	
	
	

}
