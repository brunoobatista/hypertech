import { Component, OnInit } from '@angular/core';

@Component({
   template: `
   <div class="bg-dark text-white py-5">
        <div class="container py-5">
             <div class="row">
                  <div class="col-md-2 text-center">
                       <p><i class="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 403</p>
                  </div>
                  <div class="col-md-10">
                       <h3>OPPSSS!!!! Desculpe...</h3>
                       <p> Você não pode acessar essa essa página por falta de autorização.
                       <br/>
                       </p>Por favor, contate um administrador para receber tais privilégios.
                       <br/>
                       <a class="btn btn-danger" href="javascript:history.back()">Go Back</a>
                  </div>
             </div>
        </div>
        <div id="footer" class="text-center">
             Bruno Batista 2019, Bussiness Tequila Technologies
        </div>
   </div>
   `
   ,
   styles: [`
   #footer{
      text-align: center;
      position: fixed;
      margin-left: 530px;
      bottom: 0px
 }
   `]
})
export class NaoAutorizadoComponent implements OnInit {

   constructor() {}

   ngOnInit() {}

}
