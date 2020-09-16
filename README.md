# nexus-plugin-prometheus

[![Version](https://img.shields.io/npm/v/nexus-plugin-prometheus.svg?style=flat-square)](https://www.npmjs.com/package/nexus-plugin-prometheus?activeTab=versions) [![Downloads](https://img.shields.io/npm/dt/nexus-plugin-prometheus.svg?style=flat-square)](https://www.npmjs.com/package/nexus-plugin-prometheus) [![Last commit](https://img.shields.io/github/last-commit/haysclark/nexus-plugin-prometheus.svg?style=flat-square)](https://github.com/haysclark/nexus-plugin-prometheus/graphs/commit-activity) [![License](https://img.shields.io/github/license/haysclark/nexus-plugin-prometheus.svg?style=flat-square)](https://github.com/haysclark/nexus-plugin-prometheus/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/haysclark/nexus-plugin-prometheus#can-i-contribute-code) [![Code of conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/haysclark/nexus-plugin-prometheus/blob/master/CODE_OF_CONDUCT.md)

> A nexus-framework plugin for reporting basic GraphQL metrics through Prometheus (via prom-client)

---

This [nexus-framework](https://nexusjs.org/) [plugin](https://nexusjs.org/guides/plugins) collects basics _GraphQL_ metrics and reports them to a [Prometheus](https://prometheus.io/) server. The plugin utilizes the [prom-client](https://github.com/siimon/prom-client) library to communicate with Prometheus and thus requires Nexus' instance of [express](https://expressjs.com/) to be provided to the plugin.

> ⚠️ This plugin does **NOT** support _Nexus_ projects utilizing serverless _Next.JS_ implementations!

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [Node.js](https://nodejs.org).

```bash
npm install --save nexus-plugin-prometheus
```

OR

```bash
yarn add nexus-plugin-prometheus
```

## Usage

Find a full example in the [examples/basic-prometheus](https://github.com/haysclark/nexus-plugin-prometheus/blob/master/examples/basic-prometheus) folder, which also includes a basic [Grafana](https://grafana.com/) Dashboard and [docker-compose](https://www.docker.com/) file to fully illustrate the plugin in use.

### Setup

Due to the _middleware_ architecture of Nexus-framework plugins, it is vital that one `use` the _nexus-plugin-prometheus_ **_first_**, so that no requests are culled by another plugin.

```typescript
// app.ts

import { use, server } from 'nexus'
import { prometheus } from 'nexus-plugin-prometheus'

// Enables the Prometheus reporting plugin
use(
  prometheus({
    express: server.express, // inject Nexus express instance
  })
)
```

Prometheus will now be able to collect metrics from the servers `/metrics` url.

### Running `collectDefaultMetrics` for collecting server metrics

Executing _prom-client_'s `collectDefaultMetrics` method can be done by providing the plugin with a custom `configureRegistry` method.

> For more information on configuring _prom-client_, see it's [usage](https://github.com/siimon/prom-client#usage) documentation.

```typescript
// app.ts

import { use, server } from 'nexus'
import { prometheus } from 'nexus-plugin-prometheus'
import { Registry, collectDefaultMetrics } from 'prom-client'

// Define custom configuration of prom-client
function configureRegistry(): Registry[] {
  const register = new Registry()
  collectDefaultMetrics({ register })
  return [register]
}

// Enables the Prometheus reporting plugin
use(
  prometheus({
    express: server.express,
    configureRegistry, // provide custom
  })
)
```

### Adding a **_prefix_** to my metrics

Executing _prom-client_'s `collectDefaultMetrics` method with any additional configuration, such as a `prefix`, can be done by providing the plugin with a custom `configureRegistry` method.

> For more information on configuring _prom-client_, see it's [usage](https://github.com/siimon/prom-client#usage) documentation.

```typescript
// app.ts

import { use, server } from 'nexus'
import { prometheus } from 'nexus-plugin-prometheus'
import { Registry, collectDefaultMetrics } from 'prom-client'

// Define custom configuration of prom-client
function configureRegistry(): Registry[] {
  const register = new Registry()
  const prefix = 'my_application_'
  collectDefaultMetrics({ register, prefix })
  return [register]
}

// Enables the Prometheus reporting plugin
use(
  prometheus({
    express: server.express,
    configureRegistry, // provide custom
  })
)
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## Related

- [prom-client](https://github.com/siimon/prom-client)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [Docker](https://www.docker.com/)

## Inspiration

- [dotellie/apollo-metrics](https://github.com/dotellie/apollo-metrics)
- [simondujardin/graphql-middleware-prometheus](https://github.com/simondujardin/graphql-middleware-prometheus)
- [Camji55/nexus-plugin-jwt-auth](https://github.com/Camji55/nexus-plugin-jwt-auth)

## Credits

Authored and maintained by Hays Clark.

To all [contributors](https://github.com/haysclark/nexus-plugin-prometheus/graphs/contributors) - Thank you!

## License

Open-source under [MIT License](https://github.com/haysclark/nexus-plugin-prometheus/blob/master/LICENSE).

## FAQ

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Uh oh, something went wrong!](#uh-oh-something-went-wrong)
- [I wish something was different…](#i-wish-something-was-different)
- [Can I contribute code?](#can-i-contribute-code)
- [My question isn't answered :(](#my-question-isnt-answered-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Uh oh, something went wrong!

Sorry about that. It is recommended that you enable "debug" and "allowExternalErrors" in your plugin. Additionally, if you are using other Nexus plugins, you may want to do the same for them.

```typescript
// app.ts

import { use, server } from 'nexus'
import { prometheus } from 'nexus-plugin-prometheus'

// Enables the Prometheus reporting plugin
use(
  prometheus({
    express: server.express,
    debug: true,
    allowExternalErrors: true,
  })
)
```

If you are still stuck, please submit a bug report using the [GitHub issue tracker](https://github.com/haysclark/nexus-plugin-prometheus/issues).

### I wish something was different…

Keen to hear all ideas! Create an enhancement request using the [GitHub issue tracker](https://github.com/haysclark/nexus-plugin-prometheus/issues).

### Can I contribute code?

Yes please! See [DEVELOPING.md](./DEVELOPING.md).

### My question isn't answered :(

Ask away using the [GitHub issue tracker](https://github.com/haysclark/nexus-plugin-prometheus/issues).
