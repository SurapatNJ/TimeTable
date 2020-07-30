const pm2Config = {
    apps: [
      {
        name: 'TeachTable',
        script: './bin/www',
        exec_mode: 'cluster_mode',
        instances: 1,
      },
    ],
  }
  
  module.exports = pm2Config