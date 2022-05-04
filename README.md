# aws-blog

## Description

The purpose of this project was to configure and use a Linux server to deploy a simple app to an AWS Elastic Compute Cloud (EC2) instance. Static assets are stored and retrieved using Amazon Simple Storage Service (S3), and the app is connected to a DynamoDB database. 

[Visit the deployed app.](http://18.216.144.66/)

## Table of Contents

- [Tools](#tools)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Questions](#questions)

## Tools

- DynamoDB, an AWS NoSQL key-value and document database
- S3, an object storage service
- EC2, a secure, scalable web service designed to simply cloud computing
- AWS Command Line Interface (CLI)
- AWS SDK, the official AWS Software development Kit for JavaScript, which allows the Node.js application to interface with AWS
- multer, a Node.js middleware for handling file uploads; a containuer for image files until they're added to the S3 bucket
- uuid package to generate random alphanumeric string unique identifiers for the bucket and image names
- pm2, a Node.js production process manager that keeps the web app live online after logging out of the server on EC2
- nginx, a free open-source web server to expose the EC2 instance to the internet
- Insomnia Core

## Usage

The app includes a form where users can add thoughts and images. 

Future improvements include adding a progress bar or disabling the form submit button while the image is processing. Since the upload to S3 is asynchronous and takes some time, this would prevent the form from being submitted before the response from the upload process is returned. This was out of the scope of this project at this time.

<img width="1356" alt="image" src="https://user-images.githubusercontent.com/77468612/165642515-c8787c32-d136-45cd-8b5d-23a2ae2e5595.png">

Below the form, users posts and images are displayed along with the user name and date created.

<img width="1356" alt="image" src="https://user-images.githubusercontent.com/77468612/165643044-c601ddaf-f550-4e7a-b73e-257c5274cbd1.png">

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[License: MIT](https://opensource.org/licenses/MIT)

## Credits

Starter code provided by the Univeristy of Arizona's coding boot camp. 

## Questions

This project was completed as an AWS for Javascript Developers course. I created [a few slides](https://docs.google.com/presentation/d/1M4pw6DD_hTQ8KaeTFVZRIKkxXvfxENywJjSJee-kqw4/edit?usp=sharing) with details on steps taken and tools used.

Email merriammassey@gmail.com

GitHub [my GitHub profile](https://github.com/merriammassey)
