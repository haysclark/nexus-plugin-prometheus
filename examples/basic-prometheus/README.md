# basic-prometheus

> A nexus-framework plugin example that utilizing nexus-plugin-prometheus for reporting basic GraphQL metrics.

This project is an example of how to configure a [nexus-framework](https://nexusjs.org/) [plugin](https://nexusjs.org/guides/plugins) to collect basics _GraphQL_ metrics and report them to a [Prometheus](https://prometheus.io/) server. The project also includes a basic [Grafana](https://grafana.com/) Dashboard and a [docker-compose](https://www.docker.com/) file to make the setup relatively straight forward. Under the hood, this project is utilizing the [prom-client](https://github.com/siimon/prom-client) library. The overall sample project is based on the [plugins-prisma-and-jwt-auth-and-shield](https://github.com/graphql-nexus/examples/tree/master/plugins-prisma-and-jwt-auth-and-shield) example. 

## Usage

### 1. Clone the example repo

```shell script
git clone git@github.com/haysclark/nexus-plugin-prometheus.git
cd nexus-plugin-prometheus/example/basic-prometheus
```

### 2. Install the dependencies

```shell script
npm install
```

### 3. Setup the PostgreSQL database (using Docker)

> Ensure you have Docker installed on your machine. If not, you can get it from [here](https://store.docker.com/search?offering=community&type=edition).

```shell script
docker-compose up -d
```

### 4. Create a Prisma migration and initialize the database

Using the following command, read the prompts and create a local database.
After the database is created, Prisma will prompt you for a migration name; feel free to enter something and continue.

```shell script
npm run db:save
```

### 5. Apply the new Prisma migration

```shell script
npm run db:up
```

### 6. Generate the local Prisma client

```shell script
npm run generate
```

### 7. Seed the database.

```shell script
npm run db:seed
```

### 8. Start the 'dev' server

```shell script
nexus dev
```

### 9. Try a GraphQL request in the Playground

You should be able to run the following _Query_ and see the data that was seeded. Click the GraphQL playground's "Play" button multiple time to simulate some user traffic.

```
query {
  feed {
    id
    title
    published
    content
  }
}
```

Try the following _Query_ to throw an "Not Authorised!" error.

```
query {
  me {
    id
  }
}
```

### 10. Add Prometheus as a "data source" in Grafana 

Open _Grafana_ and log in using username/password: `admin/admin`.

In the _Configuration_ section of Grafana (has a Gear icon), click on the "[Add data source](http://localhost:3000/datasources)" button.

Select "Prometheus".

In the _HTTP_ section, set the _URL_ value to `prometheus:9090`.

Scroll down and click on the "Save & Test" button.

### 11. Import the dashboard

Navigate to [Dashboards/Manager](http://localhost:3000/dashboards) and select the _Import_ button, or try this [dirrect link](http://localhost:3000/dashboard/import).

Click the "Upload JSON file" button and upload the ```grafana-dashboard.json``` file in the repo's root folder. Continue the import steps, and when completed, you should be able to navigate to the _Application metrics_ dashboard.

Fin!

## Resources

 - [prom-client](https://github.com/siimon/prom-client)
 - [Prometheus](https://prometheus.io/)
 - [Grafana](https://grafana.com/)
 - [Docker](https://www.docker.com/)
