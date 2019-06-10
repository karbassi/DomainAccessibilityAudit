# Domain Accessibility Audit

This web application automatically crawls websites and checks for accessibility violations.
It can crawl within subdomains of the initial domain it starts with.
It reports statistics of violations for the whole audit, domains and pages.

## Current status
This is a beta version, and it does crash sometimes.
However it already gives useful results.

## To start it
- Install Docker and docker-compose if needed.
- `docker-compose up -d`
- Direct a browser to `http://localhost:3142/`.

## To stop it
- A running audit can be stopped with the Stop button in the form to start a new audit.
- `docker-compose stop` will stop the containers.
- `docker-compose down` will stop and remove the containers. They are recreated automatically with `docker-compose up -d`.

## To check the server logs
- Get a list of container ids: `docker ps`.
- Look at the logs for a container: `docker logs <container_id>`.
- Keep looking in real time: `docker logs -f <container_id>`.  
  (another way to do that is to use `docker-compose up` without the `-d` option)

## To uninstall
**Warning**: this will remove all the data !!!
- `docker-compose down -v --rmi all --remove-orphans`
- Remove the files.

## FAQ
- How do I let other people see the results?  
Edit the first line after `ports:` in `docker-compose.yml`, and remove `127.0.0.1:`. Be aware that it will let anybody access your application and remove audits (there is no user management yet).

## Current issues
- Sometimes the audit will start failing after a while. It will try to restart WebDriver automatically to continue. A large number of scan errors will be reported if the audit keeps failing.

## Current non-features that would be nice to have in the future
- User management.
- Possibility to run more than one audit at a time.
- Smart use of `sitemap.xml` files.
- Ability to limit the number of URLs checked by domain.
- Option to only start subdomain audits at the root.
- Reporting more than accessibility violations.

## Licence
GPL 3.0.

## Technologies used
- [Docker](https://www.docker.com/)
- [aXe](https://github.com/dequelabs/axe-core)
- [Selenium WebDriver](https://www.seleniumhq.org/projects/webdriver/)
- [axe-webdriverjs](https://github.com/dequelabs/axe-webdriverjs)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Chromium](https://www.chromium.org/Home)
- [Debian](https://www.debian.org/)