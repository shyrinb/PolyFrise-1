# Polyfrise

## Base De Données:

1. Installer XAMPP comme panneau de commande pour utiliser MySQL comme base de données.
    Téléchargez XAMPP depuis le site officiel.
    Suivez les instructions d'installation appropriées pour votre système d'exploitation.
2. Une fois l'installation terminée, lancez XAMPP et démarrez Apache et MySQL depuis le panneau de commande.
    Accédez à phpMyAdmin en ouvrant votre navigateur et en entrant l'URL correspondante (généralement   http://localhost/phpmyadmin/).

3. Créez les deux bases de données : polyfrise_development et polyfrise_production.
4. Modifiez le fichier .env avec les paramètres de votre base de données.
5. Utilisez la commande suivante pour insérer les données via le fichier polyfrise_dev.sql:

```bash
mysql -u VOTRE_UTILISATEUR -p VOTRE_MOT_DE_PASSE polyfrise_development < chemin/vers/polyfrise_dev.sql
```



## Backend

### Installation
Tout d'abord, dans le répertoire backend, exécutez la commande suivante pour installer les dépendances :

```bash
cd backend
npm install
```

Si cela ne fonctionne pas, vous pouvez essayer :
```bash
npm install --force
```

### Variable d'environnement
Assurez-vous de mettre à jour la variable d'environnement dans le répertoire .env

### Mode Production

```bash
npm run prod
```
Cela lance l'application en mode production.

### Mode Développement

```bash
npm run dev
```
Cela lance l'application en mode développement.

## Fontend :

Dans un autre terminal, allez dans le répertoire frontend et exécutez :

```bash
cd frontend
ng serve
```

Cela lance l'application frontend sur localhost:4200. Vous pouvez ouvrir votre navigateur et accéder à cette URL pour utiliser l'application.

Assurez-vous également d'avoir correctement configuré les variables d'environnement nécessaires pour le backend et le frontend.
