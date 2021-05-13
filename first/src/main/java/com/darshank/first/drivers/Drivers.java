package com.darshank.first.drivers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Drivers {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String username;

  private String email;

  private String password;
  
  private String phone;
  
  private Double rating;
  
  private String car;
  
  private String license;
  
  private String car_image;

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public Double getRating() {
	return rating;
}

public void setRating(Double rating) {
	this.rating = rating;
}

public String getCar() {
	return car;
}

public void setCar(String car) {
	this.car = car;
}

public String getLicense() {
	return license;
}

public void setLicense(String license) {
	this.license = license;
}

public String getCar_image() {
	return car_image;
}

public void setCar_image(String car_image) {
	this.car_image = car_image;
}
  
  
}