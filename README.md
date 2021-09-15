Inspera test instructions
====================================
Hello guys,

I had a short maturity vacation and needed to do something at night. So I've decided to have fun of this task. I've completely rebuild whole app and unfortunately bite was too big and I haven't been able to finish it entirely. But the main goals were accopplished.

## Setup
Production build isn't ready yet, so you will need to start this all in dev mode.
1. Install lerna to controll monorepo
```bash
$ yarn global add lerna
```
2. Install all dependencies and link packages
```bash
$ lerna bootstrap
```
3. Using docker compose launch postgres
```bash
> ./packages/api/prismic/ $ docker-compose up
```
4. Let's prepare db
```bash
> ./packages/api $ yarn run repopulate
```
5. Then it's time for nodeJS
```bash
> ./packages/api $ yarn start
```
6. Finally frontend
```bash
> ./packages/app $ yarn start
```

Now application is available on port `1234`.

## Requirements

- [x] Theme switching
- [x] Timer being refreshing every 1 sec.
- [x] Time syncing with backend every 10 sec by custom trottle HOF.
- [ ] Unit tests(ran out of time, but it's possible to explain verbaly).
