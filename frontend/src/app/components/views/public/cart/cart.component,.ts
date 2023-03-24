import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';



@Component({
  selector: 'cartComponent',
  templateUrl: './cart.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{

  
  constructor(
  

  ) {
  
  }

  async ngOnInit() {
  

  }
  

  // async deleteProduct(uid: string){
  //   console.log("dale")
  //   this.httpService.deleteProduct(uid).subscribe(
  //     (response) => { console.log("Product dropped"); },
  //     (error) => { console.log(error); }
  //   ); 
      
  //   await this.getProducts()
  //   this.httpService.reloadComponent(this.router)
    
  //   // this.ngOnInit();
  // }
  

}
