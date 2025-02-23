# Ride Queue Management App

This app allows users to search for theme park rides, view their details, and enqueue themselves for rides with the shortest wait times. It also provides the ability to filter and sort rides by wait time.

## Features

- Search for rides by name.
- View details like average duration and wait time for each ride.
- Enqueue yourself for a ride and get confirmation.
- Sort rides by wait time (ascending order).
- Enqueue yourself to a ride only once.

## Dependencies

This project is built using React Native and requires several dependencies. You will need to install them before running the app.

### Required Dependencies:

- **React Native**: A framework for building native apps using React.
- **React Navigation**: For handling navigation between screens in the app.
- **Axios**: For making HTTP requests to fetch data.
- **React Native Modal**: To display a modal when a user enqueues themselves.

To install the necessary dependencies, run the following commands:

```bash
npx react-native init RideQueueApp
cd RideQueueApp
npm install react-navigation react-navigation-stack react-native-modal axios
