package com.estation.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.estation.filter.JwtAuthFilter;
import com.estation.service.UserInfoDetailsService;


@Configuration
@EnableWebSecurity
public class SecurityConfig  {

	@Autowired
	private JwtAuthFilter jwtAuthFilter;
	
	 
//	    protected void configure(HttpSecurity http) throws Exception {    
//	        http
//	            .csrf().disable()
//	            .authorizeRequests()
//	                .anyRequest().permitAll();
//	        }
@Bean
public UserDetailsService userDetailsService ()
{
return new UserInfoDetailsService();
	}

@Bean
public PasswordEncoder passwordEncoder ()
{
	return new BCryptPasswordEncoder(10);
	}
 @Bean
public  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 

{	return http.cors().and().csrf().disable().authorizeRequests().antMatchers().hasRole("USER").antMatchers("/getAlluser/{type}","/deleteAccount/{id}").hasRole("ADMIN").antMatchers("/addBooth/{noOfBooth}/{id}","/changeBoothStatus/{boothid}","/deleteBooth/{boothid}","/confirmOrder/{id}").hasRole("VENDOR").antMatchers("/addUser","/getUser","/getSession","/getStation/{city}","addOrder/{uid}/{boothid}/{tid}/{vid}/{date}/{type}","/getOrders/{esid}/{tid}","/getOrder/{id}/{type}","/getBoothDetails/{vid}","/updateUser","/signout","/deleteAccount","/api/verifytoken","/checkEmailIsRegisteredOrNot/{email}","/forgotpassword/{email}/{newpass}").permitAll().anyRequest().authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authenticationProvider(authenticationProvider()).addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class).build();


}
 
 @Bean
 public AuthenticationProvider authenticationProvider()
 {
	 DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
	 authenticationProvider.setUserDetailsService(userDetailsService());
	 authenticationProvider.setPasswordEncoder(passwordEncoder());
	 return authenticationProvider;
 }

@Bean
public AuthenticationManager authenticatonManager(AuthenticationConfiguration config) throws Exception {
	return config.getAuthenticationManager();
}



}
