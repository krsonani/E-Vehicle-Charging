package com.estation.service;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.estation.model.User;

public class UserInfoUserDetails  implements UserDetails{

	
	private User user;
	
	
	public UserInfoUserDetails (User user)
	{
		this.user=user;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		HashSet<GrantedAuthority> set = new HashSet<GrantedAuthority>();
		if(user.getType().equals("user"))
		{
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					return "ROLE_USER";
				}
			});
		}else if(user.getType().equals("vendor"))
		{
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					return "ROLE_VENDOR";
				}
			});
		}else
		{
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					return "ROLE_ADMIN";
				}
			});
		}
		return set;
	}

	@Override
	public String getPassword() {
		
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	
		return true;
	}

	@Override
	public boolean isEnabled() {
	
		return true;
	}

}
