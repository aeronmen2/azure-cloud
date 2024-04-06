# Table of Contents

1. [Next.js Project](#nextjs-project)
2. [Getting Started](#getting-started)
3. [Generating JWT Secret](#generating-jwt-secret)
4. [Installing Dependencies](#installing-dependencies)
5. [Connection Instructions](#connection-instructions)
   - [User: no-access-user](#user-no-access-user)
   - [User: partial-access-user](#user-partial-access-user)
   - [User: full-access-user](#user-full-access-user)
6. [Virtual Machine Creation](#virtual-machine-creation)
7. [Self-Deletion](#self-deletion)
8. [Technologies Used](#technologies-used)
9. [Azure Resource Deployment Script Documentation](#azure-resource-deployment-script-documentation)
10. [CreateVM Component Documentation](#createvm-component-documentation)
11. [Authentication Documentation](#authentication-configuration)

# Next.js Project

The project involves the development of a web application aimed at providing developers with easily accessible disposable testing and evaluation environments for their software. The concept revolves around enabling a developer, for instance, wishing to test their application on Windows 11, to visit our web application. Here, they can effortlessly create and access a Windows 11 environment via Remote Desktop Protocol (RDP), eliminating the need to deal with virtual machine intricacies. By simply ordering a Windows machine, testing their application, and disconnecting afterward, developers can streamline their testing process without the hassle of managing virtual machine details.

## Getting Started

To get started with this project, follow these steps:

1. Open the project in your environment
2. Copy the `.env.example` file and create a new file named `.env`.
3. Fill in the values in the `.env` file with your own configurations. You can obtain these values from your Azure account and any other services you're using.

   ```plaintext
   AUTH_SECRET='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
   AZURE_CLIENT_ID='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
   AZURE_CLIENT_SECRET='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
   AZURE_TENANT_ID='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
   AZURE_SUBSCRIPTION_ID='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
   ```

## Generating JWT Secret

To generate a JWT secret for your `.env` file, follow these steps:

1. Open your terminal.
2. Run the following command:

```bash
 $ openssl rand -base64 32
```

## Installing the dependecies

To install the dependecies for the project, do:

```bash
npm install
```

## Installing the dependecies

To install the dependecies for the project, do:

```bash
npm run dev
```

## Connection Instructions

### User: no-access-user

#### Connection Instructions:

1. Open the Disposable Test Environment Web Application.
2. Log in using the following credentials:
   - Username: no-access-user
   - Password: no-access-password
3. Upon successful login, you will have access to the dashboard, but you cannot launch any virtual machines.

### User: partial-access-user

#### Connection Instructions:

1. Open the Disposable Test Environment Web Application.
2. Log in using the following credentials:
   - Username: partial-access-user
   - Password: partial-access-password
3. Upon successful login, you will have the ability to create one virtual machine. This virtual machine will be a Windows environment. Please note that the virtual machine will self-delete after 10 minutes.

### User: full-access-user

#### Connection Instructions:

1. Access the Disposable Test Environment Web Application.
2. Log in using the following credentials:
   - Username: full-access-user
   - Password: full-access-password
3. After logging in, you will have unrestricted access to create three virtual machines. These virtual machines can be Windows, Debian, or Ubuntu environments. Each virtual machine will self-delete after 10 minutes.

## Virtual Machine Creation

- **No Access**: Users with "no access" privileges will be able to log in to the web application but won't have the ability to create any virtual machines.

- **Partial Access**: Users with "partial access" privileges will be able to create one virtual machine. This virtual machine will be a Windows environment.

- **Full Access**: Users with "full access" privileges will be able to create three virtual machines. These virtual machines can be Windows, Debian, or Ubuntu environments.

## Self-Deletion

After a virtual machine has been successfully created, regardless of the level of access, it will remain accessible for 10 minutes. After this period, the virtual machine will self-delete, ensuring efficient use of resources and maintaining security.

## Technologies Used

For this project, I utilized the following technologies:

- **Next.js with TypeScript**: Next.js is a React framework that provides efficient server-side rendering and routing capabilities. Combining it with TypeScript ensured type safety and streamlined development.

- **NextAuth.js**: NextAuth.js is a versatile authentication library for Next.js applications. It offers various authentication methods, including username/password credentials and social media logins. With NextAuth.js, the dashboard is protected, allowing only authenticated users to access it.

- **Azure Node SDK**: The Azure Node SDK provides comprehensive APIs for interacting with Azure services. I used this SDK to dynamically provision virtual machines on-demand. With the Azure SDK, users can create disposable testing environments tailored to their specific requirements, such as Windows, Debian, or Ubuntu environments.

These technologies work together seamlessly, empowering developers to accelerate their testing process and streamline the development lifecycle.

# Azure Resource Deployment Script Documentation

## Overview

This code is a Node.js script for deploying Azure resources such as a Virtual Machine (VM), Storage Account, Virtual Network (VNet), etc., using the Azure SDK for JavaScript. It creates resources necessary for deploying a VM with specified configurations like OS type, VM size, networking, and more.

## Dependencies

- `@azure/identity`: Azure Identity Library for authentication.
- `@azure/arm-compute`: Azure Compute Management Library for managing compute resources.
- `@azure/arm-resources`: Azure Resource Management Library for managing Azure resources.
- `@azure/arm-storage`: Azure Storage Management Library for managing storage resources.
- `@azure/arm-network`: Azure Network Management Library for managing network resources.

## Environment Variables

Ensure the following environment variables are set:

- `AZURE_CLIENT_ID`: Azure Client ID.
- `AZURE_TENANT_ID`: Azure Tenant ID.
- `AZURE_CLIENT_SECRET`: Azure Client Secret.
- `AZURE_SUBSCRIPTION_ID`: Azure Subscription ID.

## Functions

1. `launchCreateResources(osType: string)`:

   - Orchestrates the creation of Azure resources necessary for deploying a VM based on the specified OS type.
   - Parameters:
     - `osType`: String representing the desired operating system for the VM.
   - Returns:
     - FQDN (Fully Qualified Domain Name) of the created VM.

2. `createResources(osType: string)`:

   - Creates Azure resources required for deploying a VM, such as Resource Group, Storage Account, VNet, Subnet, Public IP, NIC, and VM Image.
   - Parameters:
     - `osType`: String representing the desired operating system for the VM.

3. `deleteResourceGroup()`:

   - Deletes the resource group and its associated resources.

4. Other helper functions:
   - Various functions for creating specific Azure resources like Resource Group, Storage Account, VNet, Subnet, Public IP, NIC, VM Image, and Virtual Machine.
   - These functions handle the creation and configuration of Azure resources using Azure SDK methods.

## Constants

- Constants for location, account type, admin credentials, and resource names are defined.
- Random IDs are generated for resource names to ensure uniqueness.

## Notes

- Error handling: The code includes basic error handling to catch and log errors during resource creation.
- Automatic cleanup: The script automatically deletes the created resource group after 10 minutes to avoid unnecessary costs.
- Resource naming: Resources are named using random IDs to ensure uniqueness.
- Logging: Console logs are used to provide feedback on resource creation and deletion.

# CreateVM Component Documentation

## Overview

The `CreateVM` component is a React component responsible for initiating the creation of a Virtual Machine (VM) on Azure. It provides a button to trigger the creation process and displays a modal with the status of the creation process, including loading spinner, success message with SSH connection details, and error message if creation fails.

## Props

### `machine: string`

Represents the type or configuration of the VM to be created.

### `isCreationAllowed: boolean`

Indicates whether the creation of the VM is allowed or not. It controls the enabling/disabling of the create button.

### `setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>`

A setter function to update the `isCreationAllowed` state.

## State

### `isCreating: boolean`

Tracks whether the VM creation process is ongoing.

### `showModal: boolean`

Controls the visibility of the modal for displaying VM creation status.

### `error: string | null`

Stores any error message that occurs during the creation process.

### `fqdn: string | null`

Stores the Fully Qualified Domain Name (FQDN) of the created VM for SSH connection.

## Functions

### `handleCreateVM({ machine }: { machine: string }): void`

Initiates the VM creation process. It sets the state to indicate the creation is ongoing, triggers the modal display, and calls `launchCreateResources` function to create the VM. It handles success by updating the FQDN state and any error by updating the error state.

### `copyToClipboard(text: string): void`

Copies the provided text to the clipboard. It is used to copy the SSH connection details (username, password) to the clipboard.

## UI Components

- `Button`: A custom button component to trigger the VM creation process.
- `Modal`: A custom modal component to display the status of the VM creation process.

## Dependencies

- `@heroicons/react`: Provides icons for copying SSH connection details to the clipboard.
- `@/lib/vms/create-vm`: Imports the `launchCreateResources` function to create the VM on Azure.
- `../button` and `../modal`: Custom components for button and modal UI elements.
- `../fonts`: Imports a custom font for styling text in the modal.

## Notes

- This component uses React state to manage the UI and handle VM creation status.
- It communicates with the Azure backend through the `launchCreateResources` function.
- It provides visual feedback to users during the creation process using loading spinners and modal dialogs.
- SSH connection details (username, password) are displayed and can be copied to the clipboard for ease of access.
- Error messages are displayed if VM creation fails.

# Authentication Configuration and Components Documentation

## Overview

This code provides authentication functionality for a web application using Next.js and NextAuth. It includes configuration for authentication providers, user authentication logic, and React components for handling the login form.

## Authentication Configuration

The authentication configuration is set up using NextAuth. It includes a custom authentication provider using credentials for username/password authentication. Additionally, it defines callbacks for handling JWT tokens and sessions.

## Authentication Configuration Constants

- `authConfig`: Configuration options for NextAuth, including custom pages, callbacks, and providers.

## Authentication Functions

- `getUser(username: string): Promise<User | any>`: Retrieves a user object based on the provided username. This function is used by the custom credentials provider to authenticate users.

## NextAuth Functions

- `NextAuth({...config})`: Initializes NextAuth with the provided configuration options.

## React Components

### `LoginForm`

A React component responsible for rendering a login form. It includes fields for username and password, as well as error message handling.

### `LoginButton`

A helper component that renders a login button. It disables the button when authentication is pending.

## UI Components

- `AtSymbolIcon`, `KeyIcon`, `ExclamationCircleIcon`, `ArrowRightIcon`: Icon components from Heroicons used for visual elements in the login form.

- `Button`: A custom button component used for login actions.

## Dependencies

- `next-auth`: Next.js authentication library for handling user authentication.
- `@heroicons/react`: Provides icons used for visual elements in the login form.
- `@/lib/actions`: Contains authentication-related actions used for form submission.
- `./fonts`: Imports a custom font for styling text in the login form.

## Notes

- The authentication flow is handled by NextAuth, which abstracts away much of the authentication logic and provides a flexible API for configuring authentication providers and callbacks.
- React components are used to render the login form and handle user interaction.
- Form validation and error handling are included to provide a smooth user experience during the authentication process.
