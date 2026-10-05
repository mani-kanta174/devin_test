import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  it('renders the initial value', () => {
    render(<Counter initial={3} />);
    expect(screen.getByLabelText('count')).toHaveTextContent('3');
  });

  it('increments, decrements and resets', async () => {
    const user = userEvent.setup();
    render(<Counter initial={2} />);
    await user.click(screen.getByLabelText('increment'));
    await user.click(screen.getByLabelText('increment'));
    expect(screen.getByLabelText('count')).toHaveTextContent('4');
    await user.click(screen.getByLabelText('decrement'));
    expect(screen.getByLabelText('count')).toHaveTextContent('3');
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByLabelText('count')).toHaveTextContent('2');
  });

  it('respects min and max bounds', async () => {
    const user = userEvent.setup();
    render(<Counter initial={0} min={0} max={1} />);
    expect(screen.getByLabelText('decrement')).toBeDisabled();
    await user.click(screen.getByLabelText('increment'));
    expect(screen.getByLabelText('increment')).toBeDisabled();
    expect(screen.getByLabelText('count')).toHaveTextContent('1');
  });
});
