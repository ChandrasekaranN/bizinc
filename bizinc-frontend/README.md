# Frontend App

This is a frontend for the app built with **Next.js**. The app allows users to create, read, and update their todo tasks, along with the ability to add posts, like them, and comment on them.

## Features

- **Authentication**: User can log in with credentials to access the todo and posts features.
- **Todo Management**: Add, list, and mark todo items as completed.
- **Posts**: Users can create posts, like posts, and see all posts.
- **Comments**: Users can add comments to posts.
- **User Session**: Protected routes to ensure only authenticated users can access certain pages.

## Technologies

- **Next.js**: A React framework for building the user interface.
- **Axios**: A promise-based HTTP client for making API requests.
- **API**: Interfacing with backend REST API for todo management, posts, and comments.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ChandrasekaranN/bizinc.git

cd bizinc-frontend

npm install
```
### 2. Configure the backend API in next.config.mjs
Set the localhost backend API in the rewrite function to map the API call to the backend API

## Authentication
To access the app, users need to log in with valid credentials. The login.js page handles user authentication. Once logged in, the session is saved, and the user is redirected to the main dashboard with their todo list.

## Pages
/login/page.js: Login page - routes to (/login)

/todo/page.js: Dashboard showing todo items - routes to (/todo)

/post/page.js: Page to view and create posts - routes to (/post)

/post/comment: Comments to posts

# Components
## Todo Management:

TodoPage: Displays all todos and allows the user to create and complete them.
TodoList: Displays a list of todos.
AddTodo: Component for adding a new todo.

## Post Management:

PostsPage: Displays posts and allows users to like or create them.
PostList: Displays all posts.
Post: Displays a single post with the option to like it.

## Comment Management:

CommentsPage: Displays comments on posts.
CommentList: Lists all comments on a post.
AddComment: Allows the user to add a comment to a post.

## Protected Routes
Some pages require the user to be logged in. These pages are protected using an authentication middleware that checks if the user has an active session. If the user is not authenticated, they will be redirected to the login page.

## Error Handling
404: If a page does not exist, the app will display a 404 error page.
500: Server errors will display an error message prompting the user to try again.