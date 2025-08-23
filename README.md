# Ping Pong - Multiplayer Game

A real-time multiplayer ping pong game built with React Native, React Reanimated, and Socket.IO. Game link -  http://51.21.193.65

## Features

- 🏓 Real-time multiplayer gameplay
- 🎮 Draggable paddle controls
- ⚡ Smooth animations with React Reanimated
- 🌐 WebSocket communication
- 📱 Cross-platform (iOS, Android, Web)

## Game Components

1. **Stage** - A rectangular game area with black background and grey border
2. **Paddle** - White rectangular paddles for hitting the ball
3. **Ball** - White circular ball that bounces off paddles and walls
4. **DraggablePaddle** - User-controlled paddle with touch gestures

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ping-pong
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Start the Socket.IO server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the React Native app:
   ```bash
   npm start
   ```

3. Open the app on your device or simulator:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## AWS Server Setup Docs

### 🚀 Deploying to AWS EC2

For production deployment, you can host the Socket.IO server on AWS EC2.

#### Prerequisites

- AWS Account
- EC2 instance running Amazon Linux 2
- Security group with port 3001 open
- SSH access to your EC2 instance

#### Quick Deployment

1. **Launch EC2 Instance:**
   - Choose Amazon Linux 2 AMI
   - Select t2.micro (free tier) or t3.small
   - Configure security group with port 3001 open

2. **Upload Server Code:**
   ```bash
   scp -i your-key.pem -r server/ ec2-user@YOUR-EC2-IP:/home/ec2-user/ping-pong-server
   ```

3. **Run Setup Script:**
   ```bash
   ssh -i your-key.pem ec2-user@YOUR-EC2-IP
   cd ping-pong-server
   chmod +x ec2-setup.sh
   ./ec2-setup.sh
   ```

4. **Verify Deployment:**
   ```bash
   pm2 status
   curl http://localhost:3001
   ```

#### What the Setup Script Does

The `ec2-setup.sh` script automates:

- **System Updates**: Latest security patches
- **Node.js Installation**: Using NVM for version management
- **PM2 Setup**: Process management for production
- **Dependencies**: Installs all required npm packages
- **Server Configuration**: Production-ready settings
- **Auto-restart**: Keeps server running after crashes

#### Server Management

```bash
# Check server status
pm2 status

# View logs
pm2 logs ping-pong-server

# Restart server
pm2 restart ping-pong-server

# Monitor performance
pm2 monit
```

#### Troubleshooting

**Server Not Accessible:**
- Check security group inbound rules for port 3001
- Ensure server listens on `0.0.0.0` not just `localhost`
- Verify PM2 process is running: `pm2 status`

**Connection Issues:**
- Test local connection: `curl http://localhost:3001`
- Check server logs: `pm2 logs ping-pong-server`
- Verify Node.js installation: `node --version`

#### Cost Optimization

- **Free Tier**: t2.micro instance (750 hours/month)
- **Production**: t3.small (~$15/month) for better performance
- **Scaling**: Consider load balancer for high availability

#### Security Best Practices

1. Keep system updated: `sudo yum update -y`
2. Use security groups to restrict access
3. Monitor logs regularly
4. Backup configuration: `pm2 save`
5. Use IAM roles with least privilege

For detailed deployment instructions, see [`server/EC2-DEPLOYMENT.md`](server/EC2-DEPLOYMENT.md).

## How to Play

1. Open the app on two different devices/browsers
2. Each player will be automatically assigned to either the top or bottom paddle
3. Drag your paddle horizontally to move it
4. Try to hit the ball and prevent it from passing your side
5. The ball will bounce off paddles and walls
6. If the ball goes past your paddle, it will reset to the center

## Game Mechanics

- **Ball Physics**: The ball bounces off paddles and walls with realistic physics
- **Paddle Movement**: Smooth, responsive paddle controls with gesture recognition
- **Multiplayer Sync**: Real-time synchronization of game state between players
- **Collision Detection**: Accurate collision detection between ball and paddles

## Technical Stack

- **Frontend**: React Native, Expo, React Reanimated
- **Backend**: Node.js, Express, Socket.IO
- **Animations**: React Reanimated for smooth 60fps animations
- **Gestures**: React Native Gesture Handler for touch controls

