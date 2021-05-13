import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js';
import { AppComponent } from '../app.component';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart = [];
  show:boolean = true;
  public customerName:any = JSON.parse(localStorage.getItem("login")).username;
  public pickUpZipLabels:any = [];
  public pickUpZipCount:any = [];

  public dropZipLabels:any = [];
  public dropZipCount:any = [];

  public rideTypeLabels:any = [];
  public rideTypeCount:any = [];

  public bookedOnCount:any = [];
  public bookedOnLabel:any = [];

  public cancelledOnCount:any = [];
  public cancelledOnLabel:any = [];

  public ridesWithDriverCount:any = [];
  public driverLabels:any = [];

  constructor(private _service: WeatherService, private app: AppComponent, private http: RestService) { 
    this.http.getDataForDashboardDropZipCode({customername:this.customerName}).subscribe(
      (response)=>{
        console.log(response.json());
        var dataList1 = response.json();
        var keyArray= [];
        var valueArray = [];
        dataList1.forEach(element => {
          keyArray.push(element[1]);
          valueArray.push(element[0]);
        });
        this.pickUpZipLabels = keyArray;
        this.pickUpZipCount = valueArray;        

        this.http.getDataForDashboardPickupZipCode({customername:this.customerName}).subscribe(
          (response)=>{
            console.log(response.json());
            var dataList2 = response.json();
            var keyArray1= [];
            var valueArray1 = [];
            dataList2.forEach(element => {
              keyArray1.push(element[0]);
              valueArray1.push(element[1]);
            });
            this.dropZipLabels = keyArray1;
            this.dropZipCount = valueArray1;     
            
            this.http.getDataForDashboardBookingsOnDates({customername:this.customerName}).subscribe(
              (response)=>{
                console.log(response.json());
                var dataList4 = response.json();
                var keyArray3= [];
                var valueArray3 = [];
                dataList4.forEach(element => {
                  keyArray3.push(element[1]);
                  valueArray3.push(element[0]);
                });
                this.bookedOnLabel = keyArray3;
                this.bookedOnCount = valueArray3; 

                this.http.getDataForDashboardCancelledOnDates({customername:this.customerName}).subscribe(
                  (response)=>{
                    var dataList5 = response.json();
                    var keyArray4= [];
                    var valueArray4 = [];
                    dataList5.forEach(element => {
                      keyArray4.push(element[1]);
                      valueArray4.push(element[0]);
                    });
                    this.cancelledOnLabel = keyArray4;
                    this.cancelledOnCount = valueArray4;                                
                    this.http.getDataForDashboardRideTypes({customername:this.customerName}).subscribe(
                      (response)=>{
                        var dataList3 = response.json();
                        var keyArray2= [];
                        var valueArray2 = [];
                        dataList3.forEach(element => {
                          keyArray2.push(element[0]);
                          valueArray2.push(element[1]);
                        });
                        this.rideTypeLabels = keyArray2;
                        this.rideTypeCount = valueArray2;   
                        
                        this.http.getDataForDashboardRidesWithDrivers({customername:this.customerName}).subscribe(
                          (response)=>{
                            var dataList6 = response.json();
                            var keyArray5= [];
                            var valueArray5 = [];
                            dataList6.forEach(element=>{
                              keyArray5.push(element[0]);
                              valueArray5.push(element[1]);
                            })
                            this.ridesWithDriverCount = keyArray5;
                            this.driverLabels = valueArray5;                            
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
      },(error)=>{
        console.log(error);
      }
    )
  }
  
  ngAfterViewInit(){
    
  }

  ngOnInit() {

    setTimeout(() => {
      this.app.setLoggedIn();
      this.app.show();
    } , 0);
    this.show = true;
    this._service.dailyForecast()
      .subscribe(res => {
        
        //console.log(res);
        /*
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        */
        let temp_max = ['100','200','300','400','500','600','700','800'];
        let temp_min = ['10','20','30','40','50','60','70','80'];
        //let alldates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let alldates = [];
        let weatherDates = []
        alldates.forEach((res) => {
            var jsdate = new Date();
            weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });

        this.chart = new Chart('canvas', {
          type: 'polarArea',
          data: {
            datasets: [{
                data: this.bookedOnCount,                  
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.bookedOnLabel
        },
          options: {
          }
        });          

        this.chart = new Chart('canvas1', {
          type: 'polarArea',
          data: {
            datasets: [{
                data: this.cancelledOnCount,                  
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941'],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.cancelledOnLabel
        },
          options: {
          }
        });          

        this.chart = new Chart('canvas2', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.rideTypeLabels,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
            labels: this.rideTypeCount
        },
          options: {
          }
        });

        this.chart = new Chart('canvas3', {
          type: 'bar',
          data: {
              labels: this.pickUpZipLabels,
              datasets: [{
                  label: '# of Pickups from these Areas',
                  data: this.pickUpZipCount,
                  backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941'],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }        
        });


        this.chart = new Chart('canvas4', {
          type: 'bar',
          data: {
              labels: this.dropZipCount,
              datasets: [{
                  label: '# of Drops from these Areas',
                  data: this.dropZipLabels,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }        
        });



        this.chart = new Chart('canvas5', {
          type: 'pie',
          data: {
            datasets: [{
                data: this.ridesWithDriverCount,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
            labels: this.driverLabels
        },
          options: {
          }
        });
      this.show = false;
      },(error)=>{
        console.log(error);
      });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.app.hide();
    } , 0);
  }

}
