# Cloud Pricing App

## Overview
The Cloud Pricing App allows users to search and compare cloud instances, such as AWS EC2 and RDS, based on their specific requirements. Users can filter instances by cloud type, region, RAM, and CPU to find the most efficient options for their workloads.

## Features
- Filter instances based on:
  - Cloud type (e.g., AWS)
  - Region (e.g., eu-west-1)
  - Minimum and maximum RAM
  - Minimum and maximum CPU
- JSON API to expose instance data
- User-friendly UI for filtering and displaying instances

## Project Structure
- **client/**: Contains the client-side application built with TypeScript and React.
- **server/**: Contains the server-side application built with TypeScript and Express.
- **data/**: Contains scripts for generating and seeding instance data into the database.

## Setup Instructions

### Client
1. Navigate to the `client` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the client application:
   ```
   npm start
   ```

### Server
1. Navigate to the `server` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server application:
   ```
   npm start
   ```

## Database
The application uses a database to store instance pricing data. A Python script is provided in the `data/` directory to generate and seed the initial data.

## Usage
Once both the client and server applications are running, you can access the Cloud Pricing App in your web browser. Use the filter panel to search for instances based on your requirements.

## Considerations
This project is designed to be a simple yet effective solution for comparing cloud instances. Future enhancements could include support for reserved instances and additional cloud providers.
