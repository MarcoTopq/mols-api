module.exports = {
  apps : [{
    name        : "mols",
    script      : "./bin/xxx",
    watch       : true,
    exec_mode   : "cluster",
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
