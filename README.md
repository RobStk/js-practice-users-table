# Zadania - tabela z użytkownikami

Zadanie treningowe pochodzące z https://github.com/kartofelek007/zadania/tree/master/8-zadania-wyzwanie/1-tabela-z-uzytkownikami  

## Dodatkowe założenia: 

- brak zmian w plikach CSS i HTML (dodano jedynie *type="module"*)  
- kod oparty o klasy  
- Vanilla JS  

## Zastosowane technologie i narzędzia:

- HTML + CSS + JavaScript
- [Node.js](<https://nodejs.org/>)
- [json-server](<https://github.com/typicode/json-server>)
- [http-server](<https://www.npmjs.com/package/http-server>)

## Czego potrzebuję, by odpalić kod?

Do uruchomienia kodu niezbędne jest posiadanie zainstalowanego środowiska [node.js](https://nodejs.org/en/) oraz następujące pakiety:

- json-server  
- serwer lokalny (np. http-server lub live-server)  

<br>

-----------------------------  

**Oryginalna treść zadania:**  

<br>

> # Zadania - tabela z użytkownikami
> ==========================
> 
> 
> Do tego zadania będziesz potrzebował bazy danych. Wykorzystamy tutaj [json-server](http://kursjs.pl/kurs/ajax/server-lokalny.php#json-server).
> 
> Wpierw zainstaluj wszystkie paczki poleceniem <strong>npm i</strong>. Następnie odpal skrypt <strong>npm start</strong>. Powinien się odpalić json-server wraz z obserwowaniem pliku z katalogu data/data.json, a w terminalu pojawić adres na który będzisz się łączyć np. http://localhost:3000/users
> 
> Gdy otworzysz stronę z tego zadania w przeglądarce, twoim oczom ukaże się widok formularza filtrowania oraz tabeli.
> 
> Zadanie będzie polegało na oprogramowaniu obydwu elementów.
> 
> Tabela powinna wyświetlać dane, mieć możliwość sortowania po danej kolumnie (służyć do tego będą strzałeczki w nazwie kolumny) oraz mieć stronicowanie. Stronicowanie powinno być aktywne lub nieaktywne w zależności od tego czy serwer zwróci informację o tym czy istnieje kolejna/poprzednia strona do wyświetlenia.
> 
> Przy rozwiązywaniu zadania z pewnością przyda się spojrzeć na dokumentację json-server, na której opisane jest kilka niezbędnych dla nas rzeczy:
> 
> * https://github.com/typicode/json-server#paginate
> * https://github.com/typicode/json-server#filter
> * https://github.com/typicode/json-server#operators
> 
> Spróbuj połączyć się na przykładowy adres:
> http://localhost:3000/users?_page=1&_limit=10
> i dokładnie przejrzyj dane z jakich będziesz mógł skorzystać