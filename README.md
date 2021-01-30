# Weather-App

Look at weather data using the OpenWeatherMap API.

## Wireframe

<p align="center">
    <a href="https://anordinaryusername.github.io/Bits/">
        <img alt="Professionally made wireframe for site." src="https://i.imgur.com/6cF7FzA_d.webp?maxwidth=760&fidelity=grand">
    </a>
</p>

## Final Design

WIP

## Running it locally

Clone the repo with ssh

```bash
git clone git@github.com:your-username/Weather-App.git
```

Or https

```bash
git clone https://github.com/your-username/Weather-App.git
```

Change to the Bits directory

```bash
cd Bits
```

### Using npm

In the repo folder run

```bash
npm install
```

Then start up the dev server. It should automatically open [http://localhost:8080](http://localhost:8080) in Google Chrome Incognito mode.

```bash
npm start
```

### Using Docker

In the repo folder run

```bash
docker-compose up
```

And now go to [http://localhost:8080](http://localhost:8080)

#### Stop the server

To stop dev server and remove the Docker container run

```bash
docker-compose down
```

To temporarily stop the dev server and NOT remove the Docker container run

```bash
docker-compose stop
```

You can then bring the server back up with `docker-compose up`.

#### Commands

| Command               | Description                           |
| --------------------- | ------------------------------------- |
| `npm install`         | Install the dependencies              |
| `npm start`           | Start a dev server with HMR           |
| `npm run analyze`     | Analyze bundle sizes                  |
| `npm run build`       | Build minified bundles ready for prod |
| `npm run docker-init` | Used for Dockerfile                   |
| `npm run lint:js`     | Lint .js files with ESLint            |
