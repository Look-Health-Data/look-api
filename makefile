.PHONY: serve init-db

# Local Development
serve:
	npm start
#set-full-development-env:
#	sed 's/const env = envSrc\..*;/const env = envSrc\.developmentAll;/g' env.js > temp.js && mv temp.js env.js
#set-full-staging-env:
#	sed 's/const env = envSrc\..*;/const env = envSrc\.stagingAll;/g' env.js
#set-full-production-env:
#	sed 's/const env = envSrc\..*;/const env = envSrc\.productionAll;/g' env.js
init-db:
	npm run seedDb

# Server Management
#dev:
#	make build && cp env.js build/env.js && sed 's/const env = envSrc\..*;/const env = envSrc\.stagingAll;/g' build/env.js > temp.js && mv temp.js build/env.js && cd build/ && aws s3 sync . s3://datalab-dev.pma2020.org --profile work
#staging:
#	make build && cp env.js build/env.js && sed 's/const env = envSrc\..*;/const env = envSrc\.stagingWithProductionApi;/g' build/env.js > temp.js && mv temp.js build/env.js && cd build/ && aws s3 sync . s3://datalab-staging.pma2020.org --region eu-central-1 --profile work
#production:
#	make build && cp env.js build/env.js && sed 's/const env = envSrc\..*;/const env = envSrc\.productionAll;/g' build/env.js > temp.js && mv temp.js build/env.js && cd build/ && aws s3 sync . s3://datalab.pma2020.org --region eu-central-1 --profile work
