package com.estation.service;

import java.util.List;

import com.estation.model.Estation;
import com.estation.model.User;

public interface EstationService {
	
	void add(Estation estation);
	void remove(int esid);
	void update(Estation estation);
	List<Estation> getBoothDetails(User vendor);
	Estation getBooth(int boothid);

}
