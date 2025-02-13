# Vagabond URL Shortener

A serverless URL shortner running in AWS Lambda and DynamoDB. 

Exposes REST endpoints to allow the shortening of URLs to the format `https://vaga.link/XXXXX`. Each endpoint is deployed as its own Lambda function when running `sls deploy`

The REST API is available at https://vaga.link/api/

## Endpoints

Each function has its own folder in /src/handlers.

### • get-all-urls

Returns a list of every URL in the database 

Endploint: GET /getAllUrls


### • shorten-url

Creates a new short URL (and qr code) from a given long URL. Accepts an optional expiration timestamp.

Endpoint: GET /shorten

Body: 
```
{
    "longurl": "https://shop.vagabondwines.co.uk/products/copy-of-nv-jean-comyn-harmonie-brut-75cl",
    "expire": 2621114612
}
```


### • get-qr-code

Returns a QR code for any existing short URL in the database. 

Endpoint: GET /{id}/qrcoode


### • get-qr-code-no-logo

Returns a QR code for any existing short URL in the database without the Vagabond logo.

Endpoint: GET /{id}/qrcoode-no-logo



## Local Dev Environment

- Node Version: 18+
- Serverless version: 1.6.0
- AWS CLI must be installed and configured for the Vagabond AWS account.


## Developing

You can use use `sls invoke local` to run each function on your machine, e.g. `sls invoke local --function get-all-urls`


## Deployent
 
To deploy simply run `npm run deploy`, there is no separate build step.
 
