import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONDITIONS, NewGame, PLATFORMS, categoryOf } from '../../../core/games/game.model';

const PATRON_URL = /^https?:\/\/\S+$/;

/**
 * Formulario para vender un videojuego (componente presentacional).
 * No guarda nada: valida los datos y los emite con `gameSubmit`; quien lo usa decide qué hacer.
 *
 * Uso:
 *   <app-game-form submitText="Publicar" (gameSubmit)="publicar($event)" />
 *
 * @author Tu nombre
 * @version 1.0
 */
@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css'
})
export class GameForm {
  /** Texto del botón de envío. */
  @Input() submitText: string = 'Publicar videojuego';

  /** Se emite con los datos del juego cuando el formulario es válido. */
  @Output() gameSubmit = new EventEmitter<NewGame>();

  private readonly fb = inject(FormBuilder);

  readonly platforms = PLATFORMS;
  readonly conditions = CONDITIONS;

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    platform: ['', Validators.required],
    condition: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(999)]],
    image: ['', Validators.pattern(PATRON_URL)],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

  /** Un campo se marca como inválido solo cuando ya se ha interactuado con él. */
  invalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /** Valida y emite el juego; si hay errores, los muestra todos. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.gameSubmit.emit({
      title: v.title.trim(),
      platform: v.platform,
      category: categoryOf(v.platform),
      condition: v.condition,
      price: Math.round(Number(v.price) * 100) / 100,
      image: v.image.trim(),
      description: v.description.trim()
    });
    this.form.reset();
  }
}
