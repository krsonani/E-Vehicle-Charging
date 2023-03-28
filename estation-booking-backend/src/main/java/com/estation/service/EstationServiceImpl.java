package com.estation.service;

import java.util.List;
import java.util.Optional;

import org.aspectj.weaver.loadtime.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.estation.dao.EstationDao;
import com.estation.model.Estation;
import com.estation.model.User;

@Repository
public class EstationServiceImpl implements EstationService{

	@Autowired
	private  EstationDao estationdao;
	@Override
	public void add(Estation estation) {
		estationdao.save(estation);
		
	}
	@Override
	public void remove(int esid) {
		estationdao.deleteById(esid);
		
	}

	@Override
	public void update(Estation estation) {
		estationdao.save(estation);
		
	}
	@Override
	public List<Estation> getBoothDetails(User vendor) {
		
		return estationdao.selectByUser(vendor);
	}
	
	@Override
	public Estation getBooth(int boothid) {
		Optional<Estation> estation = estationdao.findById(boothid);
		return estation.get();
	}

}
