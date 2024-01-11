# Utilisez l'image de base pour votre frontend (par exemple, Node.js)
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers nécessaires du frontend dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Exposez le port sur lequel le frontend s'exécute
EXPOSE 4200

# Commande pour démarrer l'application frontend
CMD ["npm", "start"]


