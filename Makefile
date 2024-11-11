
.phony: linux-config-cat
linux-config-cat:
	@cat ~/.local/share/com.kadeck.app/kadeck-settings.json

.phony: linux-config-delete
linux-config-delete:
	@rm -rf ~/.local/share/com.kadeck.app/kadeck-settings.json
	@echo "Deleted kadeck-settings.json!"