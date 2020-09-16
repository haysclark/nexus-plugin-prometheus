import 'dotenv/config'

import { server, use } from 'nexus'
import { auth } from 'nexus-plugin-jwt-auth'
import { prisma } from 'nexus-plugin-prisma'
import { prometheus } from 'nexus-plugin-prometheus'
import { shield } from 'nexus-plugin-shield'

import { rules } from './permissions'
import { configureRegistry } from './reporting'
import { APP_SECRET } from './utils'

// Enables the Prometheus reporting plugin
use(
  prometheus({
    express: server.express,
    // Optional: custom prom-client configuration
    configureRegistry,
  })
)

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(
  auth({
    appSecret: APP_SECRET,
  })
)

// Enables the Shield plugin
use(
  shield({
    rules,
  })
)
