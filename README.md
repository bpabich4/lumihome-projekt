# LumiHome — Inteligentne Oświetlenie LED

Statyczna strona internetowa dla fikcyjnej marki inteligentnego oświetlenia LED.  
Projekt demonstracyjny wykonany w czystym HTML5, CSS3 i Vanilla JavaScript bez żadnych frameworków.

---

## Technologie

- **HTML5** — semantyczne znaczniki, dostępność (ARIA), walidacja natywna
- **CSS3** — zmienne CSS, Grid, Flexbox, responsywność (mobile-first), animacje
- **JavaScript (ES6+)** — Vanilla JS, IntersectionObserver, brak zewnętrznych bibliotek

---

## Funkcje

| Funkcja | Opis |
|---|---|
| Motyw jasny/ciemny | Przełącznik z `localStorage`, uwzględnia `prefers-color-scheme` |
| Menu mobilne | Animowany przycisk hamburgera, zamknięcie na Esc |
| Filtrowanie produktów | Filtrowanie przez atrybuty `data-*`, płynne przełączanie kart |
| Kalkulator oświetlenia | Oblicza powierzchnię, strumień i liczbę opraw |
| Formularz kontaktowy | Walidacja pól, komunikat o sukcesie, `aria-live` |
| Aktywna nawigacja | `IntersectionObserver` ustawia `aria-current` na aktywną sekcję |
| Dostępność | `lang="pl"`, `skip link`, `aria-*`, semantyka HTML5, `:focus-visible` |
| Responsywność | Mobile-first, działa od 320px |
| Nagłówek sticky | Lekkki efekt blur, nie zasłania treści |
| Sekcja inspiracji | Redakcyjny, asymetryczny layout CSS Grid z grafikami SVG |

---

## Struktura plików

```
lumihome/
├── index.html    ← Główny plik strony
├── style.css     ← Wszystkie style
├── script.js     ← Cała interaktywność
└── README.md     ← Ten plik
```

---

## Jak otworzyć lokalnie

1. Pobierz lub skopiuj folder `lumihome/` na swój komputer.
2. Otwórz folder w eksploratorze plików.
3. Kliknij dwukrotnie plik **`index.html`**.
4. Strona otworzy się w Twojej domyślnej przeglądarce.

> **Uwaga:** Strona działa w pełni lokalnie. Nie potrzebuje serwera, backendu ani instalacji Node.js.

---

## Jak opublikować stronę w internecie

### Metoda 1 — Netlify Drop (najszybsza, 2 minuty, bez konta)

1. Wejdź na stronę: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Otwórz folder `lumihome/` w eksploratorze plików.
3. **Przeciągnij cały folder `lumihome/`** i upuść go w szare pole na stronie Netlify (napisane "Drag and drop your site output folder here").
4. Poczekaj kilka sekund — Netlify automatycznie wygeneruje dla Ciebie adres URL, np. `https://luminous-gecko-12345.netlify.app`.
5. Skopiuj link i gotowe — strona jest dostępna dla całego świata!

> **Tip:** Jeśli założysz darmowe konto Netlify, możesz nadać własną nazwę subdomeny lub podpiąć własną domenę.

---

### Metoda 2 — GitHub Pages (bezpłatny hosting, wymaga konta GitHub)

**Krok 1: Załóż konto GitHub**
- Wejdź na [github.com](https://github.com) i zarejestruj się za darmo.

**Krok 2: Utwórz nowe repozytorium**
1. Kliknij zielony przycisk **"New"** (lub **"+"** w prawym górnym rogu → "New repository").
2. Wpisz nazwę repozytorium, np. `lumihome`.
3. Wybierz **"Public"** (publiczne — wymagane dla darmowego GitHub Pages).
4. Kliknij **"Create repository"**.

**Krok 3: Dodaj pliki projektu**
1. Na stronie repozytorium kliknij **"uploading an existing file"** (link w środku strony).
2. Przeciągnij pliki `index.html`, `style.css`, `script.js` i `README.md` do okna przeglądarki.
   - **Ważne:** Wgraj pliki bezpośrednio, nie folder `lumihome/`.
3. Kliknij zielony przycisk **"Commit changes"**.

**Krok 4: Włącz GitHub Pages**
1. W repozytorium kliknij zakładkę **"Settings"** (ustawienia).
2. W lewym menu wybierz **"Pages"**.
3. W sekcji **"Branch"** wybierz gałąź **`main`** i folder **`/ (root)`**.
4. Kliknij **"Save"**.

**Krok 5: Poczekaj i otwórz**
- Odczekaj 1–3 minuty.
- Odśwież stronę Settings → Pages.
- Pojawi się link do Twojej strony, np.: `https://twoja-nazwa.github.io/lumihome/`

---

## Licencja i uwagi

Ten projekt jest statyczną stroną demonstracyjną. Marka LumiHome jest fikcyjna.  
Stworzone jako projekt edukacyjny — HTML/CSS/JS bez frameworków.
