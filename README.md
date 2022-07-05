# softzino-test

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```
### Environment  Variable Set
In env file set app_key and app_secret that is get from laravel api set up time.
   Example:
   VITE_API_URL= http://localhost/simple_auth_api/api/v1 (What is your api url)
   VITE_API_KEY= 1 (will get from api readme and also get from database oauth_clients table)
   VITE_API_SECRET= K1goVJci9k0GY2ksrUZkSzLIikN4BTlP7H7sfyXd (will get from api readme and also get from database oauth_clients table)
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
