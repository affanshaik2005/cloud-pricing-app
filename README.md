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



| Sequence              | OR147948.1_16171-20247 | MH734115.1_21431-25492 | DQ231462.2 | MW173324.1 | NC_045512.2_21563-25384 | MN996532.2_21560-25369 |
|------------------------|------------------------|------------------------|------------|------------|------------------------|------------------------|
| OR147948.1_16171-20247 | 100.00                 | 42.20                  | 42.13      | 49.37      | 42.13                  | 41.52                  |
| MH734115.1_21431-25492 | 42.20                  | 100.00                 | 47.52      | 41.10      | 47.46                  | 46.59                  |
| DQ231462.2             | 42.13                  | 47.52                  | 100.00     | 68.35      | 73.60                  | 73.43                  |
| MW173324.1             | 49.37                  | 41.10                  | 68.35      | 100.00     | 83.54                  | 78.48                  |
| NC_045512.2_21563-25384| 42.13                  | 47.46                  | 73.60      | 83.54      | 100.00                 | 93.12                  |
| MN996532.2_21560-25369 | 41.52                  | 46.59                  | 73.43      | 78.48      | 93.12                  | 100.00                 |
