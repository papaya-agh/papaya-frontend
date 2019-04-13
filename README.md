# tl;dr
najpierw install angulara

`npm install -g @angular/cli`

potem 

`npm install`

Do projektu wrzuciłem bootstrapa i primeng (polecam obadać na ich stronie - mnóstwo gotowych komponentów, które całkiem ładnie wyglądają).
Dodałem przykładowy moduł z routingiem i dwoma komponentami. W `ExampleComponentComponent` jest przykładowe pobieranie danych z api. 
(`ExampleComponentComponent` to słaba nazwa - ostatnie component dodawane jest przez CLI)

uruchomienie 
`ng serve` (dodanie opcji `--open` otworzy w domyślnej przeglądarce)

Po uruchomieniu daemon nasłuchuje zmian, więc zmodyfikowanie dowolnego pliku i jego zapisanie spowoduje kompilację i przeładowanie strony.

# generacja api

za pierwszym razem - `git submodule init`

żeby zaktualizować api - `git submodule update`

Domyślnie zostanie pobrany master z `papaya-interface`. Aby zmienić branch z którego generowane będzie api, wystarczy przejść do folderu `papaya-interface` i zmienić branch (jak w zwykłym repozytorium git).

modele zostaną wygenerowane po kliknięciu na "play" przy generate.declarations w pliku `package.json`
ewentualnie poprzez polecenie `npm run generate.declarations`
# Struktura projektu
W `src/app` jest root projektu - tam znajdują się moduły (rozumiane u nas jako WIDOKI - każdy z trzech widoków będzie osobnym modułem).

Tworzenie modułu:

`ng generate module nazwa-modulu --routing` (najlepiej być wtedy w katalogu src/app).

Warto na początku wykonywać generacje z przełącznikiem `--dry-run` - wtedy zostanie wypisana lista zmian które komenda wprowadzi, ale nic nie zostanie zmodyfikowane.

W modułach znajdują się KOMPONENTY. Mogą to być zarówno całe widoki, jak i ich fragmenty (A jak to się ma do moduł=widok? Np. widok_1 może mieć ekran prezentujący jakieś szczegóły konkretnego sprintu). A przez fragmenty rozumiem jakieś np. menusy, które mogą być wykorzystywane w więcej niż jednym miejscu.

W każdym module proponuję dodawać foldery `common/service` i `common/model` - zastosowanie wiadome (aczkolwiek co do model to zobaczymy jeszcze jak to się będzie miało do automatycznego generowania z yamli - o ile będziemy z tego korzystać). 

Tworzenie komponentu:

`ng generate component nazwa-komponentu` (znowu najlepiej być przecedekowanym do konkretnego folderu - ewentualnie opcja dry-run)


Routing:

Każdy moduł ma swój `routing.module`. Nowe widoki-moduły podpinamy do `app-routing.module`, a pomniejsze widoki-komponenty do konkretnego `moduł-module-routing`.


------
Jakieś coś wygenerowane automatycznie
------

# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
