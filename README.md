# mnpt-gpt-bot


![architecture](architecture.png "Architecture")


- config domain at mpt-nginx
    - use this file gpt.config as site config, point the domain to `mpt-chat-gpt` (fe)
- run `docker-compose up -d`

## How to deploy :hammer:
1. `make prod-build` to build docker images
2. `make prod` to deploy docker compose stack includes: `mpt-chat-gpt`, `mpt-gpt-api`, `mpt-gpt-postgres`
3. Remember to config domain at mpt-nginx. Use this file gpt.config as site config, point the domain to `mpt-chat-gpt` (fe)

## How to run load test :test_tube:
We running load test with k6
1. Should spawn a separate server with similar spec to production server
2. Run `make test-build` to build docker image
3. Run `make test` to run deploy test architecture
4. Run k6 with different config. The target will be 300 concurrent users in 10s
