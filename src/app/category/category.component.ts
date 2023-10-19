import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ListService } from '../list.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  StateList: any = [];
  CityList: any = [];
  ngState: any;
  ShowCity: any = [];
  TalukList: any = [];
  ShowTaluk: any = [];
  ngCity: any;
  ngCar: any;
  ModelList: any = [];
  ShowModelsList: any = [];
  ngTaluk: any;
  ngModel: any;
  GridList: any = [];
  constructor(public Service: ListService) { }


  ngOnInit(): void {
    this.getCountryList();
    this.GetCityList();
    this.GetVillages();
    this.getCarModels();
  }

  getCountryList() {
    this.Service.GetState().subscribe((res: any) => {
      this.StateList = res;
    })
  }

  GetCityList() {
    this.Service.GetCity().subscribe((res: any) => {
      this.CityList = res;
    })
  }

  GetCityChange() {

    this.ShowCity = [];
    let Result = this.CityList.filter((x: any) => x.StateId == this.ngState);
    this.ShowCity.push(Result);
  }

  GetVillages() {
    this.Service.getVillages().subscribe((res: any) => {
      this.TalukList = res;
    })
  }

  ChangeTaluk() {
    this.ShowTaluk = [];
    let Result = this.TalukList.filter((x: any) => x.CityId == this.ngCity);
    this.ShowTaluk.push(Result);
  }

  getCarModels() {
    this.Service.getCarModel().subscribe((res: any) => {
      console.log(res, "card");
      this.ModelList = res;
    })
  }

  ShowModels() {
    this.ShowModelsList = [];
    let findModel = this.ModelList.filter((x: any) => x.brand == this.ngCar);
    this.ShowModelsList.push(findModel);
  }


  Submit() {
    if (this.isValid()) {
      var obj = {
        "State": this.ngState,
        "City": this.ngCity,
        "Taluk": this.ngTaluk,
        "Car": this.ngCar,
        "Model": this.ngModel
      }
      this.GridList.push(obj);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Saved Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.clearFn();
    }
  }



  clearFn() {
    this.ngState = "0";
    this.ngCity = "0";
    this.ngTaluk = "0";
    this.ngCar = "";
    this.ngModel = "0";
  }


  isValid(): boolean {
    if (this.ngState == 0 || this.ngState == null) {
      document.getElementById("state")?.focus();
      return false
    }
    if (this.ngCity == 0 || this.ngCity == null) {
      document.getElementById("city")?.focus();
      return false
    }
    if (this.ngTaluk == 0 || this.ngTaluk == null) {
      document.getElementById("taluk")?.focus();
      return false
    }
    if (this.ngModel == 0 || this.ngModel == null) {
      document.getElementById("model")?.focus();
      return false
    }
    return true
  }
}
