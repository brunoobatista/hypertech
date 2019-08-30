import { Component, OnInit, ɵConsole } from '@angular/core';
import { VendasService } from '../vendas.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Venda, StatusVenda } from 'src/app/model/Venda';
import { ModalService } from 'src/app/core/modal.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-venda-show',
  templateUrl: './venda-show.component.html',
  styleUrls: ['./venda-show.component.css']
})
export class VendaShowComponent implements OnInit {

  confirmacaoModal = 'confirmacaoModal';
  exclusaoModal = 'exclusaoModal';
  vendaModal;
  venda = new Venda();
  statusVenda;
  constructor(
    private vendaService: VendasService,
    private route: ActivatedRoute,
    private errorHandle: ErrorHandlerService,
    private modal: ModalService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.statusVenda = new StatusVenda();
    const idVenda = this.route.snapshot.params['id'];
    if (idVenda) {
      this.vendaService.buscarPorCodigo(idVenda)
        .then(response => {
          this.venda = response;
        })
        .catch(error => this.errorHandle.handle(error));
    }
  }

  estornarVenda(venda: Venda, id: any) {
    this.vendaService.estornar(venda)
      .then(response => {
        this.venda = response;
        this.toasty.success('Venda estornada!');
      })
      .catch(error => this.errorHandle.handle(error));
    this.closeModal(id);
  }

  calcularValorTotal() {
    return this.venda.valor - this.venda.desconto;
  }

  openModal(id: any, venda: Venda) {
    this.vendaModal = venda;
    this.modal.open(id);
  }

  closeModal(id: any) {
    this.modal.close(id);
  }

}
