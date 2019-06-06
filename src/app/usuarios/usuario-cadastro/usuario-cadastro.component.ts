import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  idUsuario;
  formulario: FormGroup;
  titulo: string;

  permissoes = [];

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.params['id'];
    this.configurarFormulario();
    if (this.idUsuario) {
      //this.carregarUsuario(this.idUsuario);
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Novo';
    }

    this.usuarioService.listarPermissoes()
      .then(response => {
        this.permissoes = response;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  /*carregarUsuario(id) {
    this.usuarioService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);
        //this.formulario.get('confirmPassword').setValue(response.password);
        console.log(this.formulario.value)
      })
      .catch(error => this.errorHandler.handle(error));
  }*/

  adicionar() {
    console.log(this.formulario);
    this.usuarioService.salvar(this.formulario.value)
      .then(response => {
          this.router.navigate(['/usuarios']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  configurarFormulario() {
    this.formulario = this._fb.group({
      id: [],
      nome: new FormControl('', Validators.compose([
          Validators.required,
          this.validarTamanhoMinimo(3)
      ])),
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      cpf: [''],
      username: new FormControl('', Validators.compose([
        Validators.required, this.validarTamanhoMinimo(3)
      ])),
      password: [null, Validators.compose([
        Validators.required, this.validarTamanhoMinimo(6)
      ])],
      confirmPassword: [null, [Validators.required]],

      roles: this._fb.array([
        this._fb.group({
          id: new FormControl('', Validators.required)
        })
      ])
    }, {validator: this.mustMatch('password', 'confirmPassword')});
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
       return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
 }

}
