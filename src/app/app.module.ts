import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que la ruta sea correcta
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component'; // Asegúrate de importar el componente
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ClientesCreateComponent} from './clientes/clientes-create/clientes-create.component';
import {ClientesEditComponent} from './clientes/clientes-edit/clientes-edit.component';
import {ClientesDetailComponent} from './clientes/clientes-detail/clientes-detail.component';
import {ClientesListComponent} from './clientes/clientes-list/clientes-list.component';


@NgModule({
  declarations: [
    RegisterComponent, // Asegúrate de declarar el componente
    ClientesCreateComponent,ClientesEditComponent,ClientesDetailComponent,ClientesListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Asegúrate de incluir CommonModule aquí
    //FormsModule,
    ReactiveFormsModule,
    // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
