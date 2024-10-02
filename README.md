# Node CRUD Challenge

A simple CRUD API built using Node.js and Express with an in-memory database.

## Table of Contents
- [Project Overview](#project-overview)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Project Overview

This project demonstrates a simple CRUD API built using **Express** for managing a collection of persons. It supports the following operations:
- Create a new person
- Retrieve all persons or a specific person by ID
- Update an existing person by ID
- Delete a person by ID

### Person Schema
Each person is represented as an object with the following properties:
- `id` (string, UUID) – A unique identifier generated on the server side.
- `name` (string) – The person's name (required).
- `age` (number) – The person's age (required).
- `hobbies` (array of strings) – The person's hobbies (required, can be an empty array).

## Requirements

- Node.js
- Express

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/hanagt/node-crud-challenge.git
    cd node-crud-challenge
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

## Running the Application

To start the server, run the following command:

```bash
node server.js
```

The server will be running at http://localhost:3000.

## API Endpoints

### **GET** `/person`

- **Description**: Retrieves all persons from the in-memory database.
- **Response**:
  - **200 OK**: A list of all persons (empty array if none exist).

### **GET** `/person/:id`

- **Description**: Retrieves a specific person by their unique `id`.
- **Parameters**: `id` (string) – The unique ID of the person.
- **Response**:
  - **200 OK**: The person object if found.
  - **404 Not Found**: If the person with the given `id` does not exist.

### **POST** `/person`

- **Description**: Creates a new person.
- **Body**:
  - `name` (string, required)
  - `age` (number, required)
  - `hobbies` (array of strings, required)
- **Response**:
  - **201 Created**: The newly created person object.
  - **400 Bad Request**: If the input data is invalid.

### **PUT** `/person/:id`

- **Description**: Updates an existing person by their unique `id`.
- **Parameters**: `id` (string) – The unique ID of the person.
- **Body**:
  - `name` (string, required)
  - `age` (number, required)
  - `hobbies` (array of strings, required)
- **Response**:
  - **200 OK**: The updated person object.
  - **400 Bad Request**: If the input data is invalid.
  - **404 Not Found**: If the person with the given `id` does not exist.

### **DELETE** `/person/:id`

- **Description**: Deletes a person by their unique `id`.
- **Parameters**: `id` (string) – The unique ID of the person.
- **Response**:
  - **204 No Content**: If the person is successfully deleted.
  - **404 Not Found**: If the person with the given `id` does not exist.

## Error Handling

The API handles the following errors:
- **404 Not Found**: Returned when a resource or endpoint is not found.
- **400 Bad Request**: Returned when the input data is invalid (e.g., missing required fields).
- **500 Internal Server Error**: For any unexpected errors on the server.
