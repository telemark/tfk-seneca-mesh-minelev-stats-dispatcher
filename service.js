'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Stats = require('./lib/stats')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_MINELEV_STATS_DISPATCHER_TAG || 'tfk-seneca-minelev-stats-dispatcher'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:info, info:queue, msg:add', model: 'observe'},
      {pin: 'role:info, info:queue, msg:delete', model: 'observe'},
      {pin: 'role:info, info:statuslog, msg:add', model: 'observe'},
      {pin: 'role:info, info:preview', model: 'observe'}
    ]
  },
  statsOptions: {
    tag: envs.TFK_SENECA_MINELEV_STATS_DISPATCHER_TAG || 'tfk-seneca-minelev-stats-dispatcher'
  },
  isolated: {
    host: envs.TFK_SENECA_MINELEV_STATS_DISPATCHER_HOST || 'localhost',
    port: envs.TFK_SENECA_MINELEV_STATS_DISPATCHER_PORT || 8000
  }
}

const Service = Seneca(options.seneca)

if (envs.TFK_SENECA_MINELEV_STATS_DISPATCHER_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Stats, options.statsOptions)
