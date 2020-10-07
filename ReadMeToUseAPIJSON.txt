NASDAQ_SPA
La presente è una single page application che permette di:

- ricercare un'azienda quotata in borsa;
- aggiungere lo stock relativo ad una lista di preferiti;
- monitorare in tempo reale la variazione del valore del mercato ogni 5 secondi;
- studiare l'andamento del grafico (ascissa: tempo, ordinata: prezzo) in tempo reale.


GUIDA ALL'UTILIZZO

STEP 1)
Scaricare il file zip 'nasdaq_spa' ed aggiungerlo alla cartella di lavoro di VSC.
In alternativa, clonare la directory git.

STEP 2)
Installare i node modules utilizzati in fase di sviluppo:da terminale, recarsi nella
directory del programma in locale ed eseguire il comando:

npm i

STEP 3)
Per lanciare la SPA, digitare il comando:

npm start


L'interfaccia principale dell'App presenta:
- Titolo;
- Barra di ricerca;
- Bottone Top Stock;
- Lista preferiti (Portafoglio personale stock);

Il programma è stato realizzato utilizzando dati fittizi al fine di testare la funzionalità
delle varie operazioni.
Tuttavia è possibile ricercare i veri Stock reperibili tramite API JSON per aggiungerli al
portafoglio personale dei preferiti.

                            _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*** Passi opzionali per accedere ai dati API Nasdaq **

STEP 4)
Per effettuare la chiamata Fetch bisogna prima registrarsi gratuitamente al seguente link:

https://financialmodelingprep.com

Non appena si sarà completata la registrazione, verrè rilasciato un API KEY tramite il quale
si potrà effettuare una chiamata Fetch ai dati relativi agli stock.

STEP 5) 
Copiare ed incollare la key in App.js nella voce:

const API_KEY = '';
(esempio: const API_KEY = 'apikey=936462749203dhcc');

Salvare la nuova modifica. In questo modo l'app verra riavviata con la vostra API KEY.