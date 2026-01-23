import { useState } from 'react';

export function LoanForm({ books, readers, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        book_id: '',
        reader_id: '',
        due_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const availableBooks = books.filter((book) => book.available_copies > 0);

    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">
                    Kniha
                </label>
                <select
                    id="book_id"
                    name="book_id"
                    value={formData.book_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="">Vyberte knihu</option>
                    {availableBooks.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title} - {book.author} ({book.available_copies} ks)
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="reader_id" className="block text-sm font-medium text-gray-700">
                    Ctenar
                </label>
                <select
                    id="reader_id"
                    name="reader_id"
                    value={formData.reader_id}
                    onChange={handleChange}
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
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    placeholder={getDefaultDueDate()}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Zrusit
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Vytvarim...' : 'Vypujcit knihu'}
                </button>
            </div>
        </form>
    );
}
