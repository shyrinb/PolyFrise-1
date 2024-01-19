# Utilisez une image de Node.js officielle en tant que base
FROM node:14 as build

# Créez le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application Angular
RUN npm run build

# Utilisez une image légère pour le déploiement
FROM nginx:alpine

# Copiez les fichiers de build depuis l'image de construction
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/

# Exposez le port 80
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]