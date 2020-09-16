import { Registry, collectDefaultMetrics } from 'prom-client'

function configureRegistry(): Registry[] {
  // See: https://github.com/siimon/prom-client#usage
  const register = new Registry()
  collectDefaultMetrics({ register })
  return [register]
}

export { configureRegistry }
