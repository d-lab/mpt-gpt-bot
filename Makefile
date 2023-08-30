# Get the parent directory name
PARENT_FOLDER_NAME := $(shell basename "$(shell dirname "$(CURDIR)")")

.PHONY: test-build test prod-build prod db-migrate

test-build:
	@PROJECT_NAME=$(PARENT_FOLDER_NAME) docker-compose -f docker-compose.test.yml build --no-cache

test:
	@PROJECT_NAME=$(PARENT_FOLDER_NAME) docker-compose -f docker-compose.test.yml up -d

prod-build:
	@PROJECT_NAME=$(PARENT_FOLDER_NAME) docker-compose -f docker-compose.yml build --no-cache

prod:
	@PROJECT_NAME=$(PARENT_FOLDER_NAME) docker-compose -f docker-compose.yml up -d

db-migrate:
	docker exec -it mpt-gpt-api sh -c "yarn run db:migrate"
