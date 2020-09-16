// eslint-disable-next-line import/no-extraneous-dependencies
import { plugin } from '@nexus/schema'
import entries from 'object.entries'
import fromEntries from 'object.fromentries'
import { LabelValues } from 'prom-client'

import { Reporter } from '../../types'

function filterUndefined(from: {
  [label: string]: string | number | undefined
}): LabelValues<string> {
  // return from;
  return fromEntries(
    // @ts-ignore
    entries(from).filter(([, o]) => o)
  ) as LabelValues<string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTypeName(type: any): string {
  const { name } = type
  return name || ''
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function schemaPlugin(
  reporter: Reporter,
  debug: boolean,
  allowExternalErrors: boolean
) {
  return plugin({
    name: 'Nexus Prometheus Plugin',
    description: 'A nexus schema plugin for reporting metrics to Prometheus.',
    onCreateFieldResolver(config) {
      const parentType = config.parentTypeConfig.name
      return async (root, args, ctx, info, next) => {
        // Execution
        try {
          const startEpoch = Date.now()
          if (parentType !== 'Query' && parentType !== 'Mutation') {
            const resolver = await next(root, args, ctx, info)
            reporter.resolverTime.observe(
              filterUndefined({
                parentType,
                fieldName: config.fieldConfig.name || '',
                returnType: getTypeName(config.fieldConfig.type),
              }),
              Date.now() - startEpoch
            )
            return resolver
          }

          const labels = filterUndefined({
            operationName: info.fieldName || '',
            operation: info.operation.operation,
          })
          reporter.startedExecuting.inc(labels)
          const result = await next(root, args, ctx, info)
          if (result instanceof Error) {
            reporter.encounteredErrors.inc(labels)
          } else {
            reporter.resolved.inc(labels)
          }
          reporter.responded.inc(labels)
          reporter.totalRequestTime.observe(labels, Date.now() - startEpoch)
          return result
        } catch (err) {
          if (debug) {
            throw err
          } else if (allowExternalErrors) {
            return err
          }
        }
      }
    },
  })
}

export { schemaPlugin }
