# Photo library - XM Test

## How to interact with the project

To start a local development server, run:

```bash
ng serve
```

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

# Project Tasks

Due to time constraints, I've created a list of tasks based on the project requirements.
Not all of them are completed, but I've marked the ones that are.

## General Setup
- [x] Use the latest Angular version to create the project.
- [x] Set up SCSS as the default styling preprocessor.
- [x] Install and configure Angular Material.
- [ ] Structure the project with separate reusable components, modules, and services for better organization.

## Routing
- [x] Set up Angular Router to define routes:
  - `/` for the Photos screen.
  - `/favorites` for the Favorites screen.
  - `/photos/:id` for the Single Photo page.

## Header Component
- [x] Use Angular Material components to create a header with:
  - Two buttons for navigation between "Photos" and "Favorites" views.
  - Highlight the active route using Angular Router's `routerLinkActive`.

## Photos Screen
- [x] Create the Photos component and set up the `/` route.
- [x] Implement infinite scrolling without libraries:
  - Use a scroll event listener to detect when the user nears the bottom of the page.
  - Fetch random photos using `https://picsum.photos/200/300`.
  - Introduce a delay (200-300ms) to simulate API behavior.
  - Show a loader icon while new photos are loading.
- [x] Add click functionality to save a photo to the Favorites library.

## Favorites Screen
- [x] Create the Favorites component and set up the `/favorites` route.
- [x] Use localStorage or similar for state retention without a backend server.
- [x] Add functionality to navigate to the Single Photo page when a photo is clicked.

## Single Photo Page
- [x] Create the Single Photo component and set up the `/photos/:id` route.
- [x] Add a “Remove from favorites” button to the page.
  - Implement functionality to remove the photo from the Favorites list.
- [x] Ensure the header remains consistent across all pages.
- [x] Redirect to the Photos screen once a photo is removed from the Favorites list.

## State Management
- [x] Use a shared Angular service for managing Favorites state across components.
- [x] Persist the Favorites state to localStorage on updates and retrieve it on initialization.

## Unit Tests
- [x] Write unit tests for all components:
  - Test the header's navigation functionality.
  - Test infinite scrolling behavior on the Photos screen.
  - Test adding and removing photos from the Favorites library.
  - Test persistence of Favorites state across page refreshes.
  - Test photo rendering in the Single Photo page.

## Additional Considerations
- [ ] Use Angular Material theming to ensure a consistent and modern UI design.
- [ ] Ensure the application is responsive for different screen sizes.
- [ ] Test the app thoroughly to catch bugs and edge cases.
- [ ] Refactor reusable functionality into shared components or modules where appropriate.
