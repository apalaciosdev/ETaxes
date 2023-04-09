import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SalesHttpService } from '../../../../services/httpServices/sales.service';
import { OffersHttpService } from 'src/app/services/httpServices/offers.service';
import { NotificationToastService } from '../../../../services/notificationToast.service';



@Component({
  selector: 'dashboardComponent',
  templateUrl: './dashboard.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit{
  user: any;
  data: any;
  offer: any;
  offerForm!: FormGroup;

  constructor(
    private productsHttpService: ProductsHttpService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private router: Router,
    private salesHttpService: SalesHttpService,
    private offersHttpService: OffersHttpService,
    private notifyToastService: NotificationToastService
  ) { 
    this.offer = {
      offerPercentage: "",
      offerName: "",
      sellerMail: "",
      purchaseDate: new Date()
    }; 
  }

  async ngOnInit() {
    this.user = this.localStorageService.getItem('userToken');
    this.countProducts(this.user.mail, this.user.token)
    this.initForm()
  }

  async getSalesData(mail:any, token:any){
    this.salesHttpService.salesData(mail, token).subscribe(
      (response) => { this.data = response; },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  async countProducts(mail:any, token:any){
    this.productsHttpService.countProducts(mail, token).subscribe(
      (response:any) => {
        if(response > 0){
          this.getSalesData(this.user.mail, this.user.token)
        }
      },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
  
  private initForm() {
    if(this.offer){
      this.offerForm = this.formBuilder.group({
        offerPercentage: [this.offer.offerPercentage, [Validators.required, Validators.max(99), Validators.min(1)]],
        offerName: [this.offer.offerName, [Validators.required]],
      });
    }
  }

  async onSubmit(){
    this.offer.sellerMail = this.user.mail;
    this.offersHttpService.postOffer(this.offer, this.user.token).subscribe(
      (response) => { this.utilsService.reloadComponent(this.router) },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  async activeOffer(offerId:string){
    this.offersHttpService.activateOffer(offerId, this.user.mail, this.user.token).subscribe(
      (response) => { this.utilsService.reloadComponent(this.router) },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 

  }
  
  async deleteOffer(offerId:string){
    this.offersHttpService.deleteOffer(offerId, this.user.token).subscribe(
      (response) => { this.utilsService.reloadComponent(this.router) },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
}