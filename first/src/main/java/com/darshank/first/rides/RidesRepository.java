package com.darshank.first.rides;
import com.darshank.first.rides.*;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
import org.springframework.data.repository.query.Param;

public interface RidesRepository extends CrudRepository<Rides, Integer> {

	@Query("Select r from Rides r where customer = :ride")
	public List<Rides> getRidesForParticularCustomer(String ride);

	@Query("Select r from Rides r where driver = :ride")
	public List<Rides> getRidesForParticularDriver(String ride);

	@Query("Select r from Rides r where customer = :customer and driver=:driver")
	public List<Rides> getAllRidesForCustomerByDriver(String customer, String driver);


	@Query(nativeQuery = true,value="select count(*) as dropsTo, dropzipcode from rides where customer = :ride group by dropzipcode order by dropsTo desc limit 5")
	public List<Object> getDashboardDataForCustomerDropZipcode(String ride);

	@Query(nativeQuery = true,value="select count(*) as pickupsFrom, pickupzipcode from rides where customer=:ride group by pickupzipcode order by pickupsFrom desc limit 5")
	public List<Object> dashboardPickupZipCode(String ride);

	@Query(nativeQuery = true,value="select count(*),ride_type from rides where customer=:ride group by ride_type;")
	public List<Object> getDashboardDataForRydeTypes(String ride);

	@Query(nativeQuery = true,value="select count(*) as bookedOnCount, DATE_FORMAT(booked_on_date, '%e %b, %Y') as booked_on_date from rides where customer=:ride group by booked_on_date order by bookedOnCount  desc")
	public List<Object> getDashboardDataForCustomerBookingsOnDates(String ride);

	@Query(nativeQuery = true,value="select count(*) as cancelledOn, DATE_FORMAT(cancelled_on_date, '%e %b, %Y') as cancelled_on_date from rides where customer=:ride and cancelled_on_date is not null group by cancelled_on_date order by cancelledOn desc")
	public List<Object> getDashboardDataForCustomerCancelledOnDates(String ride);

	@Query(nativeQuery = true,value="select count(*) as count, driver from rides where customer=:ride group by driver order by `count` desc limit 5")
	public List<Object> getDashboardDataForCustomerRidesWithDrivers(String ride);

}