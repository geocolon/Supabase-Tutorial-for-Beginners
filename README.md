# Starter React Project for the Supabase Course

**How to run the starter project:**

1. Once downloaded, navigate to the project directory in a terminal and run **npm install** to install all the project dependencies.
2. In the project directory, run **npm start** to run the app & view it in a browser at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Docker locally

Start a Docker container with Dockerfile.
```
docker build -t smoothies .
docker run -p 3000:3000 smoothies
```
Stop and Remove Containers:
For a specific container.
Code
```
    docker stop <container_name_or_id>
    docker rm <container_name_or_id>
```
For all stopped containers.
Code

    ``` docker container prune```


This command removes all containers with an "Exited" or "Created" status. For Docker Compose projects. 
Navigate to the directory containing your docker-compose.yml file and run:
Code

 ``` docker compose down ```
This stops and removes containers, networks, and optionally volumes associated with the Compose project.
