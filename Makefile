PNPM := $(shell command -v pnpm 2> /dev/null)

ifndef PNPM
$(error "Cannot find cargo. Please install and try again!")
endif

.DEFAULT_GOAL := help

.PHONY: help
help: ## Shows the help message with available commands.
	@echo "Available commands:"
	@grep -E '^[^[:space:]]+:[^:]*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: dev
dev: ## Starts the development server
	@$(PNPM) run dev

.PHONY: build
build: ## Builds the project
	@$(PNPM) run build

.PHONY: preview
preview: ## Run vite preview
	@$(PNPM) run preview

.PHONY: lint
lint: ## Lint the project
	@$(PNPM) run lint

.PHONY: lint-fix
lint-fix: ## Lint the project and fix the issues
	@$(PNPM) run lint:fix

.PHONY: lint-summary
lint-summary: ## Lint the project and show the summary
	@$(PNPM) run lint:summary

CONFIG_FILE_LOCATION = ~/.local/share/com.kadeck.app/kadeck-settings.json

.phony: linux-config-cat
linux-config-cat: ## Cat the kadeck-settings.json file
	@[ -f $(CONFIG_FILE_LOCATION) ] && cat $(CONFIG_FILE_LOCATION) || echo "File $(CONFIG_FILE_LOCATION) does not exist!"

.phony: linux-config-delete
linux-config-delete: ## Delete the kadeck-settings.json file
	@[ -f $(CONFIG_FILE_LOCATION) ] && rm -r $(CONFIG_FILE_LOCATION) && echo "Deleted kadeck-settings.json!" || echo "File $(CONFIG_FILE_LOCATION) does not exist!"
