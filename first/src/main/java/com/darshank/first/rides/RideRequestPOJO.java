package com.darshank.first.rides;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class RideRequestPOJO {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String customer;

  private String driver;

  private String rideType;
  
  private String source;
  
  private String destination;
  
  private String status;
  
  private String booked_on_date;
  
  private String booked_on_time;
  
  private String cancelled_on_date;
  
  private String cancelled_on_time;

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
	
	public String getBooked_on_date() {
		return booked_on_date;
	}
	
	public void setBooked_on_date(String booked_on_date) {
		this.booked_on_date = booked_on_date;
	}
	
	public String getBooked_on_time() {
		return booked_on_time;
	}
	
	public void setBooked_on_time(String booked_on_time) {
		this.booked_on_time = booked_on_time;
	}
	
	public String getCancelled_on_date() {
		return cancelled_on_date;
	}
	
	public void setCancelled_on_date(String cancelled_on_date) {
		this.cancelled_on_date = cancelled_on_date;
	}
	
	public String getCancelled_on_time() {
		return cancelled_on_time;
	}
	
	public void setCancelled_on_time(String cancelled_on_time) {
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