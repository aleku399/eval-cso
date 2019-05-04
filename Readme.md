[![CircleCI](https://circleci.com/gh/freelyformd/eval-cso.svg?style=svg)](https://circleci.com/gh/freelyformd/eval-cso)

# Frontend for customer service officer evaluation tool

## Installation and setup

Run `npm install` to install dependencies (prefer npm to yarn)
Run `npm start` or `npm run dev` to start application, by default port 3000 is used.
Run `npm run storybook` to view component storybooks.

## development guidelines

Create a storybook for every new component. If you find yourself writing a component whose parts can be
re-used in other components, extract those bits into a new component.

Container package contain redux High order components which are responsible for providing the data required by components with in the components package.

Prefer to write tests where possible for complex components that consume API data. (This maybe relaxed due to time limit issues)

Ensure that your code is well typed where possible.

Run `npm run prettier` before you commit.

## Tool / technologies used

- Emotion for JS in CSS styling
- Storybook
- Next.js
- Semantic-ui

## Gotchas

- Semantic ui handles refs differently see https://react.semantic-ui.com/addons/ref/#types-ref
- core-js is required by storybook as a peer dev-dependencies [see](https://github.com/storybooks/storybook/issues/3805)

