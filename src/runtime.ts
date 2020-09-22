import { RuntimePlugin } from 'nexus/plugin'
import { register } from 'prom-client'

import { schemaPlugin } from './lib/schema'
import { defaultReporter } from './reporter'
import { Reporter, Settings } from './types'

let reporter: Reporter
export const plugin: RuntimePlugin<Settings, 'required'> = ({
  express,
  configureRegistry,
  buildReporter,
  debug = false,
  allowExternalErrors = false,
}: Settings) => () => {
  const plugins = []

  // Configure prom-client
  const registers = configureRegistry ? configureRegistry() : [register]

  // Configure express
  express.get('/metrics', (req, res) => {
    res.set('Content-Type', registers[0].contentType)
    res.end(registers[0].metrics())
  })

  // protect reporter code from running multiple times during reflections build
  if (!reporter) {
    reporter = buildReporter
      ? buildReporter(registers)
      : defaultReporter(registers)
  }

  // append schema plugin
  plugins.push(schemaPlugin(reporter, debug, allowExternalErrors))

  return {
    schema: {
      plugins,
    },
  }
}
