# Dokumentation: WildMap Applikation

## 1. Einleitung

Bei diesem Projekt handelt es sich um eine Tier-Svelte-App für den Kurs Programmiersprachen III, mit dem Thema „Wilde Tiere“ – gestaltet und programmiert von Hope Sikuade.

## 2. Idee & Methodik

### 2.1 Konzeptentwicklung

Das ursprüngliche Konzept basierte auf der Idee, einen interaktiven Pokédex zu entwickeln, in dem Pokémon auf einer Karte angeklickt werden können, um ihre Fundorte und Routen anzuzeigen. Daraus entwickelte sich die Idee, die Karte stattdessen auf wilde Tiere anzupassen. Nutzende sollten Kontinente und Länder anklicken können, um Informationen über dort lebende Tiere zu erhalten und anhand dieser Informationen ein Tier-Quiz zu spielen.  Aufgrund begrenzter Zeit und Erfahrung wurde das Konzept zunächst verkleinert und mit grundlegenden Funktionen begonnen, um diese im Prozess erweitern zu können.

Das Ergebnis des Projekts ist „WildMap: Dein interaktiver Tieratlas rund um den Globus“ – ein interaktives Tierlexikon, das Kindern im Alter von etwa 11 bis 15 Jahren (6. bis 9. Klasse) Wissen über Tiere und Geografie vermittelt.

### 2.2 Methodik & Technische Umsetzung

Zunächst wurden Ideen und Skizzen aufgeschrieben, um aus diesem in Figma einen User Flow zu gestalten. Aus diesem User Flow entstanden die ersten Screens und der Ablauf der Applikation. Im Laufe des Prozess wurden die Screens erweitert oder angepasst, um immer eine Vorlage für das Programmieren zu sein. Auch das Design der Applikation hat sich zuletzt nochmal geändert, da von Illustrationen auf echte Bilder der Tiere umgeschwänkt wurde (dies ist auch realistischer für die Kindern und in einem Lexikon) und es wurden Farben integriert.

Die Screens der Figma Datei können entweder als PDF angeschaut werden oder unter folgendem Link: https://www.figma.com/proto/KA3KyNZ9xuD4d3WLS3xcuJ/Programmiersprachen-III?page-id=0%3A1&node-id=2-2&p=f&viewport=360%2C223%2C0.07&t=tuU56MY3uE4dMbom-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A2


### 2.3 Funktionsweise der Applikation

Die Reise beginnt auf der Startseite der Applikation, die den Kindern eine kurze Einführung gibt, was sie erwartet und wie sie das Tierlexikon nutzen können. Mit einem Klick auf den Button „Entdeckungsreise starten“ gelangen sie in die eigentliche Applikation, die sich optisch von der Startseite abhebt.

Auf der Weltkarte angekommen steht den Kindern nun eine Navigationsleiste zur Verfügung, mit der sie bequem durch die verschiedenen Unterseiten navigieren können. Sie starten direkt mit einer Übersicht der genannten Weltkarte, auf der interaktive Hover-Effekte anzeigen, dass die Kontinente anklickbar sind. Auf dieser Seite können die Kinder die Kontinente erkunden, mehr über deren tierische Bewohner erfahren und mithilfe von Lesezeichen für sie interessante Tiere speichern. Zusätzlich öffnet sich ein Icon am rechten unteren Rand, welches allgemeine Fakten über die Kontinente enthält.  

Beim Anklicken eines Tieres öffnet sich eine Detailseite, die weitere Informationen und Bilder zu dem jeweiligen Tier bietet.

Über das Lesezeichen-Symbol in der Navigation gelangen die Kinder zu einer Übersicht aller zuvor gespeicherten Tiere. Es ist zu jeder Zeit möglich die Tiere zu markieren oder die Markierung wieder entfernt werden.

Das letzte Icon in der Navigationsleiste, die Lupe, ermöglicht es, Tiere entweder nach ihrer Tierklasse (z. B. Säugetiere, Vögel) zu filtern oder gezielt nach bestimmten Tieren zu suchen.

Im Projekt finden sich zudem bei den einzelnen Unterseiten / Funktionen Kommentare, die nochmal darauf eingehen, warum dieses Element existiert und wofür es eingebaut wurde.

### 2.4 Responsive Anpassung

Beim Responsive Design wurde ein Breakpoint von 425px gewählt dh. die Applikation ist für Smartphones optimiert (dabei lag der Fokus auf einem Mobile S 320px). Die Responsive Anpassung hat auf den meisten Unterseiten optimal funktioniert, dabei wurden die Elemente verkleinert oder anders angeordnet (siehe Header) und bei der AnimalDetails.svelte wurde bspw. ein neues Akkordeon auf dem Smartphone eingefügt, welches den Steckbrief von Wikipedia beinhaltet (da dieser je nach Tier und Länge zu weit zum scrollen gewesen wäre) oder bei der Homepage.svelte entfällt das Hero Image.

Beesonders schwer es die Worldmap.svelte anzupassen (die auch bis zum Zeitpunkt der Abgabe nicht 100% funktioniert). Die Breakpoints sind alle gesetzt und auf den ersten Blick und beim klicken auf die Kontinente und auf den Info Button funktioniert es, jedoch je nachdem welcher Kontinent zuerst angeklickt wird buggt der Header und es verschieben sich alle Elemente oder beim zurückklicken aus der Listenansicht.

Es ist keine perfekt optimierte Ansicht, da sie optisch ansprechender gestaltet werden könnte aber es ermöglicht, die Ansicht auf einem Smartphone.

## 3 Reflexion der Umsetzung

### 3.1 Schwierigkeiten und Probleme

Zu Beginn stand ich vor der Herausforderung, das Projekt in Svelte zu starten und eine strukturierte Vorgehensweise zu entwickeln. Nachdem dieses Problem schnell gelöst war, verlor ich viel Zeit damit, die Unterseiten miteinander zu verlinken, da mir zunächst nicht bewusst war, dass hierfür der svelte-spa-router installiert werden musste.

Die beiden größten Hürden des Projekts waren die Verlinkung der Unterseiten und die Integration der Weltkarte. Für die Weltkarte musste ich drei verschiedene Versionen erstellen, da der Detailgrad der Karte – insbesondere die Komplexität der SVG-Paths – ein zentrales Problem darstellte. Die finale Version bildet die Kontinente nicht exakt detailgetreu ab, was sich jedoch als vorteilhaft erwies, da es besser zur Zielgruppe und zum Konzept passt, da der Fokus nun auf den Tieren liegt.

Ein weiterhin bestehendes Problem ist der Zoom auf die einzelnen Kontinente. Während das Zoomen bei einigen Kontinenten gut funktioniert, gibt es bei anderen noch Ungenauigkeiten, die innerhalb des Projektzeitraums nicht mehr behoben werden konnten. Dennoch funktioniert die Weltkarte insgesamt einwandfrei, was ich zu Beginn des Projekts nicht erwartet hätte.

Ein weiteres Problem, das eng mit der Verlinkung der Unterseiten zusammenhängt, war die Navigation zwischen den einzelnen AnimalDetails-Seiten. Die aufwendigsten Unterseiten des Projekts waren Worldmap.svelte und AnimalDetails.svelte, da hier regelmäßig neue Funktionen ergänzt, überschrieben oder angepasst werden mussten. Dies führte zu häufigen Fehlern im Entwicklungsprozess, machte die Arbeit an diesen Komponenten aber auch besonders lehrreich.


### 3.2 Erfolgsfaktoren

Angesichts meiner anfänglichen Unsicherheit, ob ich überhaupt eine funktionierende Applikation bzw. Weltkarte entwickeln könnte, bin ich umso zufriedener mit dem Endergebnis. 

Sobald die ersten Funktionen erfolgreich liefen, wuchs mein Ehrgeiz, meinen ursprünglichen Figma-Prototypen so genau umzusetzen. Dadurch konnte ich nach und nach immer mehr Funktionen integrieren bspw. die Suchfunktion, die Kontinent-Informationen und die Bookmark-Funktion.

Auch die Anbindung von zwei APIs (Wikipedia & REST Countries) verlief deutlich besser als erwartet, insbesondere durch die Erstellung der wikiCache.js.

Letztendlich habe ich eine voll funktionsfähige, interaktive Weltkarte bzw. ein Tierlexikon entwickelt, das nicht nur alle ursprünglich geplanten Features enthält, sondern zusätzlich zwei APIs integriert. Jeder Schritt, der funktioniert hat, war ein Erfolgserlebnis und hat mir geholfen, den Aufbau eines Svelte-Projekts besser zu verstehen.
