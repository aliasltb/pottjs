# meme viewer
Lädt Inhalte aus verschiedenen Subreddits, ohne das reddit.com aufgerufen werden muss und wir Ärger mit der IT bekommen. Technisch gesehen halten wir uns damit an die Regeln.
Leider wurde ein Kollege - der hier nicht namentlich erwähnt werden soll - dabei erwischt, wie er auf eine NSFW-Subreddit unterwegs war.

## Le Problem
Um zukünftigen Ärger zu verhindern, muss also ein Filter einbauen werden. Die Wahl zur Umsetzung fiel dabei zufällig auf Bernd, der daraus hoffentlich eine Lehre ziehen wird.

Da der komplette Code noch in jQuery (bäh!) geschrieben wurde, sollte er bei der Gelegenheit gleich in VanillaJS umgeschrieben und dabei grundlegende bereinigt werden.

## Aktueller Stand
Der aktuelle Zustand funktioniert nicht richtig und stellt den Stand dar, den Bernd zuletzt ins Repository gepusht hat. Wir alle wünschen ihm natürlich von ganzem Herzen gute Besserung und eine schnelle Genehsung.  

Aber - hey - the show must go on, ne?

Grundsätzlich sieht der Code ja schon ganz gut aus, aber in der Praxis läuft nichts.
Darum suchen wir jetzt Freiwillige Helfer, die uns den Code wieder lauffähig machen.

## Die Aufgabe
Die Seite hat früher folgendes getan:
 * Man konnte sich alle Postings mit Thumbnails aus einem beliebigen Subreddit anzeeigen lassen. Wer Reddit nicht kennt: http://reddit.com/r/funny/ ist das Subreddit "funny" und enthält lustige(?) Bilder.
 * Weil das Tool nur zum anzeigen von Memes ausgelegt war, galt alles, was kein Bild enthielt, als irrelefant.  
 * Unter jedem Thumbnail stand der Titel des Postings.
 * Jedes Thumbnail war mit dem eigentlichen Bild verlinkt.
 * Beim ersten Aufruf der Seite wurden die ersten 15 Einträger der Kategorie "hot" aus dem Subreddit "memes" geladen
 * Man konnte links den Namen des Subreddits eintragen. 
 * Man konnte die Anzahl von Posts, die geladen werden festlegen
 * Man konnte innerhalb des Subreddits zwischen den Kategorien "hot" ("Beliebt"), "new" ("Neu"), "top" ("Top") und "controversial" ("Kontrovers") wählen
 * Nachdem alle Inahlte angezeigt wurden, konnte man sich diese noch nach Anzahl der "Upvotes", "Downvotes" und dem Alter des Postings sortieren lassen
 

Die Wünsche für die überarbeitete Version sind, dass alles wie früher funktioniert, aber:
- [x] ohne jQuery (das scheint Bernd grade so geschafft zu haben)
- [ ] Es mus sichergestellt sein, dass keine NSFW-Inhalte dargestellt werden. (Die Funktion ist im Code, ist aber nicht elegant gelöst)
- [ ] Sogenannte "Sticky"-Postings von Reddit sollen in der Liste nicht mehr anzeigen werden (dito: geht schöner)

Im Moment bekommt man leider nur das Formular zum auswählen des Subreddits und eine Fehlermeldung in der Konsole.

Kannst du uns helfen?

## Kontakt
Wenn du die Aufgabe fertig gelöst hast, kannst du entweder direkt mit uns in Kontakt treten, oder einen Pull Request starten


Viel Spaß,
Peter von add2.de


*[NSFW]: "Not Safe For Work" = "Kram, den man sich besser nicht am Arbeitsplatz anschaut."