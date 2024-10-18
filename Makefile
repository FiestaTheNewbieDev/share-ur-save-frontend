YARN=yarn

start: check_modules check_build
	$(YARN) start

dev: check_modules
	$(YARN) dev

install:
	$(YARN) install

build: 
	$(YARN) run build

check_modules:
	@if [ ! -d "node_modules" ]; then \
    	$(MAKE) install \
    fi

check_build:
	@if [ ! -d "dist" ]; then \
		$(MAKE) build \
	fi

clean:
	rm -rf node_modules

reinstall: clean install