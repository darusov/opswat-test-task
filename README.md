# OPSWAT Test Task

## Requirements
Create a web application that will query the Metadefender Cloud REST API hash result and display the results.

The page should contain a form with the following elements:

- an input box for the REST API endpoint

- an input box for the REST API apikey

- an input box for the file hash string

- a "Search" button

The apikey field should be validated using the "Apikey info" endpoint

The search result should be displayed in a separate page and should display the following information:

SHA256, SHA1, MD5, Uploaded time, Scanned time, Scan Duration, File type, File extension, File size (in KB and bytes)

REST API Documentation: https://onlinehelp.opswat.com/mdcloud/

REST API Endpoint : https://api-dev.metadefender.com/v4/

REST API Apikey : 87924b41f615554eeb367230b4f0cbbe

File hash: 6D91B2F134D8D8D955F6BFC024A5D2B6CFE6BB36C4AE0E65BA33DAB2D2E5C529


## Installation

1. Clone this project.
2. Then type in console:
```bash
yarn
```
3. And type in console
```bash
yarn start
```

## Tips

I've added default values to the fields for convenience.

But you can change it however you want.

Also some words about field 'ENDPOINT':

It works with values of two types of values. For example if you wish to write endpoint 'hash' - you be able to write it as
```https://api-dev.metadefender.com/v4/hash``` or ```hash```