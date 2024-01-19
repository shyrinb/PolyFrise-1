# Utilisez une image de Node.js officielle en tant que base
FROM node:14

# Créez le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Installation du client MySQL
RUN npm install mysql

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 3000

# Démarrez votre application
CMD ["npm", "start"]
