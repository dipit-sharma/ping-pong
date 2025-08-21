#!/bin/bash

# AWS EC2 Full-Stack Setup Script for Ping Pong Game
echo "🏓 Setting up Full-Stack Ping Pong Game on AWS EC2..."

# Update system packages
sudo yum update -y

# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
nvm alias default 18

# Install PM2 for process management
npm install -g pm2

# Install nginx for serving static files
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Create directories
mkdir -p /home/ec2-user/ping-pong-app
cd /home/ec2-user/ping-pong-app

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend for web
echo "��️ Building frontend for web..."
npm run build:web

# Install backend dependencies
cd server
npm install

# Create PM2 ecosystem file for both frontend and backend
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'ping-pong-server',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'ping-pong-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/ec2-user/ping-pong-app',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
EOF

# Configure nginx
sudo tee /etc/nginx/conf.d/ping-pong.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    # Serve frontend static files
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy Socket.IO connections to backend
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Restart nginx
sudo systemctl restart nginx

# Start both services with PM2
cd /home/ec2-user/ping-pong-app/server
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Full-stack setup complete!"
echo " Frontend: http://51.21.193.65"
echo "🔧 Backend: http://51.21.193.65:3001"
echo "📊 Check status: pm2 status"