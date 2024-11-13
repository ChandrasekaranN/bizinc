import Link from 'next/link';

export default function HomePage() {
  return (
      <div>
        <nav>
          <Link href="/login">Login</Link> | <Link href="/todo">Todo List</Link>
        </nav>
        <br></br>
        <h1>Welcome to the To-Do List App</h1>
      </div>
  );
}
