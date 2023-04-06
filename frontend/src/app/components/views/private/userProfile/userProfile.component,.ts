import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedService } from 'src/app/shared.service';
import { Product } from 'src/assets/models/product';
import { SalesHttpService } from '../../../../services/httpServices/sales.service';
import { OffersHttpService } from 'src/app/services/httpServices/offers.service';



@Component({
  selector: 'userProfileComponent',
  templateUrl: './userProfile.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./userProfile.component.scss']
})



export class UserProfileComponent implements OnInit{
  user: any;
  data: any;
  offer: any;
  offerForm!: FormGroup;

  constructor(
    private productsHttpService: ProductsHttpService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private route: ActivatedRoute,
    private router: Router,
    private salesHttpService: SalesHttpService,
    private offersHttpService: OffersHttpService,
    private temporalService: TemporalService
  ) { 
    this.offer = {
      offerPercentage: 0,
      offerName: "",
      sellerMail: "",
      purchaseDate: new Date()
    }; 
  }


  async ngOnInit() {
    this.user = this.localStorageService.getItem('userToken');
    this.getSalesData(this.user.mail)
    this.initForm()
  }

  async getSalesData(mail:any){
    this.salesHttpService.salesData(mail).subscribe(
      (response) => { this.data = response; },
      (error) => { console.log(error); }
    ); 

    setTimeout(() => {
      console.log(this.data)
    }, 500);
  }

  
  private initForm() {
    if(this.offer){
      this.offerForm = this.formBuilder.group({
        offerPercentage: [this.offer.offerPercentage],
        offerName: [this.offer.offerName],
      });
    }
    this.service.gestionarValidarErrors(this.offerForm);
  }

  async onSubmit(){
    this.offer.sellerMail = this.user.mail;
    console.log(this.offer)
    this.offersHttpService.postOffer(this.offer).subscribe(
      (response) => { console.log(response) },
      (error) => { console.log(error); }
    ); 
  }
  



  
  

}
