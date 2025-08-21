#!/bin/bash

# AWS EC2 Setup Script for Ping Pong Server
echo "🏓 Setting up Ping Pong Server on AWS EC2..."

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

# Navigate to server directory
cd /home/ec2-user/ping-pong-server

# Install dependencies
npm install

# Create PM2 ecosystem file
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
      script: 'npx',
      args: 'serve dist -p 3000',
      cwd: '/home/ec2-user/ping-pong',
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

# Start the server with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Server setup complete!"