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