import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit, OnChanges {

  @Input() usuario: any;
  @Input() permissoes: any;

  @ViewChild('inputNome') inputNome: ElementRef;

  @Output() formularioSalvo = new EventEmitter<any>();

  formulario: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let key in changes) {
      if (key === 'usuario' && changes[key].currentValue) {
        this.formulario.patchValue(changes[key].currentValue);
        this.inputNome.nativeElement.focus();
      }
    }
  }

  salvarModel() {
    this.formularioSalvo.emit(this.formulario.value);
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
      roles: this._fb.array([
        this._fb.group({
          id: new FormControl('', Validators.required)
        })
      ])
    });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
       return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
 }
}
