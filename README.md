# Support Ticket Tracker Practice

This is a starter project for practising real-world frontend logic and GitHub collaboration. The HTML and CSS are already provided. Interns should complete the JavaScript functionality in `script.js`.

## Repository

https://github.com/shreyxs9/support-ticket-tracker-practice

## Project Goal

Build a simple support ticket tracker where users can create and manage support tickets.

## Core Features

- Create a ticket with title, description, priority, and category
- Prevent empty title and description
- Display tickets in a list
- Edit ticket details
- Delete tickets
- Change ticket status: Open, In Progress, Resolved
- Filter tickets by status
- Filter tickets by priority
- Search tickets by title
- Store tickets in `localStorage`
- Show ticket count summary

## Intern 1

- Create ticket functionality
- Validate empty title and description
- Edit ticket details
- Save and load tickets using `localStorage`
- Show ticket count summary

Suggested branches:

- `feature/create-ticket`
- `feature/ticket-validation`
- `feature/edit-ticket`
- `feature/local-storage`
- `feature/ticket-summary`

## Intern 2

- Delete ticket functionality
- Change ticket status
- Filter tickets by status
- Filter tickets by priority
- Search tickets by title

Suggested branches:

- `feature/delete-ticket`
- `feature/change-ticket-status`
- `feature/status-filter`
- `feature/priority-filter`
- `feature/search-tickets`

## Git Workflow

For every feature:

1. Create a GitHub Issue.
2. Pull the latest code from the `main` branch.
3. Create a separate feature branch.
4. Complete only the assigned feature.
5. Commit the changes using a meaningful commit message.
6. Push the branch to GitHub.
7. Create a pull request.
8. Ask the other intern to review the pull request.
9. Resolve the review comments, if any.
10. Merge the pull request only after approval.
11. Pull the updated `main` branch before starting the next feature.

## Commit Message Examples

- `feat: add ticket creation`
- `fix: prevent empty ticket fields`
- `feat: add ticket status filter`
- `feat: persist tickets in localStorage`
- `style: improve ticket card layout`

## Important Rules

- Do not push directly to the `main` branch.
- Create one branch for each feature.
- Create one pull request for each feature.
- Do not include unrelated changes in the same branch.
- Review each other's pull requests before merging.
- Make sure your branch is updated with the latest `main` branch.

## Running Locally

Open `index.html` in a browser. No build tools are required.
