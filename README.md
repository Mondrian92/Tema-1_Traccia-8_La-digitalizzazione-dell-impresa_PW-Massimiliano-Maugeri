# La digitalizzazione dell’impresa

Una web app sviluppata in React e TypeScript pensata come dashboard per aziende che desiderano digitalizzare i propri processi.  
Il progetto permette di visualizzare dati aziendali, gestire informazioni in modo interattivo e integrare soluzioni per l’efficienza digitale.

## Prerequisiti

Assicurati di avere installato:

•⁠  ⁠[Node.js](https://nodejs.org/) versione *20.7.0* o superiore  
•⁠  ⁠[Yarn](https://yarnpkg.com/) versione *4.9.4* o superiore

Per verificare le versioni installate:
1. Apri il terminale
2. Usa `node -v ` per verificare la versione di node
3. Usa `yarn -v` per verificare la versione di yarn

## Installazione

1. Crea una cartella in locale dove posizionare il progetto e aprila con il tuo ide (per esempio VSCode)

2.⁠ ⁠Clona il repository:
   `git clone https://github.com/Mondrian92/Tema-1_Traccia-8_La-digitalizzazione-dell-impresa_PW-Massimiliano-Maugeri.git  `

2.⁠ ⁠Entra nella cartella del progetto:
   `cd Tema 1 - Traccia 8 - La digitalizzazione dell'impresa - PW Massimiliano Maugeri`  

3.⁠ ⁠Installa le dipendenze:
   `yarn`  

## Comandi disponibili

Nel progetto sono definiti i seguenti script nel file package.json:

| Comando | Descrizione |
|----------|-------------|
| yarn dev | Avvia il server di sviluppo con Vite |
| yarn build | Esegue la build di produzione (TypeScript + Vite) |
| yarn preview | Avvia l’anteprima della build di produzione |
| yarn typecheck | Controlla la validità dei tipi TypeScript |
| yarn lint | Esegue ESLint e Stylelint per verificare la qualità del codice |
| yarn prettier | Controlla la formattazione del codice con Prettier |
| yarn prettier:write | Corregge automaticamente la formattazione del codice |

Per esempio, per avviare la web app in modalità sviluppo:
`yarn dev`

## Struttura del progetto

la-digitalizzazione-dell-impresa/  
├── src/                 → Codice sorgente React e TypeScript  
├── public/              → File statici  
├── vite.config.ts       → Configurazione Vite  
├── tsconfig.json        → Configurazione TypeScript  
├── package.json         → Dipendenze e script npm/yarn  
└── README.md            → Questo file  

## Tecnologie principali

•⁠  ⁠React 19  
•⁠  ⁠TypeScript 5.9  
•⁠  ⁠Vite 7  
•⁠  ⁠Mantine (UI framework)  
•⁠  ⁠Recharts (grafici)  
•⁠  ⁠React Router DOM (routing)  
•⁠  ⁠React Intl (localizzazione)  
•⁠  ⁠PapaParse (gestione CSV)  

## Licenza

Questo progetto è attualmente privato.  
L’uso e la distribuzione sono riservati al team di sviluppo.