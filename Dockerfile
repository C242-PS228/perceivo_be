# Gunakan image node:20.18.0-slim sebagai base
FROM node:20.18.0-slim

# Tentukan working directory di dalam container
WORKDIR /app

# Update npm ke versi terbaru yang tersedia
RUN npm install -g npm@latest

# Salin package.json dan package-lock.json ke working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file dari direktori saat ini ke dalam working directory di container
COPY . .

# Tentukan port yang akan digunakan oleh container
EXPOSE 3000

# Jalankan server menggunakan perintah npm start atau sesuai dengan script yang ada di package.json
CMD ["npm", "start"]
