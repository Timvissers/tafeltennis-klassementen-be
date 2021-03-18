# Tafeltennis klassementsbepaling algoritmes Belgie (VTTL, KBBTB, AFTT)

De veelgebruikte algoritmes voor hernieuwing van het klassement op basis van resultaten.

Ontwikkeld in plain javascript (ecmascript 5) API, met als doel deze algoritmes ook te kunnen gebruiken vanuit Google AppScript.

De input parameters (basisresultaten) zijn bepaald op een manier waarop het mogelijk is Google Sheet ranges te ondersteunen.

Deze library geeft een open implementatie van de beschreven algoritmes op http://tabt.frenoy.net. De algoritmes zijn open
source en kunnen een inspiratie zijn, gebruikt worden voor debugging, geforked worden voor eigen aanpassingen.

Buiten LK, VLB, RES en MER, worden ook de algoritmes voor GOF en een minder relevant 'algoritme' op basis van ELO punten aangeboden.

## Alternatieve resources

De website https://www.ttcsintpauwels.be/competitie/vttl/bereken-je-klassement/ biedt zelf ontwikkelde algoritmes aan, inclusief een web
interface en vooraf ingevulde ontmoetingen voor het huidige competitiejaar. De algoritmes zijn zeker niet identiek aangezien er ruimte voor
interpretatie gelaten is en parameters geheim worden gehouden (wat betreft de officiele afhandeling van de klassementsbepalingen)
in de beschrijving van de algortimes op http://tabt.frenoy.net.

## Algoritmes

### Goodness of Fit (GOF)

http://tabt.frenoy.net/index.php?l=NL&display=MethodeGoodnessOfFit_NL

- Geen virtuele ontmoetingen toegevoegd.

### Limburg / Kempen (LK)

http://tabt.frenoy.net/index.php?l=NL&display=MethodeLimburgKempen_NL

- Nadeel van het algoritme: Je kan niet stijgen van klassement indien je niet tegen hogere klassementen speelde.
- Bug van het algoritme: Incorrect hoger klassement toegekend indien je niet tegen hogere klassement speelde en je je huidige klassement opnieuw behaald.
    - Dit is opgevangen in de implementatie door geen hoger klassement te geven. Let op, dit kan ook incorrect zijn indien tegen nog hogere klassementen een positief saldo werd gehaald.

verschil met https://www.ttcsintpauwels.be/competitie/vttl/bereken-je-klassement/: geen?

### Vlaams Brabant (VLB)

http://tabt.frenoy.net/index.php?l=NL&display=MethodeVlb_NL

- 'gekozen' parameters:

    V = 1 (bonuspunten voor elke overwinning)

    D = 1 (verliespunten voor elke overwinning)

    N = 5 (bonuspunten voor overwinning tegen hoger gerangschikte speler

    M = 5 (verliespunten voor overwinning tegen lager gerangschikte speler)

- 'gekozen' pivot functie:

    aantalMatchen < 20: degradeer 1 klassement

    aantalMatchen >= 80: zone pivotPoints rood is <-15, groen is >15

    aantalMatched >=20 en <80: y = (-5/12)*x + (145/3); waar y = pivotPointsBorder en x = aantalMatchen

verschil met https://www.ttcsintpauwels.be/competitie/vttl/bereken-je-klassement/: andere schattingen voor parameters en pivot functie

### Residu (RES)

gebaseerd op http://tabt.frenoy.net/index.php?l=NL&display=MethodeResidu_NL

- Virtuele ontmoetingen toegevoegd als de speler minder dan 40 ontmoetingen heeft of zijn percentage gewonnen of verloren wedstrijden < 10% is

verschil met https://www.ttcsintpauwels.be/competitie/vttl/bereken-je-klassement/: hier worden de virtuele ontmoetingen niet toegevoegd.

### Elo gebaseerd (ELO)

Let op, ELO is altijd een momentopname en niet representatief voor een langere periode

http://tabt.frenoy.net/index.php?l=NL&display=MethodePointsELO_NL


## Geaggregeerde algoritmes

### Meerderheid (MER)

gebaseerd op http://tabt.frenoy.net/index.php?l=NL&display=MethodeMeerderheid_NL

geen verschil in algoritme met https://www.ttcsintpauwels.be/competitie/vttl/bereken-je-klassement/

### Aile Francophone (AF)

http://tabt.frenoy.net/index.php?l=NL&display=MethodeAileFrancophone_FR

niet geimplementeerd. onduidelijke beschrijving

## Uitvoeren

Dependencies opzetten

    npm install

Testen runnen:

    npm run test

## Gebruik in Google Sheets

Alle src javascript files kunnen gekopieerd worden in Google Sheets. De imports en module exports moeten wel verwijderd worden.

[Voorbeeld](USAGE.md)

## Disclaimer

- De algoritmes zijn mogelijks niet accuraat indien weinig (relevante) resultaten voor handen. Sommige algoritmes vangen dit op, andere niet.
- De algoritmes zijn gemaakt voor NG-E-D-C klassement en niet ideaal voor B klassementen
- Kans- of gewichtparameters komen waarschijnlijk niet volledig overeen met die van de Bond. Dit geldt mogelijk ook voor de algoritme details.
