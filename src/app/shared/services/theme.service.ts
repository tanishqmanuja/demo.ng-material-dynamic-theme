import { APP_INITIALIZER, Injectable, Provider } from "@angular/core";
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { BehaviorSubject, combineLatest, map, tap } from "rxjs";
import { isDarkMode$ } from "../utils/ng/prefers-color-scheme";
import { applySurfaceStyles } from "../utils/material/surface-styles";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

const ION_COLOR_PRIMARY = "#428cff";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly seedColor$ = new BehaviorSubject(ION_COLOR_PRIMARY);
  private readonly theme$ = this.seedColor$.pipe(
    map((color) => themeFromSourceColor(argbFromHex(color)))
  );
  private readonly isDarkMode$ = isDarkMode$();

  constructor() {
    combineLatest([this.theme$, this.isDarkMode$])
      .pipe(
        tap(([theme, dark]) => {
          applyTheme(theme, { dark });
          applySurfaceStyles(theme, { dark });
          applyBodyClass(dark);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  getSeedColor() {
    return this.seedColor$.getValue();
  }

  setSeedColor(color: string) {
    this.seedColor$.next(color);
  }
}

export function provideThemeService(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => () =>
      Promise.resolve(themeService),
    deps: [ThemeService],
    multi: true,
  };
}

export function applyBodyClass(
  isDark: boolean,
  className: string = "dark"
): void {
  document.body.classList.toggle(className, isDark);
}
