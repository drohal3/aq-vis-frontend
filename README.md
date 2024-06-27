# Backend for IdealAQ sensor data monitoring app
This app was completed as part of [Full-stack open](fullstackopen.com/en/) course. Additionally, the created solution aims to serve as a useful tool for [IdealAQ](https://idealaq.com/) project with a potential to be the base or a case study for future production version of the web app.

The app is used as a frontend for data visualisation app.

The backend app is in its own repository ([AQvis-backend](https://github.com/drohal3/AQvis-backend)).

## Prerequisites
TODO:

## ENV variables
| variable          | description        | note                              |
|-------------------|--------------------|-----------------------------------|
| **backend**       |                    |                                   |
| VITE_BACKEND_URL  | URL of the backend | example: `http://127.0.0.1:8080 ` |

## Useful commands
To run the frontend app locally, run the following command from the project root directory.
```bash
npm run dev
```

# Instructions to use the app
Visit the address of the web app (i.e. http://localhost:5173/ if run locally with `npm run dev`)

## Login
Login requires credentials. The credentials are obtained from admins and given only to trusted people and specific purpose.

- The **username** is usually the email address of the user given access to the application. 
- The **password** must be kept safe and cannot be shared. If these rules are violated, the account might be disabled.

## Device configuration
Before plotting the data, devices must be configured. This is done on the devices page.

Devices are assigned to the organisation and shared among all the members of the organisation.

Adding a device requires setting the device name based on the preference and specifying device code that is strictly assigned to the device.
Additionally, the parameters must be defined. 

> **Note:** The app is in beta version and has limited functionality. The more features will be added once the requirements are defined.