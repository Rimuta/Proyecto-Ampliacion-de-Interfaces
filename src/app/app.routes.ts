/**Todas las rutas que vamos a utilizar para cada videojuego */
import { Routes } from '@angular/router';
import { Publicar } from './features/publicar/publicar';
import { Favoritos } from './features/favoritos/favoritos';
import { Detalle } from './features/detalle/detalle';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Categoria } from './features/categoria/categoria';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'publicar', component: Publicar },
  { path: 'favoritos', component: Favoritos },
  { path: 'categoria/:nombre', component: Categoria },
  { path: 'juego/:id', component: Detalle },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'home' },
  { path: 'juego/:id', component: Detalle }
];
