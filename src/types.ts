import { Express } from 'express'
import { Counter, Histogram, Registry } from 'prom-client'

export interface Reporter {
  resolved: InstanceType<typeof Counter>
  startedExecuting: InstanceType<typeof Counter>
  encounteredErrors: InstanceType<typeof Counter>
  responded: InstanceType<typeof Counter>
  resolverTime: InstanceType<typeof Histogram>
  totalRequestTime: InstanceType<typeof Histogram>
}

export type ConfigureRegistry = () => Registry[]
export type BuildReporter = (registers: Registry[]) => Reporter

export type Settings = {
  express: Express
  buildReporter?: BuildReporter
  configureRegistry?: ConfigureRegistry
  debug?: boolean
  allowExternalErrors?: boolean
}
