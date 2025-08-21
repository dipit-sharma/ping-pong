# �� AWS EC2 Deployment Guide for Ping Pong Server

This guide explains how to deploy the Ping Pong Socket.IO server on AWS EC2 using the `ec2-setup.sh` script.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [EC2 Setup Script Breakdown](#ec2-setup-script-breakdown)
- [Step-by-Step Deployment](#step-by-step-deployment)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## �� Overview

The `ec2-setup.sh` script automates the deployment of our Socket.IO server on AWS EC2. It handles everything from installing Node.js to configuring PM2 for production process management.

## ✅ Prerequisites

Before running the setup script, ensure you have:

- ✅ AWS EC2 instance running Amazon Linux 2
- ✅ Security group configured with port 3001 open
- ✅ SSH access to your EC2 instance
- ✅ Server code uploaded to `/home/ec2-user/ping-pong-server`

## 🔧 EC2 Setup Script Breakdown

### **What the Script Does:**

```bash
#!/bin/bash
# AWS EC2 Setup Script for Ping Pong Server
echo "🏓 Setting up Ping Pong Server on AWS EC2..."
```

**Line-by-line explanation:**

#### **1. System Updates**
```bash
# Update system packages
sudo yum update -y
```
**Why?** Ensures your EC2 instance has the latest security patches and system packages.

#### **2. Node.js Installation**
```bash
# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
nvm alias default 18
```
**Why?** 
- **NVM (Node Version Manager)**: Allows easy Node.js version management
- **Node.js 18**: LTS version with good performance and security
- **Default alias**: Ensures Node.js 18 is used in new terminal sessions

#### **3. PM2 Installation**
```bash
# Install PM2 for process management
npm install -g pm2
```
**Why PM2?**
- **Process Management**: Keeps your server running even if it crashes
- **Auto-restart**: Automatically restarts the server if it goes down
- **Log Management**: Provides easy access to server logs
- **Monitoring**: Built-in monitoring and performance metrics

#### **4. Dependencies Installation**
```bash
# Navigate to server directory
cd /home/ec2-user/ping-pong-server

# Install dependencies
npm install
```
**Why?** Installs all required npm packages (Socket.IO, Express, CORS, etc.)

#### **5. PM2 Configuration**
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
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
  }]
};
EOF
```

**Configuration Breakdown:**
- **`name`**: Process name for PM2 management
- **`script`**: Entry point of your application
- **`instances`**: Number of server instances (1 for simple setup)
- **`autorestart`**: Automatically restart if the process crashes
- **`watch`**: Disabled to prevent restarts on file changes
- **`max_memory_restart`**: Restart if memory usage exceeds 1GB
- **`env`**: Environment variables for production

#### **6. Server Startup**
```bash
# Start the server with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**What each command does:**
- **`pm2 start`**: Starts the server using the configuration
- **`pm2 save`**: Saves the current PM2 process list
- **`pm2 startup`**: Configures PM2 to start on system boot

## 🚀 Step-by-Step Deployment

### **Step 1: Launch EC2 Instance**
1. Go to AWS Console → EC2 → Launch Instance
2. Choose Amazon Linux 2 AMI
3. Select instance type (t2.micro for free tier, t3.small for better performance)
4. Configure security group:
   ```
   HTTP (80)
   HTTPS (443)
   Custom TCP (3001) ← Important for Socket.IO
   SSH (22)
   ```

### **Step 2: Upload Server Code**
```bash
# From your local machine
scp -i your-key.pem -r server/ ec2-user@YOUR-EC2-IP:/home/ec2-user/ping-pong-server
```

### **Step 3: Connect and Run Setup**
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@YOUR-EC2-IP

# Make script executable and run it
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### **Step 4: Verify Deployment**
```bash
# Check if server is running
pm2 status

# Check server logs
pm2 logs ping-pong-server

# Test local connection
curl http://localhost:3001
```

## 🔍 Troubleshooting

### **Common Issues and Solutions:**

#### **1. Server Not Accessible from Outside**
**Problem**: `curl: (28) Failed to connect to [IP] port 3001`

**Solutions**:
- Check security group inbound rules
- Ensure server listens on `0.0.0.0` not just `localhost`
- Verify port 3001 is open

#### **2. PM2 Process Not Starting**
**Problem**: Server crashes or doesn't start

**Solutions**:
```bash
# Check PM2 logs
pm2 logs ping-pong-server

# Restart the process
pm2 restart ping-pong-server

# Check if Node.js is installed correctly
node --version
npm --version
```

#### **3. Memory Issues**
**Problem**: Server restarts frequently due to memory limits

**Solutions**:
- Increase `max_memory_restart` in ecosystem.config.js
- Monitor memory usage: `pm2 monit`
- Consider upgrading instance type

### **Useful Commands:**

```bash
# PM2 Management
pm2 status                    # Check all processes
pm2 logs ping-pong-server     # View server logs
pm2 restart ping-pong-server  # Restart server
pm2 stop ping-pong-server     # Stop server
pm2 delete ping-pong-server   # Remove from PM2

# System Monitoring
pm2 monit                     # Real-time monitoring
htop                          # System resource usage
netstat -tlnp | grep 3001     # Check if port is listening
```

## 🛠️ Maintenance

### **Regular Maintenance Tasks:**

#### **1. Update Dependencies**
```bash
cd /home/ec2-user/ping-pong-server
npm update
pm2 restart ping-pong-server
```

#### **2. Update Node.js**
```bash
nvm install 18
nvm use 18
nvm alias default 18
pm2 restart ping-pong-server
```

#### **3. Backup Configuration**
```bash
# Backup PM2 configuration
pm2 save

# Backup server files
tar -czf server-backup-$(date +%Y%m%d).tar.gz /home/ec2-user/ping-pong-server
```

#### **4. Monitor Performance**
```bash
# Check server performance
pm2 monit

# Check system resources
top
df -h
```

## 📊 Cost Optimization

### **Free Tier Usage:**
- **t2.micro**: 750 hours/month free
- **Data Transfer**: 1GB/month free
- **Storage**: 30GB EBS free

### **Scaling Considerations:**
- **t3.small**: ~$15/month for better performance
- **Load Balancer**: ~$18/month for high availability
- **Auto Scaling**: Additional costs for automatic scaling

## 🔐 Security Best Practices

1. **Keep System Updated**: Regular `yum update`
2. **Use Security Groups**: Restrict access to necessary ports
3. **Monitor Logs**: Regular log review for suspicious activity
4. **Backup Regularly**: Automated backups of configuration
5. **Use IAM Roles**: Least privilege access

## 📞 Support

If you encounter issues:

1. Check PM2 logs: `pm2 logs ping-pong-server`
2. Verify security group configuration
3. Test local connectivity: `curl http://localhost:3001`
4. Check system resources: `htop`

---

**🎯 Your server endpoint will be**: `http://YOUR-EC2-IP:3001/`

**🏓 Happy gaming!**