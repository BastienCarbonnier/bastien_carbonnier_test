# Geo Distibuted Cache

## Test
To test this project you need to have docker installed and launch the command `docker compose up` at the root of the project.

## Technical choices
- Use of Redis cache to handle persistence and create replication
- Creation of a micro service to be able to use this cache with any backend or frontend
- I choose to use Docker for this project so it can be easily deployed and tested

## Improvement
- Change cache data type
- To have real-time replication of data across Geolocation and data consistency across regions I would deploy my cache on an AKS (Azure Kubernetes Service) and configure replication dirrectly on the interface.