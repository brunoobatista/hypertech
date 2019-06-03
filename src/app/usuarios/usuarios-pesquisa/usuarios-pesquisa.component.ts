import { Component, OnInit } from '@angular/core';
import { UsuarioFiltro, UsuariosService } from '../usuarios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ModalService } from 'src/app/core/modal.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  confirmacaoModal = 'confirmacaoModal';
  usuarios = [];
  usuarioModal;

  filtro = new UsuarioFiltro();

  totalPages;
  number;
  totalElements;
  size;

  constructor(
    private erroHandler: ErrorHandlerService,
    private toasy: ToastyService,
    private modal: ModalService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.pesquisar(0);
  }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.usuarioService.pesquisar(this.filtro)
      .then(response => {
        this.usuarios = response.content;
        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;
      })
      .catch(error => this.erroHandler.handle(error));
  }

  excluirUsuario(usuario: Usuario, idModal: string) {
    this.usuarioService.desativarUsuario(usuario.id, this.number, this.size)
      .then(response => {
        const index = this.usuarios.indexOf(usuario);
        this.usuarios.splice(index, 1);
        if (response !== undefined && response !== null) {
          this.usuarios.push(response);
        }

        this.totalElements--;
        this.toasy.success('Usuário excluído!');
      })
      .catch(error => this.erroHandler.handle(error));

    this.closeModal(idModal);
  }


  openModal(id: string, usuario) {
    this.usuarioModal = usuario;
    this.modal.open(id);
  }

  closeModal(id: string) {
    this.modal.close(id);
  }

}
