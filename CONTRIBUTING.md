# Contributing to Chalo Ghume

Thanks for your interest in contributing. This document explains how to propose changes, report issues, and what to expect from the review process.

## Before you start

Set up the project locally first by following the Installation section in README.md. Confirm you can run the app with `npm start` and `npm run server` and see it working in the browser before making changes.

## Making a change

1. Create a new branch off `main` with a descriptive name

   ```bash
   git checkout -b fix/short-description
   ```

   or

   ```bash
   git checkout -b feature/short-description
   ```

2. Make your change

   - Keep each branch focused on one fix or one feature. Do not mix unrelated changes in the same branch.
   - Follow the existing project structure. Redux actions and reducers are grouped by feature under `src/Redux`, route level pages live under `src/Pages`, and shared UI components live under `src/Components`.
   - Reuse the shared `BASE_URL` constant from `src/baseurl.js` for any API calls instead of hardcoding a URL.
   - Match the existing code style in the file you are editing rather than introducing a new style.

3. Test your change locally

   Run both `npm start` and `npm run server` and manually exercise the feature or page you changed, including the login flow if your change touches anything behind authentication. There is no automated test suite covering these flows yet, so manual testing before opening a pull request is important.

4. Commit your change

   Write a commit message that explains why the change was made, not just what changed. For example, prefer "Fix hotel search returning no results by pointing it at the local API" over "update StayReducer".

5. Open a pull request against `main`

   Describe what the pull request does and how a reviewer can test it. Link any related issue. If your change fixes a bug, briefly describe how you found and diagnosed it.

6. Respond to review feedback

   A team member will review the pull request before it is merged. Address requested changes with new commits on the same branch rather than opening a new pull request.

## Reporting issues

If you find a bug or want to request a feature, open a GitHub issue that includes:

- A clear description of the problem or request
- Steps to reproduce, for bugs
- What you expected to happen versus what actually happened
- Screenshots or console error messages, if relevant

## A note on this codebase

This project was inherited and extended from an earlier open source template, and parts of it still reflect that history. Before assuming a page or feature is broken because of your own change, check whether the same behavior exists on `main` without your change. Several past bugs in this project turned out to be caused by mismatches between the code and the version of a dependency actually installed, most notably json-server, so it is worth checking dependency versions if something that looks correct is not behaving as expected.
