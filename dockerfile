# Defina a imagem base
FROM node:20.1.0-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta que sua aplicação usa
EXPOSE 3000

# Defina o comando para iniciar sua aplicação
CMD [ "node", "server.js" ]