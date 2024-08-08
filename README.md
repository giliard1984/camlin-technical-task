# Camlin Technical Task

## Technologies/concepts involved

For the frontend:
* Vite
* React
* Typescript
* Antd
* Custom Hook to fetch data (useFetch), which is leveraging the generics typescript concept to accept and ensure its types
* ContextAPI is here to help us abstract and reuse some states across the application where necessary
* Making use of the Outlet (react-router-dom), so the component can be wrapper in a layout (Basically, a High-Order component, where a function takes a component and returns a new component).
* JSON Server mocking RestFul API, so we can make calls to the endpoints (https://www.npmjs.com/package/json-server). It allows, developers to mock data and make calls to the endpoints as they were reaching the backend.


## Setting Up & starting the webcomponents/json server applications

Please access the `camlin-technical-task` folder, which is the related project.

If setting up through the docker container, you will need the docker configured on your machine.
* Run `docker-compose run camlin-frontend-service yarn install && docker-compose up -d`
  Note: Bear in mind, that there is a bug related to insalling node_modules within the container images, so it is necessary to run the command above as it is, so the node_modules installs using the right binaries, which are utilised within the container through the defined volume.

* The command above should start the react project (PORT=5178) and the json server (PORT=5179)
  * Frontend: http://localhost:5178/ , host gets exposed, so it is acessible on your browser
  * JSON Server: http://localhost:5179/
 
 Note: I was thinking on implementing a backend solution with Node.js, GraphQL and mongoDB for the purposes of this technical task, but decided to go with JSON server. I've recently uploaded a GraphQL solution via a different repository, that can be utilised to access this knowledge (https://github.com/giliard1984/xplora), and it makes use of ApolloFederation which is quite cool :)

 ![image](https://github.com/user-attachments/assets/30ef0642-b5cd-4afa-9dba-df5429bb99d2)

 ![image](https://github.com/user-attachments/assets/0673c480-b9b4-4811-8446-e7f3016025ce)


If, you decide to start the project outside the container, please guarantee you have node 20+ installed on your machine.
* Run `yarn install`
* Run `yarn run dev`
  * This command should start the react project (PORT=5178) and the json server (PORT=5179)
  * Frontend: http://localhost:5178/
  * JSON Server: http://localhost:5179/
 
* You can build it by running the following command `yarn run build`

![image](https://github.com/user-attachments/assets/a51745fe-903a-4196-b0d9-b30a43724711)

![image](https://github.com/user-attachments/assets/4af11f0b-8364-4a70-8163-76bee75ca718)

![image](https://github.com/user-attachments/assets/91bd7664-7aa4-42f7-8585-f0bcc4bd848e)

![image](https://github.com/user-attachments/assets/1599d008-c1c7-43b3-acc4-99e84e062cc3)


## How does this work?

The purpose here is to quickly present the concept in a nutshell.

* The sample was loaded to the JSON server, which gets accessible (browser), so you can check the information that is there.
* After fetching the data, I noticed that I needed to normalised it to leverage some of the Antd Charts features. I moved this information to the ContextApi, so it is made available everywhere within the application, but decided not to persist the data (cookies or localStorage). I would've gone with the Apollo caching strategies, to prevent the application from hammering the backend.
* Even though I am normalising this information frontend-wise, I would've recommend it to be moved to the backend, to remove some workload. Another, solution woul've been moving the heavy processing to the web workers, so it gets executed on a different thread (outside the main theread), which is multi-thread and the normalised data would've been returned as a callback for the application to mount the components as the web works don't have access to the DOM.
* Also, worked on the measure as it was in volts, and kV made sense to me to improve readability, alongside ordering by timestamp, as it was descending instead of ascending, which helps us see the progression.
* I decided to bring the page as a dashboard, so we can see all transformers in one chart (Voltage in kV x Timestamp), but also an statistic chart, where we can see the transformers' Max/Min and Median details, so we know which ones are performing well within the provided period.

## Next steps

This section aims to express the points that are either missing, or should be implemented, for this project to function better.

* [x] Make use of docker, so starting this project in a different machine should be smoother
* [ ] Implement skeleton, so when loading the new data, we can see it in a more friendly way
* [ ] Implement some unit tests
* [ ] Apply minifier (Terser), so bundled product gets minified (smaller)
* [ ] Add alias to the project through resolvers
