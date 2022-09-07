# Getting Started with this app 

You will need to create your own private api key in [Developers Marvel Website](https://developer.marvel.com).

Get your public key.

Subsequently create a private md5 encrypt hash with the next 3 parameters: ts + publicKey + privateKey

Then, inside your react project you will need to create a .env file with your api keys.

You necessarily have to create 2 environment variables in .env file, with the next names:

REACT_APP_APIKEY= yourPublicApiKey

REACT_APP_HASH= yourMd5Hash

Then you are able to npm start the project.
