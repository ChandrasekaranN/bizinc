import Link from 'next/link'; // Import Link component for navigation

export default function HomePage() {
  return (
      <div>
        <nav>
          {/* Navigation links for Login and Todo List */}
          <Link href="/login">Login</Link> | <Link href="/todo">Todo List</Link>
        </nav>
        <br></br>
        <h1>Welcome to the To-Do List App</h1>
      </div>
  );
}
