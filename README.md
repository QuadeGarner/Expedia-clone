# Chalo Ghume (Expedia Clone)

Chalo Ghume is a full stack clone of Expedia built with React and Redux. Users can search and book flights and hotel stays, browse things to do, and manage a cart. Authentication uses Firebase phone number sign in, and an admin panel is available for managing flight and hotel listings.

This project began as an open source Expedia clone and is maintained by a team of contributors for SE 3290, Software Project Management, Fall 2026.

Team: Quade Garner, Dustin Fouts, Kylee Anderson

## Features

### User

- Landing page with flight, stay, and things to do search tabs
- Login and signup with Firebase phone authentication
- Search flights, hotels, and destinations
- View flight and hotel details
- Sort and filter search results
- Add flights and stays to a cart and complete checkout
- Login state persists across sessions

### Admin

- Dashboard showing counts of flights, hotels, users, gift cards, and packages
- Add new flights and hotel listings
- View and delete existing flights and hotels
- Only users with the admin role can access admin pages

Note: the Cars and Packages search tabs are placeholders in the UI and are not implemented yet.

## Tech Stack

- Frontend: React, Redux, Redux Thunk, React Router, Chakra UI
- Backend for local development: json-server, serving a local db.json file as a mock REST API
- Authentication: Firebase phone number sign in
- HTTP client: Axios
- Other libraries: react-toastify, react-datepicker, react-search-autocomplete, react-icons

## Project Structure

```
src/
├── Components/       Shared UI components (Navbar, Footer, homepage sections)
├── Pages/             Route level pages (Login, Register, Flights, Stay, ThingsToDo, Admin, Checkout)
├── Redux/             Redux actions, reducers, and action types, grouped by feature
├── 01_firebase/       Firebase app configuration
├── baseurl.js         Shared API base URL used across Redux actions
└── checkoutCart.js    Local storage backed cart used by the checkout flow
db.json                Mock database served by json-server
```

## Installation

### Prerequisites

- Node.js (v16 or later recommended) and npm
- A Firebase project with Phone sign in enabled under Authentication, only needed if you want to use your own Firebase project instead of the one already configured

### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/QuadeGarner/Expedia-clone.git
   cd Expedia-clone
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure Firebase

   Firebase is already configured in `src/01_firebase/config_firebase.js`. To use your own Firebase project instead, create one at the Firebase Console, enable Phone under Authentication sign in methods, and copy your config values into that file.

4. Run the app locally

   This project needs two processes running at the same time, in two separate terminals.

   ```bash
   # Terminal 1, starts the mock API backend on http://localhost:8080
   npm run server

   # Terminal 2, starts the React dev server on http://localhost:3000
   npm start
   ```

   Open http://localhost:3000 in your browser.

5. Build for production

   ```bash
   npm run build
   ```

   This generates an optimized build in the `build` folder. The app currently points at `http://localhost:8080` for its API calls, set in `src/baseurl.js`, so a production deployment needs a reachable backend at that same URL, or an update to BASE_URL to point at a deployed API.

## Deployment

This project is deployed locally rather than to a cloud host. The steps to run a deployed instance are the same as the Installation steps above: clone the repository, install dependencies, configure Firebase, start json-server and the React dev server, and optionally run a production build with `npm run build`. There is no publicly hosted version of this project at this time.

## Screenshots

Login and Signup
![login](https://user-images.githubusercontent.com/112754519/231046318-135d34cb-0ae7-46c3-851c-6889441c62de.PNG)

Stays Page
![stays](https://user-images.githubusercontent.com/112754519/231046349-d9885d9f-b42d-4d9f-bfc2-0cac0f9a10df.PNG)

Flight Page
![Flight](https://user-images.githubusercontent.com/112754519/231046392-fea5d486-9b26-462c-af9a-5727853e6669.PNG)

Admin Page
![Admin](https://user-images.githubusercontent.com/112754519/231046415-c8c2f14c-f586-4da0-884a-992bc18b0e12.PNG)

## Contributing

See CONTRIBUTING.md for how to propose changes and report issues.
