import { Injectable } from '@angular/core';
import { Http,ResponseContentType } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private loginData:any = {};  
  constructor(private http: Http) {
      this.loginData = localStorage.getItem("login")  
  }

  SignUp(signUpData){
    return this.http.post("http://localhost:8080/rideshareapi/Register",signUpData,{withCredentials: true});
  }  
  signIn(signInData){
    return this.http.post("http://localhost:8080/rideshareapi/Login", signInData);
  }

  getAllRides(data){
    console.log(data);
    return this.http.post("http://localhost:8080/rideshareapi/rides/getAllForCustomer", data);    
  }

  // getAllRides(){
  //   return this.http.get("http://localhost:8080/rideshareapi/rides/all");    
  // }

  getAllRidesForAdmin(){
    return this.http.get("http://localhost:8080/rideshareapi/GetAllRides");        
  }
  getAllRidesForDriver(driver){
    return this.http.post("http://localhost:8080/rideshareapi/rides/getAllForDriver", driver);    
  }
  getAllDrivers(){
    return this.http.get("http://localhost:8080/rideshareapi/drivers/all");    
  }
  bookACab(rideDetails){
    return this.http.post("http://localhost:8080/rideshareapi/rides/saveRide", rideDetails);
  }
  cancelRide(rideDetails){
    return this.http.post("http://localhost:8080/rideshareapi/CancelRide", rideDetails);    
  }  
  getDataForDashboardDropZipCode(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardDropZipCode", customerName);        
  }
  getDataForDashboardPickupZipCode(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardPickupZipCode", customerName);        
  }
  getDataForDashboardBookingsOnDates(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardBookingsOnDates", customerName);        
  }
  getDataForDashboardCancelledOnDates(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardCancelledOnDates", customerName);        
  }
  getDataForDashboardRideTypes(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardRideTypes", customerName);        
  }
  getDataForDashboardRidesWithDrivers(customerName){
    return this.http.post("http://localhost:8080/rideshareapi/rides/dashboardRidesWithDrivers", customerName);        
  }
  getDriversInformation(){
    return this.http.get("http://localhost:8080/rideshareapi/drivers/all");    
  }
  getEstimatedPrice(rideDetails){
    console.log(rideDetails);
    return this.http.post("http://localhost:5555/estimate_fare/api/v1/get_fare_estimate", rideDetails);
  }
  UpdateUserRating(ratingSetails){
    return this.http.post("http://localhost:8080/rideshareapi/UpdateUserRating", ratingSetails);        
  }
  getDriverDashboardData(driverName){
    return this.http.post("http://localhost:8080/rideshareapi/DriverDashboard", driverName);        
  }
  registerDriver(driverDetails){
    return this.http.post("http://localhost:8080/rideshareapi/Register", driverDetails);            
  }
  registerUser(userDetails){
    return this.http.post("http://localhost:8080/rideshareapi/Register", userDetails);                
  }
  searchBasedOnDriver(searchDetails){
    return this.http.post("http://localhost:8080/rideshareapi/rides/getAllRidesForCustomerByDriver", searchDetails);                    
  }
}

/*curl -X POST -d "{"username":"maneeshd","password":"qwerty","usertype":"customer"}" http://104.194.106.22:80/rideshare/Login*/
