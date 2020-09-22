import { Counter, Histogram, Registry } from 'prom-client'

import { Reporter } from './types'

function defaultReporter(registers: Registry[]): Reporter {
  return {
    resolved: new Counter({
      name: 'graphql_queries_resolved',
      help:
        'The amount of GraphQL queries that have had their operation resolved.',
      labelNames: ['operationName', 'operation'],
      registers,
    }),
    startedExecuting: new Counter({
      name: 'graphql_queries_execution_started',
      help: 'The amount of GraphQL queries that have started executing.',
      labelNames: ['operationName', 'operation'],
      registers,
    }),
    encounteredErrors: new Counter({
      name: 'graphql_queries_errored',
      help: 'The amount of GraphQL queries that have encountered errors.',
      labelNames: ['operationName', 'operation'],
      registers,
    }),
    responded: new Counter({
      name: 'graphql_queries_responded',
      help:
        'The amount of GraphQL queries that have been executed and been attempted to send to the client. This includes requests with errors.',
      labelNames: ['operationName', 'operation'],
      registers,
    }),
    resolverTime: new Histogram({
      name: 'graphql_resolver_time',
      help: 'The time to resolve a GraphQL field.',
      labelNames: ['parentType', 'fieldName', 'returnType'],
      registers,
    }),
    totalRequestTime: new Histogram({
      name: 'graphql_total_request_time',
      help: 'The time to complete a GraphQL query.',
      labelNames: ['operationName', 'operation'],
      registers,
    }),
  }
}

export { defaultReporter }
