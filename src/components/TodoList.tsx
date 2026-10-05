import { FormEvent, useState } from 'react';

export type Todo = { id: number; text: string; done: boolean };
type Filter = 'all' | 'active' | 'completed';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const add = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((t) => [...t, { id: Date.now() + t.length, text: trimmed, done: false }]);
    setText('');
  };
  const toggle = (id: number) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const remove = (id: number) => setTodos((t) => t.filter((x) => x.id !== id));

  const visible = todos.filter((t) => (filter === 'all' ? true : filter === 'active' ? !t.done : t.done));
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="todos">
      <form onSubmit={add}>
        <input aria-label="new todo" placeholder="What needs to be done?" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <div role="group" aria-label="filter">
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <ul aria-label="todos">
        {visible.map((t) => (
          <li key={t.id} className={t.done ? 'done' : undefined}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
            <button aria-label={`delete ${t.text}`} onClick={() => remove(t.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
      <p data-testid="remaining">{remaining} item{remaining === 1 ? '' : 's'} left</p>
    </div>
  );
}
