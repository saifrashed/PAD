-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Gegenereerd op: 18 okt 2021 om 01:11
-- Serverversie: 8.0.12
-- PHP-versie: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pad_gym_7_live`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `difficulty`
--

CREATE TABLE `difficulty` (
  `difficultyID` int(11) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `difficulty`
--

INSERT INTO `difficulty` (`difficultyID`, `description`) VALUES
(1, 'Makkelijker kat/moeilijker muis'),
(2, 'Moeilijker kat/makkelijker muis'),
(3, 'Makkelijker voor de tikkers/moeilijker voor de rovers'),
(4, 'Moelijker voor de tikkers/makkelijker voor de rovers'),
(5, 'Makkelijker'),
(6, 'Moeilijker'),
(7, 'Makkelijker voor tikkers/moeilijker voor lopers'),
(8, 'Moeilijker voor tikkers/makkelijker voor lopers'),
(9, 'Makkelijker voor de zoeker'),
(10, 'Makkelijker voor de lopers'),
(11, 'Makkelijker voor de moeder'),
(12, 'Makkelijker voor de kinderen'),
(13, 'Optioneel');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `games`
--

CREATE TABLE `games` (
  `gameID` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(1024) NOT NULL,
  `floorplanUrl` varchar(1024) NOT NULL,
  `minPlayers` int(11) NOT NULL,
  `type` varchar(256) NOT NULL,
  `gradeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `games`
--

INSERT INTO `games` (`gameID`, `title`, `description`, `imageUrl`, `floorplanUrl`, `minPlayers`, `type`, `gradeID`) VALUES
(1, 'Kat en Muis', 'Er wordt een kat gekozen, de rest is een muis. Ben je een muis, dan stop je een lintje in je broek, zodat het lijkt op een staart. Het doel van het spel is dat de katten de muizen vangen. Dit doen ze door een lintje uit de broek te trekken. Als dit is gelukt moet het lintje aan de juf of meester gegeven worden. Is jouw lintje afgepakt? Dan word je ook een kat. Het spel is afgelopen als alle lintjes gepakt zijn.', './assets/img/games/katenmuis.png', './assets/img/games/floorplan/katenmuis.png', 5, 'Tikspel', 8),
(2, 'Pionnenroof', 'Er worden twee teams gemaakt, 1 team zijn de rovers. Het andere team zijn de tikkers. Beide teams beginnen aan hun eigen kant van het veld. De tikkers hebben voor hen een rij met pionnen. Het doel van het spel is om voor de rovers zoveel mogelijk pionnen te roven. Zodra een rover een pion heeft gepakt mag deze getikt worden door een tikker. De rover moet proberen zonder getikt te worden de pion over de eigen achterlijn te krijgen. Ben je wel getikt? Dan moet de pion weer teruggelegd worden. Hoeveel pionnen kunnen de rovers pakken binnen 2 minuten.', './assets/img/games/pionnenroof.png', './assets/img/games/floorplan/pionnenroof.png', 2, 'Tikspel', 8),
(3, 'Fopbal', 'Maak een grote kring met één iemand in het midden(de fopper), die heeft de bal. De leerlingen in de kring(de vangers)houden de handen achter de rug. De leerling in het midden mag steeds de bal echt of nep (fop) gooien. Gooit de leerling nep, maar komen jouw handen wel zichtbaar achter jouw rug vandaag? Dan ben je af en ga je zitten. Gooit de leerling de bal echt maar vang jij deze niet? Dan ben je ook af en ga je zitten. Vang je de bal wel of blijven je handen netjes achter je rug als de fopperjou fopt? Dan blijf je meedoen. De laatste die over blijft mag de rol van fop gooier op zich nemen.', './assets/img/games/fopbal.png', './assets/img/games/floorplan/fopbal.png', 3, 'Balspel', 8),
(4, 'Leeuwenkooi', 'Er worden twee tikker gekozen, dit zijn de nieuwe leeuwen. Beiden gaan in hun eigen vak staan. Alle andere leerlingen zijn de lopers en beginnen op de beginlijn. Deze leerlingen pakken allemaal een eigen stuk vlees (hoedje). Het doel is om als loper langs de twee leeuwen het vlees op de barbecue te krijgen. Hiervoor moet je aan de overkant zien te komen zonder getikt te worden. Word je toch getikt? Dan moet je het stuk vlees in het leeuwenhol leggen en moet je bij de slager een nieuw stuk vlees halen om het opnieuw te proberen. Lukt het om voorbij de leeuwen te komen en niet getikt te worden? Dan mag het stuk vlees op de barbecue. Het spel is afgelopen als alle stukken vlees op zijn.', './assets/img/games/leeuwenkooi.jpg', './assets/img/games/floorplan/leeuwenkooi.png', 5, 'Tikspel', 8),
(5, 'Estafette', 'Er worden twee of drie gelijke teams gemaakt. Beide teams beginnen aan de start en moeten op een bepaalde manier het parcours afleggen. Het doel is om sneller te zijn dan het andere team. Het team dat als eerste allemaal geweest is wint. De manier waarop het parcours wordt afgelegd wordt bedacht door de juf of meester. Dit kan bijvoorbeeld rennend zijn, of kruipend, achteruit rennend of met verschillende oefeningen tussendoor. Denk hierbij bijvoorbeeld aan een rondje om de pion heen of opdrukken.', './assets/img/games/estafette.jpg', './assets/img/games/floorplan/estafette.png', 6, 'Loopspel', 2),
(6, 'Commandospel', 'Vooraf worden verschillende vormen van bewegen met elkaar doorgenomen. Denk hierbij bijvoorbeeld aan huppelen, knie heffen, staan en zitten. Het is de bedoeling om goed te luisteren naar de juf of meester. Deze geeft namelijk een opdracht in de vorm van een beweging. De leerlingen moeten deze uitvoeren. Zegt de juf of meester “commando huppelen” dan moet je huppelen. Zegt de juf of meester “huppelen” dan moet je niet huppelen, want er is geen commando voor gezegd. Ga je alsnog huppelen? Dan ben je af. Het spel is afgelopen als er nog 2 leerlingen over zijn.', './assets/img/games/commando.jpg', './assets/img/games/floorplan/commandospel.png', 2, 'Reactiespel', 8),
(7, 'Stresstikkertje', 'Er zijn twee teams, een team begint als tikkers en het andere team begint als lopers. Het tik team maakt een rij (naast elkaar) aan de rand van het speelveld (met hun gezicht naar het veld toe). Op het teken van de docent start de tijd en probeert de eerste tikker een van de lopers te tikken. Is dat gelukt dan sluit hij/zij achteraan in de rij van tikkers en mag de volgende proberen om iemand te tikken, de getikte loper gaat bij de docent staan/zitten. Heeft het tik team alle lopers getikt dan stopt de tijd, de docent onthoudt de tijd. Dan draaien de rollen om, de tikkers worden de lopers en de lopers worden de tikkers. Na twee rondes worden de tijden met elkaar vergeleken, het team met de snelste tijd wint.', './assets/img/games/stresstikkertje.png', './assets/img/games/floorplan/stresstikkertje.png', 8, 'Tikspel', 5),
(8, 'Eindvakbal', 'Er wordt gespeeld in 2 even grote teams. Je moet met je team al overspelend de bal in het eindvak van de tegenstander krijgen. Als een teamgenoot de bal vangt terwijl hij in het eindvak staat heb je een punt en mag het andere team vanaf die plek beginnen om hetzelfde te doen naar het andere eindvak. Je kan de bal onderscheppen door hem te pakken als hij op de grond valt of hem uit de lucht te vangen. Je mag dan gelijk vanaf die plek proberen in het eindvak van de tegenstander te komen.', './assets/img/games/eindvakbal.jpg', './assets/img/games/floorplan/eindvakbal.png', 6, 'Balspel', 5),
(9, 'Lummelen', 'De leerlingen staan in een kring en hebben een bal. 1 kind staat in het midden van de kring en is de lummel. Het is de bedoeling dat de lummel de bal afpakt. Als de lummel de bal afpakt is degene die als laatst de bal heeft aangeraakt de nieuwe lummel en mag de oude lummel ook in de kring staan en overgooien.', './assets/img/games/lummelen.jpg', './assets/img/games/floorplan/lummelen.png', 5, 'Balspel', 5),
(10, 'Annemaria Koekoek', 'De leerlingen maken een rij naast elkaar op de startlijn. De docent staat op minimaal 10 meter afstand tegenover de leerlingen, de docent is de zoeker.  De zoeker draait zich met de rug naar de leerlingen toe en roept ‘’Annemaria Koekoek’, nu mogen de leerlingen proberen naar voren te lopen. Als de zoeker klaar is met roepen, draait deze zich. De leerlingen moeten stoppen met lopen zodra de zoeker zich heeft opgedraaid. Als een leerling beweegt en de zoeker ziet dit, dan mag de zoeker de leerling terugsturen naar de startlijn. Bijvoorbeeld: ‘’Ja, (naam) jij bent af, ik zag je bewegen’. De leerling die af was, start opnieuw bij de start lijn en mag weer meedoen zodra de zoeker begint met roepen. De leerling die als eerste bij de zoeker is, heeft gewonnen en wordt de nieuwe zoeker.', './assets/img/games/annemariea-koekoek.jpg', './assets/img/games/floorplan/annemariakoekoek.png', 5, 'Loopspel', 8),
(11, 'Moeder hoe laat is het?', 'De leerlingen maken een rij naast elkaar voor de pionnen, de docent gaat tegenover de leerlingen staan op minimaal 10 meter afstand. De docent is de ‘moeder’, de leerlingen zijn de kinderen. Op het teken van de docent zeggen de kinderen tegelijk ‘Moeder, moeder, hoe laat is het?’, dan kiest de docent een getal (1 t/m 12). Kiest de docent het getal 3 dan zegt hij/zij ‘Het is 3 uur’. Dan zetten de kinderen tegelijk 3 stappen vooruit. Daarna vragen ze opnieuw ‘Moeder, moeder, hoe laat is het?’, weer kiest de docent een getal en zegt bijvoorbeeld ‘Het is 8 uur’, de kinderen zetten nu tegelijk8 stappen vooruit. Dit gaat zo door totdat het antwoord van de docent is ‘Het is bedtijd!’, dan moeten de kinderen zo snel mogelijk terugrennen naar de startlijn terwijl de docent probeert een van de kinderen te pakken. Is het de docent gelukt om een van de kinderen te pakken dan is dat kind de volgende ronde de ‘moeder’.', './assets/img/games/moeder-hoe-laat-is-het.png', './assets/img/games/floorplan/moederhoelaatishet.png', 5, 'Tikspel', 5),
(12, 'Dieren parade', 'Bij dit spel is het de bedoeling dat de leerlingen zoveel mogelijk dieren gaan uitbeelden. Maak met pionnen twee lijnen met een aantal meter ertussen (ongeveer 10 meter). De leerlingen maken een rij naast elkaar op een van de lijnen, iedereen moet voldoende ruimte hebben en alle leerlingen kijken dezelfde kant op. De docent noemt een dier en de leerlingen lopen naar de overkant als het genoemde dier. Het is geen snelheidswedstrijd! Het gaat erom wie het beste dat dier na kan do', './assets/img/games/dierenparade.jpeg', './assets/img/games/floorplan/dierenparade.png', 3, 'Tikspel', 3),
(20, 'Hardlopen', 'Heel gezond voor kinderen!', './assets/img/games/hardlopen.jpg', './assets/img/games/floorplan/hardlopen.jpg', 2, 'Fitness', 7);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `game_difficulty`
--

CREATE TABLE `game_difficulty` (
  `gameID` int(11) NOT NULL,
  `difficultyID` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `game_difficulty`
--

INSERT INTO `game_difficulty` (`gameID`, `difficultyID`, `description`) VALUES
(1, 1, 'Met meerderekatten beginnen'),
(1, 1, 'Af? Dan word je ook een kat (bij een groep van 15 tot 30 leerlingen'),
(1, 1, 'Iedereen is een kat en iedereen is een muis, wordt jouw lintje afgepakt dan probeer je zo snel mogelijk een nieuw lintje af te pakken. Heb je een staart en pak je er nog een af, dan doe je die schuin om je nek.'),
(1, 2, 'Met minder katten beginnen'),
(1, 2, 'Staarten korter, meer in de broek stoppen'),
(1, 2, 'Af? Dan aan de kant staan'),
(2, 3, '1 leerling te gelijk laten roven'),
(2, 3, 'Afstand tussen startlijn en tikker vergroten'),
(2, 3, '2 tikkers gebruiken '),
(2, 4, 'Alle leerlingen tegelijk laten starten met roven'),
(2, 4, 'Speelveld kleiner maken'),
(3, 5, 'Alle leerlingen in de kring hebben een extra kans.Tweede keer fout gemaakt? Dan pas ben je echt af en ga je zitten'),
(3, 5, 'Kring groter maken om afstand van het gooien te vergroten.'),
(3, 6, 'Kring kleiner maken om afstand van gooien te verkleinen.'),
(4, 7, 'Veld kleiner maken'),
(4, 7, 'Meer leeuwen per kooi'),
(4, 8, 'Veld groter maken'),
(4, 8, 'Minder leeuwen per kooi'),
(5, 5, '1 opdracht uitvoeren'),
(5, 6, 'Meerder opdracht uitvoeren'),
(6, 5, 'Minder verschillende vormen van bewegen'),
(6, 5, 'Met een fluitje. 1 keer fluiten is dan bijvoorbeeld huppelen, 2 keer fluiten stilstaan en 3 keer fluiten zitten op de grond. Hierbij is de leerling af die als laatste de opdracht uitvoert.'),
(6, 5, 'Ben je af? Dan doe je een opdracht (bijvoorbeeld 5 keer opdrukken) en daarna mag je weer meedoen'),
(6, 5, 'Ben je af? Dan moet je zitten aan de kunt. Zitten er drie leerlingen aan de kant, dan mag de eerste weer meedoen (drie is te veel)'),
(6, 6, 'Meer verschillende vormen van bewegen'),
(6, 6, 'Twee vormen van bewegen omwisselen. Zegt de juf of meester nu ‘huppelen’ dan moet je staan, en zegt de juf of meester ‘staan’ dan moet je huppelen.'),
(7, 5, 'Er mogen twee tikkers tegelijk het veld in om ieder 1 iemand te tikken'),
(7, 6, 'Het tik team heeft maximaal 2 minuten om zoveel mogelijk lopers te tikken'),
(8, 5, 'Eindvak groter maken'),
(8, 5, 'Je mag 1 stap zetten als je de bal hebt'),
(8, 6, 'Kleiner eindvak'),
(8, 6, 'Langer veld'),
(8, 6, 'Je mag de bal uit de handen slaan'),
(9, 5, 'Maak de kring kleiner, zo kan er makkelijker overgegooid worden en is het tegelijk makkelijker om iemand te tikken'),
(9, 6, 'Degene in het midden mag nu ook iemand tikken die de bal vast heeft, wordt je getikt dan moet je in het midden'),
(9, 6, 'Extra lummel toevoegen'),
(10, 9, 'Makkelijker voor de zoekers: twee zoekers bij de muur. De zoekers roepen samen Annemaria Koekoek. Bij het zoeken mogen ze beide kijken welke leerlingen er lopen.'),
(10, 9, 'Makkelijker voor de lopers: mee aan de hand van een docent of een andere leerling'),
(11, 11, 'Makkelijker voor de moeder: twee moeders, ze geven om de beurt aan hoe laat het is en bij ‘Bedtijd!’ proberen ze allebei een kind te pakken'),
(11, 12, 'Makkelijker voor de kinderen: De lijn waarachter ze vrij zijn wordt naar voren verplaatst'),
(12, 13, 'Als het goed gaat kan je aan de leerlingen vragen of zij nog dieren kennen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `game_materials`
--

CREATE TABLE `game_materials` (
  `gameID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `game_materials`
--

INSERT INTO `game_materials` (`gameID`, `materialID`, `amount`) VALUES
(1, 1, 2),
(1, 2, 4),
(2, 1, 2),
(2, 2, 2),
(2, 3, 3),
(2, 4, 3),
(3, 2, 1),
(3, 5, 1),
(4, 1, 1),
(4, 2, 1),
(4, 6, 2),
(4, 7, 4),
(6, 2, 1),
(7, 1, 3),
(7, 8, 2),
(8, 1, 3),
(8, 5, 3),
(9, 5, 1),
(10, 3, 2),
(11, 1, 1),
(11, 3, 4),
(12, 3, 1),
(14, 2, 0),
(14, 4, 0),
(14, 3, 0),
(5, 1, 0),
(5, 2, 0),
(5, 3, 0),
(5, 4, 0),
(5, 5, 0),
(5, 6, 0),
(5, 7, 0),
(15, 1, 0),
(15, 2, 0),
(16, 4, 0),
(16, 3, 0),
(16, 2, 0),
(17, 3, 0),
(18, 2, 0),
(19, 6, 0),
(20, 2, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `game_rules`
--

CREATE TABLE `game_rules` (
  `gameID` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `game_rules`
--

INSERT INTO `game_rules` (`gameID`, `description`) VALUES
(1, 'Lintje moet zichtbaar zijn voor de kat'),
(2, 'Rover met pion over de eigen lijn? Pion houden'),
(2, 'Rover met pion getikt voordat eigen lijn bereikt is? Pion inleveren aan tikker'),
(2, 'Tikker mag rover pas tikken als deze een pion gepakt heeft'),
(3, 'Bal onderhands gooien'),
(3, 'Een slecht aangegooide bal telt niet, opnieuw proberen'),
(4, 'Leeuwen mogen alleen in hun kooi tikken'),
(4, 'Lopers mogen maar 1 stuk vlees per keer meenemen'),
(9, 'Je mag niet lopen met de bal'),
(5, 'Oneven aantal? Dan moet het team met minder leerlingen iemand kiezen die twee keer gaat. Deze leerling begint als eerst'),
(9, 'De lummel mag wel lopen'),
(9, 'De eerst bal is vrij, de bal mag dus pas worden afgepakt als er voor de tweede keer gegooid wordt'),
(6, 'Voer je de opdracht verkeerd uit, dan ben je af'),
(6, 'Voer je als laatste de opdracht uit, dan ben je af'),
(10, 'De leerling mag altijd lopen, maar zodra de zoeker je ziet is de kans groot dat je terug moet naar de startlijn.'),
(10, 'Als een leerling loopt en de zoeker ziet het, dan is een leerling af. '),
(7, 'Elke tikker mag maar 1 persoon tikken'),
(7, 'Heb je iemand getikt dan sluit je weer achteraan in de rij bij je team'),
(7, 'Ben je getikt dan ga je bij de docent staan of zitten'),
(11, 'De kinderen moeten steeds tegelijk vragen ‘Moeder, moeder, hoe laat is het?’'),
(8, 'Niet lopen met de bal (dus je moet overgooien'),
(8, 'Bal niet uit de handen slaan'),
(8, 'Als er een punt wordt gemaakt begint het andere team vanaf die plek'),
(11, 'Zegt moeder dat het 5 uur is, dan zetten de kinderen 5 stappen'),
(11, 'Tijdens het lopen tellen de kinderen hardop de stappen'),
(12, 'Het is geen wedstrijd'),
(12, 'Ben je aan de overkant aangekomen dan draai je je weer om en ga je klaarstaan voor het volgende dier'),
(17, 'niet te hard!'),
(19, 'Niet te hard!'),
(20, 'Niet te hard!');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `grades`
--

CREATE TABLE `grades` (
  `gradeID` int(11) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `grades`
--

INSERT INTO `grades` (`gradeID`, `description`) VALUES
(1, 'Groep 1'),
(2, 'Groep 2'),
(3, 'Groep 3'),
(4, 'Groep 4'),
(5, 'Groep 5'),
(6, 'Groep 6'),
(7, 'Groep 7'),
(8, 'Groep 8');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `lessons`
--

CREATE TABLE `lessons` (
  `lessonID` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `lessons`
--

INSERT INTO `lessons` (`lessonID`, `title`, `description`, `userID`) VALUES
(2, 'Helllo', 'sdad', 1),
(3, 'Groep 7 spellen', 'Helllo', 1),
(4, 'Yes', 'Yes', 1),
(5, 'Kleuterklas lessen', 'Voor alle kleuters', 2),
(8, 'Groep 5 lessen', 'Meer informatie', 2),
(9, 'adasdasd', 'asdasd', 2),
(10, 'sadasda', 'sdadsa', 2),
(11, 'sASadkms', 'asdsa', 2),
(12, 'Maak de kinderen af', 'Laat ze zich doodhollen', 4),
(13, 'Dafck is this shit', 'Lole123', 4),
(14, '123', '123', 4),
(15, 'Les 5', 'les 5', 4),
(16, 'yes', 'yes', 2),
(17, 'yes', 'yes', 2),
(18, 'Kleuterklas lessen', 'Voor alle kleuters', 2),
(22, 'Les 2', 'Les voor dinsdag', 3),
(23, 'huh', 'wat is dit?', 5);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `lesson_games`
--

CREATE TABLE `lesson_games` (
  `lessonID` int(11) NOT NULL,
  `gameID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `lesson_games`
--

INSERT INTO `lesson_games` (`lessonID`, `gameID`) VALUES
(2, 1),
(8, 6),
(5, 6),
(18, 5),
(5, 5),
(18, 9),
(18, 3),
(1, 5),
(6, 5),
(6, 9),
(7, 2),
(20, 6),
(20, 7),
(20, 2),
(19, 5),
(21, 9),
(21, 5),
(22, 5),
(2, 5),
(11, 6),
(2, 5),
(23, 5),
(24, 6);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `material`
--

CREATE TABLE `material` (
  `materialID` int(11) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `material`
--

INSERT INTO `material` (`materialID`, `description`) VALUES
(1, 'Lintjes'),
(2, 'Fluitje'),
(3, 'Pionnetjes'),
(4, 'Klokje'),
(5, 'Bal'),
(6, 'Hoedjes'),
(7, 'Hoepels'),
(8, 'Stopwatch');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `rating`
--

CREATE TABLE `rating` (
  `userID` int(11) NOT NULL,
  `gameID` int(11) NOT NULL,
  `rating` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `rating`
--

INSERT INTO `rating` (`userID`, `gameID`, `rating`) VALUES
(2, 1, '3'),
(2, 3, '5'),
(2, 2, '5'),
(1, 2, '5'),
(2, 6, '4'),
(2, 8, '5'),
(11, 2, '2'),
(2, 9, '3'),
(1, 7, '4'),
(1, 1, '2'),
(1, 5, '4'),
(1, 12, '4'),
(2, 10, '5'),
(3, 1, '4'),
(3, 5, '3'),
(3, 9, '5'),
(2, 12, '4'),
(2, 11, '3'),
(3, 8, '3'),
(2, 7, '3'),
(3, 12, '2');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `firstname` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`userID`, `firstname`, `lastname`, `password`, `username`, `isAdmin`) VALUES
(1, 'saif', 'rashed', '$2b$10$BERLmzmob6Mi4Lu/XTV1FOjinOBUO24oQRPBEXohodWEmiHZHsb6G', 'saifeddine101', 1),
(2, 'hans', 'klok', '$2b$10$N2nDrC2nz7RiABHJEMX62eFPFbm6lJXgb5RuRRriGEEk2mfd/sP/m', 'hansie101', 0),
(3, 'yasser', 'ali', '$2b$10$R2HPEMWOpz7S1ttr9yyNAuAXw00e8Ps2SPYUvaZOsCjDpylKCfomq', 'ressay123', 1),
(4, 'marvin', 'hesselmans', '$2b$10$1crR/q7YCJn68AVgw/p68uZDARs/BkUrI7dxrCZSMY0g30ybxJlUO', 'dunstopme', 0),
(5, '1', '1', '$2b$10$OGOqw1QMVm6JQINcwxUPxeKgdYuE9qu6ZmgMMHx4qxl.eppNKY9Ey', '1', 0),
(6, 'yasser', 'ali', '$2b$10$QZ0/vhYrkmUaIN0pXaJyK.Wn.Rcr9lq3G0uHP9IINZfXFyJCQ9aIG', 'ressay1', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_favorites`
--

CREATE TABLE `user_favorites` (
  `userID` int(11) NOT NULL,
  `gameID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user_favorites`
--

INSERT INTO `user_favorites` (`userID`, `gameID`) VALUES
(2, 2),
(2, 1),
(1, 9),
(1, 10),
(1, 5);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `difficulty`
--
ALTER TABLE `difficulty`
  ADD PRIMARY KEY (`difficultyID`);

--
-- Indexen voor tabel `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameID`);

--
-- Indexen voor tabel `game_difficulty`
--
ALTER TABLE `game_difficulty`
  ADD KEY `gameID` (`gameID`,`difficultyID`);

--
-- Indexen voor tabel `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`gradeID`);

--
-- Indexen voor tabel `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lessonID`);

--
-- Indexen voor tabel `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`materialID`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `difficulty`
--
ALTER TABLE `difficulty`
  MODIFY `difficultyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT voor een tabel `games`
--
ALTER TABLE `games`
  MODIFY `gameID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT voor een tabel `grades`
--
ALTER TABLE `grades`
  MODIFY `gradeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT voor een tabel `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lessonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT voor een tabel `material`
--
ALTER TABLE `material`
  MODIFY `materialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
