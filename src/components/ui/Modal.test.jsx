import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal Component', () => {
    it('renders modal when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={() => {}}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={() => {}}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const closeButton = screen.getByLabelText('Close');
        await user.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when ESC key is pressed', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        await user.keyboard('{Escape}');
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('renders with different sizes', () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={() => {}} size="sm">
                <div>Small Modal</div>
            </Modal>
        );
        expect(screen.getByText('Small Modal').parentElement).toHaveClass('max-w-sm');

        rerender(
            <Modal isOpen={true} onClose={() => {}} size="lg">
                <div>Large Modal</div>
            </Modal>
        );
        expect(screen.getByText('Large Modal').parentElement).toHaveClass('max-w-4xl');
    });
});
