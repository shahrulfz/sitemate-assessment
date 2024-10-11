This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Unit Test

First, run the development server:

```bash
npm run test
```

Please do not run client when running unit test

## To start

```bash
npm run dev
```

Walkthrough of MySolution
Introduction
Hi everyone, today I’ll be giving you a quick overview of my solution built using Next.js for the frontend and Express for the backend. I’ve been working with these technologies for 8 years, which allows me to leverage their strengths effectively.

Technology Choices
Next.js: A React framework that enables server-side rendering and static site generation. It's perfect for building dynamic, SEO-friendly applications. Its features like API routes simplify backend integration.

Express: A minimalist web framework for Node.js. It provides a robust set of features for web and mobile applications, making it an ideal choice for handling server-side logic and APIs.

API Design
I designed a simple CRUD (Create, Read, Update, Delete) API for managing resources. Here’s a breakdown of each operation:

Create: This endpoint allows users to create new records. A POST request sends the data to the server.
Read: Using a GET request, we retrieve data. We can fetch all records or a specific record by its ID.
Update: This operation lets users modify existing records. A PUT request is used for updating the data.
Delete: To remove a record, we use a DELETE request based on the record ID.

Improvements
Looking forward, I’d like to implement several enhancements:
Polished UI: We can create a more intuitive and responsive UI using Tailwind CSS, ensuring a better user experience.
Dynamic API Responses: Depending on the read request, we could send back different issue objects to cater to varying user needs.
State Management: Integrating Zustand for state management can help maintain a more organized and efficient application state.
Interactive Client: Building an interactive client with features like filtering and sorting would make the API more user-friendly.
Docker: Finally, wrapping the entire application in Docker would ensure consistency across different environments and streamline deployment. I am not able to demonstrate here since I just removed Docker from my OS and don't have to implement it.

Conclusion
In summary, my solution is built on Next.js and Express with a straightforward CRUD API. Future enhancements will focus on user experience and application scalability. Thank you for your time!
