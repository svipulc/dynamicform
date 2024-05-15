# POC Form Builder

This project demonstrates how to build a dynamic form builder using Next.js version 14 with React Hook Form. It allows users to dynamically create and customize forms with various input fields.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Features

- **Dynamic Form Creation**: Admins can create forms dynamically.
- **Customizable Input Fields**: Admins can add, remove, and customize input fields.
- **Field Requirement Settings**: Admins can set fields as required or optional.
- **User Form Selection**: Users can select a form from the available options.
- **Responsive Design**: Designed to be responsive and accessible across various devices.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/react-mern/POC-form-builder.git
   ```

2. Navigate to the project directory:

   ```
   cd POC-form-builder
   ```

3. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

## Usage

- **Admin**

  - Open your browser and go to http://localhost:3000/admin.
  - Click on "Create New Form" to start building a new form.
  - Add input fields by clicking on "Add Field" and customize their properties.
  - Set field requirements by toggling the "Required" option.
  - Save the form once you're done editing.

- **User**

  - Open your browser and go to http://localhost:3000/user.
  - Select a form from the available options.
  - The chosen form will display on your screen with the specified input fields.

## Dependencies

- Next.js - React framework for building server-side rendered applications.
- React Hook Form - Library for managing form state and validation in React applications.
- Tailwind CSS - Utility-first CSS framework for quickly building custom designs.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any features or improvements you'd like to see.
