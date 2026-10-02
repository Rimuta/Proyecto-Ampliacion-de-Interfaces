import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
type ModoAcceso = 'login' | 'registro';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent {
    modo: ModoAcceso = 'login';
    cambiarModo(nuevoModo: ModoAcceso): void {
        this.modo = nuevoModo;
    }
}