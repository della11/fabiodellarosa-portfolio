# Portfolio Fabio Della Rosa

## Sviluppo locale

Usa Node.js 22 ed esegui `npm ci`. Copia
`src/environments/environment.example.ts` in `src/environments/environment.ts`,
inserisci la configurazione Firebase web del progetto ed esegui `npm start`.
Il file `environment.ts` è escluso da Git.

## Pubblicazione su GitHub Pages

Il workflow `.github/workflows/deploy-pages.yml` pubblica ogni push su `main`.
Puoi avviarlo anche da **Actions → Deploy to GitHub Pages → Run workflow**,
selezionando `main`.

Configurazione iniziale del repository:

1. In **Settings → Pages → Build and deployment**, seleziona **GitHub Actions**
   come Source.
2. In **Settings → Secrets and variables → Actions → New repository secret**,
   crea `FIREBASE_CONFIG`. Incolla soltanto l'oggetto `firebase` del tuo
   environment, in JSON valido: doppi apici, senza `export`, senza `production`
   e senza virgole finali. La struttura è:

   ```json
   {
     "apiKey": "YOUR_FIREBASE_WEB_API_KEY",
     "authDomain": "YOUR_PROJECT.firebaseapp.com",
     "projectId": "YOUR_PROJECT",
     "storageBucket": "YOUR_STORAGE_BUCKET",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "appId": "YOUR_APP_ID"
   }
   ```

3. Fai commit e push del workflow su `main`. Dopo il deploy, il sito sarà su
   <https://della11.github.io/fabiodellarosa-portfolio/>.

Il workflow genera l'environment di produzione, esegue `npm ci` e la build,
quindi pubblica soltanto `dist/fabiodellarosa-portfolio/browser`. Il percorso
base arriva da GitHub Pages, così gli asset funzionano anche nel sottopercorso
del repository. Firebase Hosting continua a usare la sua configurazione attuale.

La configurazione Firebase client rimane leggibile nel JavaScript pubblicato:
il secret la esclude dai sorgenti, non dal browser. Proteggi le scritture con
Firebase Authentication e Security Rules; il controllo admin in `localStorage`
non costituisce autorizzazione. Non inserire credenziali di service account nel
secret. Escludere l'environment non lo rimuove dai commit precedenti.

Riferimenti: [workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
e [API key Firebase](https://firebase.google.com/docs/projects/api-keys).
