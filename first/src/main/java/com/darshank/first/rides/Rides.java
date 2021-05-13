package com.darshank.first.rides;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Rides {
  @Id
  private Integer id;

  private String customer;

  private String driver;

  private String rideType;
  
  private String source;
  
  private String destination;
  
  private String status;
  
  private LocalTime booked_on_date;
  
  private LocalDate booked_on_time;
  
  private Date cancelled_on_date;
  
  private Time cancelled_on_time;

  private String cancel_reason;
  
  private Double distance;
  
  private Double price;
  
  private int dropzipcode;
  
  private int pickupzipcode;

  private int userRating;
  
  private int driverRating;

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getCustomer() {
		return customer;
	}
	
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	
	public String getDriver() {
		return driver;
	}
	
	public void setDriver(String driver) {
		this.driver = driver;
	}
	
	public String getRideType() {
		return rideType;
	}
	
	public void setRideType(String ride_type) {
		this.rideType = ride_type;
	}
	
	public String getSource() {
		return source;
	}
	
	public void setSource(String source) {
		this.source = source;
	}
	
	public String getDestination() {
		return destination;
	}
	
	public void setDestination(String destination) {
		this.destination = destination;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public LocalTime getBooked_on_date() {
		return booked_on_date;
	}
	
	public void setBooked_on_date(LocalTime localTime) {
		this.booked_on_date = localTime;
	}
	
	public LocalDate getBooked_on_time() {
		return booked_on_time;
	}
	
	public void setBooked_on_time(LocalDate localDate) {
		this.booked_on_time = localDate;
	}
	
	public Date getCancelled_on_date() {
		return cancelled_on_date;
	}
	
	public void setCancelled_on_date(Date cancelled_on_date) {
		this.cancelled_on_date = cancelled_on_date;
	}
	
	public Time getCancelled_on_time() {
		return cancelled_on_time;
	}
	
	public void setCancelled_on_time(Time cancelled_on_time) {
		this.cancelled_on_time = cancelled_on_time;
	}
	
	public String getCancel_reason() {
		return cancel_reason;
	}
	
	public void setCancel_reason(String cancel_reason) {
		this.cancel_reason = cancel_reason;
	}
	
	public Double getDistance() {
		return distance;
	}
	
	public void setDistance(Double distancee) {
		this.distance = distancee;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public int getDropzipcode() {
		return dropzipcode;
	}
	
	public void setDropzipcode(int dropzipcode) {
		this.dropzipcode = dropzipcode;
	}
	
	public int getPickupzipcode() {
		return pickupzipcode;
	}
	
	public void setPickupzipcode(int pickupzipcode) {
		this.pickupzipcode = pickupzipcode;
	}
	
	public int getUserRating() {
		return userRating;
	}
	
	public void setUserRating(int userRating) {
		this.userRating = userRating;
	}
	
	public int getDriverRating() {
		return driverRating;
	}
	
	public void setDriverRating(int driverRating) {
		this.driverRating = driverRating;
	}
	  
  
}