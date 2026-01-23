import { useState, useEffect } from 'react';
import { Modal } from '../Common/Modal';

export function BorrowModal({ isOpen, onClose, book, readers, onSubmit, loading }) {
    const [readerId, setReaderId] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (isOpen) {
            setReaderId('');
            setDueDate('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            book_id: book.id,
            reader_id: readerId,
            due_date: dueDate || undefined,
        });
    };

    if (!book) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Vypujcit: ${book.title}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600 mb-4">
                        Autor: {book.author}<br />
                        Dostupne kopie: {book.available_copies}
                    </p>
                </div>

                <div>
                    <label htmlFor="reader_id" className="block text-sm font-medium text-gray-700">
                        Ctenar
                    </label>
                    <select
                        id="reader_id"
                        value={readerId}
                        onChange={(e) => setReaderId(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Vyberte ctenare</option>
                        {readers.map((reader) => (
                            <option key={reader.id} value={reader.id}>
                                {reader.name} ({reader.class})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                        Termin vraceni (vychozi: 14 dni)
                    </label>
                    <input
                        type="date"
                        id="due_date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Zrusit
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !readerId}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Vypujcuji...' : 'Vypujcit'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
