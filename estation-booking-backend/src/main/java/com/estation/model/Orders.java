package com.estation.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int oid;
    @ManyToOne
    @JoinColumn(name="uid")
	private User user;
    @ManyToOne
    @JoinColumn(name="esid")
	private User vendor;
    @OneToOne
    @JoinColumn(name="boothid")
    private Estation booth;
    private int tid;
    @Column(columnDefinition = "varchar(1000)")
    private String orderDate;
    private double totalPrice;
    private String status;
    
   
    public String getOrderDate() {
		return orderDate;
	}

	public void setOid(int oid) {
		this.oid = oid;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public int getOid() {
		return oid;
	}
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public User getVendor() {
		return vendor;
	}
	public void setVendor(User vendor) {
		this.vendor = vendor;
	}
	public Estation getBooth() {
		return booth;
	}
	public void setBooth(Estation booth) {
		this.booth = booth;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


}
