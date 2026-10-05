import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

const addTodo = async (user: ReturnType<typeof userEvent.setup>, text: string) => {
  await user.type(screen.getByLabelText('new todo'), `${text}{Enter}`);
};

describe('TodoList', () => {
  it('adds todos and ignores blank input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'Write tests');
    expect(screen.getByLabelText('new todo')).toHaveValue('');
    await addTodo(user, '   ');
    const items = within(screen.getByRole('list', { name: 'todos' })).getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Write tests');
  });

  it('toggles completion and updates remaining count', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'A');
    await addTodo(user, 'B');
    expect(screen.getByTestId('remaining')).toHaveTextContent('2 items left');
    await user.click(screen.getByRole('checkbox', { name: 'A' }));
    expect(screen.getByTestId('remaining')).toHaveTextContent('1 item left');
  });

  it('filters active and completed todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'Done one');
    await addTodo(user, 'Open one');
    await user.click(screen.getByRole('checkbox', { name: 'Done one' }));
    const list = () => screen.getByRole('list', { name: 'todos' });

    await user.click(screen.getByRole('button', { name: 'active' }));
    expect(within(list()).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Open onex']);

    await user.click(screen.getByRole('button', { name: 'completed' }));
    expect(within(list()).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Done onex']);
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    await addTodo(user, 'Temp');
    await user.click(screen.getByRole('button', { name: 'delete Temp' }));
    expect(within(screen.getByRole('list', { name: 'todos' })).queryAllByRole('listitem')).toHaveLength(0);
  });
});
