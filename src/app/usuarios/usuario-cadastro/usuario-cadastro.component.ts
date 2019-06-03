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
    this.configurarFormulario();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarUsuario(id);
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

  carregarUsuario(id) {
    this.usuarioService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);
        this.formulario.get('confirmPassword').setValue(response.password);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  adicionar() {
    this.usuarioService.salvar(this.formulario.value)
      .then(response => {
        console.log('resp', response);
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
      password: ['', Validators.compose([
        Validators.required, this.validarTamanhoMinimo(6)
      ])],
      confirmPassword: ['', [Validators.required]],

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
