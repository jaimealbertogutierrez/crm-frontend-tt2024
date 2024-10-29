import {Component, OnInit, AfterViewInit, Renderer2, input, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agrega ReactiveFormsModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    this.registerForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required]
    });
  }

  setFocus(controlName: string) {
    const inputElement = this.document.getElementById(controlName);
    if (inputElement) {
      this.renderer.selectRootElement(inputElement).focus();
    }
  }
  ngOnInit(): void {
    this.setFocus('nombre_usuario');
  }
  onSubmit() {
    console.log("-------------------------------------------");
    console.log("Datos del cliente:", this.registerForm.value);
    console.log("-------------------------------------------");


    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          this.successMessage = 'Registro exitoso. ¡Bienvenido!';
          this.registerForm.reset();

          // Limpiar mensaje de éxito después de 10 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 10000);
        },
        error => {
          this.errorMessage = 'Error al registrar usuario. Inténtalo de nuevo.';

          // Limpiar mensaje de error después de 10 segundos
          setTimeout(() => {
            this.errorMessage = '';
          }, 10000);
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';

      // Limpiar mensaje de error después de 10 segundos
      setTimeout(() => {
        this.errorMessage = '';
      }, 10000);
    }
  }


  clearMessages() {
    this.registerForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.setFocus('nombre_usuario');
  }
  //************************************************************
  //************************************************************
  //************************************************************
}
