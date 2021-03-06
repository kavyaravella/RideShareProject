var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { OrderPageComponent } from '../order-page/order-page.component';
import { Subject } from 'rxjs/Subject';
import Swal from 'sweetalert2';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
var ELEMENT_DATA = [];
var OrderComponent = /** @class */ (function () {
    function OrderComponent(order, service, http, rout) {
        this.order = order;
        this.service = service;
        this.http = http;
        this.rout = rout;
        this.displayedColumns = ['select', 'orderNumber', 'amount', 'sellerId', 'bankerId', 'createdDate', 'status', 'transaction'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.toolTip = "Submit the Order";
        this.buttonType = "done";
        this.searchParams = {};
        this.loadGridSpinner = true;
        if (JSON.parse(localStorage.getItem("login")).role === 'seller') {
            this.toolTip = "Approve the Order and create an Invoice  ";
        }
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // loadData
        this.getOrders();
        this.changing.subscribe(function (v) {
            console.log("tab changed" + v);
            // refresh grid on tab change
            _this.reloadGrid();
        });
    };
    OrderComponent.prototype.viewTransaction = function (i) {
        console.log(i);
        localStorage.setItem('ViewTransactionsAssetData', JSON.stringify(i));
        this.rout.navigate(['/timeline']);
    };
    OrderComponent.prototype.getOrders = function () {
        var _this = this;
        this.service.getAllOrders().subscribe(function (res) {
            console.log(res.json());
            var orders = res.json().orders;
            for (var i = 0; i < orders.length; i++) {
                var createdDate = orders[i].created.split('T')[0];
                var sellerId = orders[i].seller.split('#')[1];
                var bankerId = orders[i].banker.split('#')[1];
                orders[i].sellerId = sellerId;
                orders[i].bankerId = bankerId;
                orders[i].createdDate = createdDate;
                orders[i].status = orders[i].statusMessage;
                orders[i].disabled = false;
                if (orders[i].statusCode === 3) {
                    orders[i].disabled = true;
                }
            }
            _this.dataSource = new MatTableDataSource(orders);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(orders);
        }, function (error) {
            console.log(error);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    OrderComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    OrderComponent.prototype.submitOrder = function (order) {
        var _this = this;
        /*    if(order.statusCode === 3 ){
                Swal(
                  'Order Already Submitted',
                ).then((newResult)=>{
                  if(newResult.value){
                  }
                })
            }else{
        */ if (JSON.parse(localStorage.getItem('login')).role === "buyer") {
            console.log(order);
            Swal({
                title: 'Submit a purchase order?',
                text: 'This\'ll Submit the purchase order you have created!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    console.log(order);
                    var placeOrder = {};
                    for (var i = 0; i < order.items.length; i++) {
                        delete order.items[i].$class;
                    }
                    placeOrder.items = order.items;
                    placeOrder.seller = order.sellerId;
                    placeOrder.id = order.orderNumber;
                    console.log(placeOrder);
                    _this.http.placeOrder(placeOrder).subscribe(function (response) {
                        console.log(response.json());
                        Swal('Purchase Order Submitted', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                            if (newResult.value) {
                                _this.reloadGrid();
                            }
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A PO isn\'t submitted yet', 'error');
                }
            });
        }
        else if (JSON.parse(localStorage.getItem('login')).role === "seller") {
            Swal({
                title: 'Approve the Order and Create an Invoice?',
                text: 'This\'ll Approve and create an Invoice !',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Okay',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    console.log(order);
                    var approveOrderData = {};
                    approveOrderData.$class = "io.aeries.art.order.RequestShipping";
                    approveOrderData.orderNumber = order.orderNumber;
                    for (var i = 0; i < order.items.length; i++) {
                        delete order.items[i].$class;
                    }
                    approveOrderData.items = order.items;
                    _this.http.approveOrder(approveOrderData).subscribe(function (response) {
                        console.log("Response from approveOrderData");
                        console.log(response);
                        _this.http.createInvoice(approveOrderData).subscribe(function (response) {
                            Swal('Invoice Created', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                                if (newResult.value) {
                                    _this.reloadGrid();
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A Invoice isn\'t Created yet', 'error');
                }
            });
        }
        /*    }*/
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    OrderComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    OrderComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
        this.order.addTab(row.orderNumber, 'detail');
    };
    OrderComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    OrderComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    OrderComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getOrders(); // send filter parameters along
    };
    OrderComponent.prototype.addNewOrderTab = function () {
        this.order.addTab(null, 'new');
    };
    OrderComponent.prototype.orderSearch = function (searchParams) {
        console.log(searchParams);
        this.http.searchOrders(searchParams).subscribe(function (response) {
            console.log(response.json());
        }, function (error) {
            console.log(error);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], OrderComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], OrderComponent.prototype, "sort", void 0);
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], OrderComponent.prototype, "paginator", void 0);
    OrderComponent = __decorate([
        Component({
            selector: 'app-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.scss']
        }),
        __metadata("design:paramtypes", [OrderPageComponent, RestService, RestService, Router])
    ], OrderComponent);
    return OrderComponent;
}());
export { OrderComponent };
//# sourceMappingURL=order.component.js.map