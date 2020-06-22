# level-editor
Edytor poziomów 3D
Odtwarzacz albumów z plikami mp3.<br>
# Pierwsze uruchomienie:
Aby program mógł działać należy zainstalować node.js -> https://nodejs.org/en/download/ <br>
<i>(warto sprawdzić poprawność instalacji poprzez wpisanie w konsoli polecenia <code>node -v</code>)</i><br>
Po zainstalowaniu node.js należy w konsoli przejść do folderu, gdzie znajduje się główny plik serwera - server.js.<br>
Z tego miejsca wpisujemy komendy:<br>
<code>npm install express</code> i <code>node server</code><br>
Po uzyskaniu odpowiedzi "serwer startuje na porcie 3000" należy uruchomić przeglądarkę i wpisać w pasku wyszukiwania:<br>
<code>localhost:3000</code> albo <code>127.0.0.1:3000</code><br>
Po tym wszystkim w przeglądarce powinien uruchomić się program.
# o programie
Program jest projektem szkolnym.<br>
Projekt zaczynamy od utworzenia mapy z hexów (naciśnij lewym przyciskiem myszy na wybranym hexie aby wybrać kierunek wyjścia z hexa).<br>
Można też wybrać typ hexa - po lewej strone przyciski ENEMY, LIGHT, WALLS i TREASURE.<br>
Po utworzeniu mapy należy nacisnąć <b>Zapisz na serwerze</b>, aby zapisać nasza mapę.<br>
Kod, który zostanie zapisany wyświetla się na pasku pomiędzy mapą a przyciskami.<br>
Można wczytać zapisane mapy przy pomocy przycisku <b>Wczytaj z serwera</b>.<br>
Następne przyciski odnoszą do odpowiednich im podstron:<br>
<ul>
<li>GAME (/game) - wyświetla wybraną przez nas mapę, która została wczesniej utworzona. Aby poruszać się Homerem należy nacisnąć lewym przyciskiem myszy na podłoge hexa. (umieszczenie hexa ze światłem jest zalecane, aby widzieć wnętrze hexów). Kontrolki w lewym górnym rogu pozwalają na zmienianie wysokości i intensywność światła.</li>
<li>HEX (/hex) - wyświetla przykładowy hex bez postaci (jest czarny, ponieważ nie ma światła).</li>
<li>Simple Player Movement (/pm) - ruch sześcianu, który pokazuje działanie ruchu gracza.</li>
<li>Simple Allies Movement (/am) - <b>NIEDOKOŃCZONE</b> ruch sześcianu razem z ruchem jego sojusznika</li>
</ul>
# rozwój
W wolnej chwili dokończę Allies Movement, aby obsługiwało wielu sojuszników poruszających się za graczem. Zobaczymy co przyniesie przyszłość...
