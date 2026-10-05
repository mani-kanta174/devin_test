import Counter from './components/Counter';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <main className="app">
      <h1>Devin Test UI</h1>
      <section aria-labelledby="counter-heading">
        <h2 id="counter-heading">Counter</h2>
        <Counter />
      </section>
      <section aria-labelledby="todo-heading">
        <h2 id="todo-heading">Todo list</h2>
        <TodoList />
      </section>
      <section aria-labelledby="login-heading">
        <h2 id="login-heading">Login form</h2>
        <LoginForm />
      </section>
    </main>
  );
}
