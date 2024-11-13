## Authentication & Authorization

I used Passport.js on the backend to handle user login and Axios on the frontend to interact with the API. I created a `checkAuth` component to ensure only logged-in users can access protected pages. I used cookies to keep users logged in across page reloads.

The main challenge was making sure unauthorized users were always redirected to the login page. I also had to handle login errors when users entered wrong credentials.

## Todo Management

I built a system where users can create, list, and mark todos as completed. On the backend, I made API endpoints that work with a PostgreSQL database. Each todo is linked to a user ID so people only see their own todos.

On the frontend, I used React hooks to manage the todo list. When a user marks a todo as done, it updates immediately without reloading the page.

My biggest challenge was updating the UI correctly after a user action and handling any API errors smoothly.

## Post Management

I created a feature for users to make posts, view them, and like them. In the database, I linked posts to users and added a 'liked' field that can be toggled.

On the frontend, I made a like button for each post. When clicked, it sends a request to update the 'liked' status in the database and changes the UI to show if the post is liked or not.

I had to be careful about updating the like status without causing unnecessary page updates.

## Comment Management

I added a comment system where users can comment on posts. In the database, I linked each comment to both a user and a post.

On the frontend, comments show up under each post. Users can add new comments, which appear right away after being saved.

The tricky part was making sure each comment was correctly linked to the right post and user, and clearing the comment form after submission.

## Error Handling and User Feedback

I made sure to give users helpful feedback, especially when something goes wrong. On the frontend, I used try-catch blocks to handle errors from API requests. On the backend, I sent back clear error messages like "User not found" to help users understand what went wrong.

## Challenges

The main challenges I faced were:

1. Not using Redux made state management harder as the app grew.
2. Managing CSS for individual components became messy over time.
3. I ended up repeating similar code for todos, posts, and comments, which could have been more efficient.

## Summary

Despite these challenges, I built a working app that lets users manage todos, posts, and comments. I learned a lot about authentication, state management, and component design. For future projects, I'd consider using Redux for state management, a CSS-in-JS solution for styling, and creating more reusable components to reduce code duplication.