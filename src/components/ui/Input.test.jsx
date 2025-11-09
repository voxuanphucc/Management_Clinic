import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
    it('renders input with label', () => {
        render(<Input label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders input with placeholder', () => {
        render(<Input placeholder="Enter email" />);
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });

    it('displays error message', () => {
        render(<Input error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('calls onChange when value changes', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<Input onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'test');

        expect(handleChange).toHaveBeenCalled();
    });

    it('renders with different input types', () => {
        const { rerender } = render(<Input type="email" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

        rerender(<Input type="password" />);
        expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
    });

    it('applies error styling when error prop is provided', () => {
        render(<Input error="Error message" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('border-red-500');
    });
});
