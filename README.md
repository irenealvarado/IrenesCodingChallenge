# Irene's Coding Challenge

## Project Overview

Create a client application that allows the user to submit an image, with an
accompanying comment, to a simple Node JS application, which verifies that an
image and comment were supplied before POSTing them both to a fictious endpoint
(https://imagehasbeenverified.example.endpoint)

## Prerequisites

Make sure you have installed the node version and yarn version specified in
[package.json](https://github.com/irenealvarado/IrenesCodingChallenge/blob/master/client/package.json) before cloning the repo.

Install the Expo CLI

```bash
$ npm i -g expo-cli
```

## Running the App

To run on ios

```bash
$ cd client
$ npm install
$ expo start --ios
```

To run the server

On MacOS or Linux, run the app with this command:

```
$ cd server
$ npm install
$ npm start
```

## Tools and design decisions

I decided to keep the client and server side on the same repo due to the small size of the project as it makes it faster to switch between files on the same IDE.

My first decision to use Expo instead of React Native CLI for the client side, came from the the simple code base size and functionality of this project.<br>
I have used Expo in the past so I knew Expo comes with great features that I could use to bootstrap my development time.<br>
After a quick glance at Expo, I solidified my decision to use it when I found out that expo came with an image picker (which I would use to display the UI list), as well as a template for typescript.

As far as code architecture. I decided to keep the client and server side on the same repo due to the small size of the project as it makes it faster to switch between files on the same IDE.

I started with a "App" as a functional component because it eliminates the class related cruft like extends and the constructor.
I also decided to desctructure my props in ES6 so all the data I used is now specified as a simple function argument. This means I also get improved code completion/intellisense support compared to class-based components. Lastly, decomposing my props provided a clear list of required props for each of my components.

I elected to use React Native Elements for styling was due to the fact that Material UI is a web-based UI framework so I went with the next best popular choice for mobile development. Their community is also decent in size and current issues in progress/raised were only 30 plus.

For the server side, I chose Express.js for the same reasons I chose Expo: I wanted the toolbox to cut development time. NodeJs is also one of the most supported Node.js frameworks. Furthermore, Express.js comes with a generator tool express-generator, to quickly create the application skeleton so I could spend more time developing.

## If I had more time

- Implement validation using Formik-Yup validation
- Add Android support
- Implement tyscript more throughly
- Add unit tests to both, client (React Testing Library and Jest) and server side (Supertest)
- Create a pattern to use only a single instance of axios for the future
- Create GET endpoint in node to retrieve image list instead of using mock data
- Use an abtracted error fuction to handle error elegantly
- Create a patter for enforcing the front-end to upgrade their version when there is a breaking change on the backend
- Implement some security best practices folling along [Express best practices](https://expressjs.com/en/advanced/best-practice-security.html)
