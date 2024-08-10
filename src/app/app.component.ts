import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { filter } from "rxjs";
import { ThemeService } from "./shared/services/theme.service";
import { MatSlideToggle } from "@angular/material/slide-toggle";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatSlideToggle,
  ],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <main>
      <mat-form-field appearance="outline">
        <mat-label>Seed Color</mat-label>
        <input matInput [formControl]="seedColor" />

        @if (seedColor.invalid) {
        <mat-error>Invalid Seed Color</mat-error>
        }
      </mat-form-field>

      <br />

      <h3>Buttons</h3>

      <div class="inline-flex">
        <button mat-button>Basic</button>
        <button mat-button disabled>Disabled</button>
        <button mat-raised-button>Rased</button>
        <button mat-stroked-button>Stroked</button>
        <button mat-flat-button>Flat</button>
      </div>

      <br />

      <h3>Toggles</h3>

      <div class="inline-flex">
        <p><mat-slide-toggle>Normal</mat-slide-toggle></p>
        <p><mat-slide-toggle disabled>Disabled</mat-slide-toggle></p>
        <p><mat-slide-toggle hideIcon>No Icons</mat-slide-toggle></p>
      </div>
    </main>
  `,
  styles: [
    `
      h1 {
        padding-inline: 16px;
      }
      main {
        padding-inline: 16px;
      }
      .inline-flex {
        display: flex;
        gap: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "demo.ng-material-dynamic-theme";

  themeService = inject(ThemeService);
  readonly seedColor = new FormControl(this.themeService.getSeedColor(), [
    Validators.required,
    Validators.pattern(/^#[0-9a-fA-F]{6}$/),
  ]);

  constructor() {
    this.seedColor.valueChanges
      .pipe(
        filter(() => this.seedColor.valid),
        filter(Boolean),
        takeUntilDestroyed()
      )
      .subscribe((color) => this.themeService.setSeedColor(color));
  }
}
