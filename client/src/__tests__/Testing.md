<!-- https://testing-library.com/docs/react-testing-library/intro -->

#1 Install Necessary Dependencies

##1.1

- JS -> npm install --save-dev @testing-library/react @testing-library/dom
- TS -> npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
- npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy
- npm install --save-dev jest-environment-jsdom

##2.2 Create necessary files

- tsconfig.test.json
- jest.config.js (using ES)
  \_ transform ts/tsx
- jest.setup.js (using CommonJS)
- add to package.json -> "test" : "jest"
- create **mock** for files (images)
- create **tests** for tests

#2 Create a correct file system

- Inside src create folder **tests**
- Inside **tests** create folder components
- Inside components create {component}.test.tsx

#3 Test cases to consider (ex: Chat)

- What components do we want to render?
- User interaction:
  \_ Does the component render when visible/invisible?
  \_ What happens when user types in the input?
  \_ What happens when a user clicks send?
  \_ Does pressing Enter work?
- Does the component receive/respond to props?
- Are messages added correctly?

#4 Testing technique

- render (render component)
- screen (queries to find elements)
- userEvent (simulate user interaction)
- fireEvent (basic events)
- expect (assertion)

#5 Best Practices:

- Test behavior, not implementation
- Keep tests independent
- Clean up after each test
