import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks';
import { useReaders } from '../hooks/useReaders';
import { useLoans } from '../hooks/useLoans';
import { BookList } from '../components/Books/BookList';
import { BookForm } from '../components/Books/BookForm';
import { BookFilter } from '../components/Books/BookFilter';
import { BorrowModal } from '../components/Loans/BorrowModal';
import { SearchInput } from '../components/Common/SearchInput';
import { Pagination } from '../components/Common/Pagination';
import { Modal } from '../components/Common/Modal';
import { Alert } from '../components/Common/Alert';

export function BooksPage() {
    const { isAdmin, canManageLoans } = useAuth();
    const { books, genres, loading, error, meta, fetchBooks, fetchGenres, createBook, updateBook, deleteBook } = useBooks();
    const { readers, fetchReaders } = useReaders();
    const { createLoan, loading: loanLoading, error: loanError } = useLoans();

    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [borrowBook, setBorrowBook] = useState(null);
    const [filters, setFilters] = useState({ search: '', genre: '', page: 1 });
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchGenres();
        if (canManageLoans) {
            fetchReaders({ per_page: 100 });
        }
    }, [fetchGenres, fetchReaders, canManageLoans]);

    useEffect(() => {
        fetchBooks(filters);
    }, [fetchBooks, filters]);

    const handleSearch = (search) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    };

    const handleGenreChange = (genre) => {
        setFilters((prev) => ({ ...prev, genre, page: 1 }));
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleCreate = () => {
        setEditingBook(null);
        setShowForm(true);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleDelete = async (book) => {
        if (!confirm(`Opravdu chcete smazat knihu "${book.title}"?`)) return;

        try {
            await deleteBook(book.id);
            setSuccessMessage('Kniha byla uspesne smazana');
            fetchBooks(filters);
        } catch (err) {
            // Error is handled by the hook
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingBook) {
                await updateBook(editingBook.id, data);
                setSuccessMessage('Kniha byla uspesne aktualizovana');
            } else {
                await createBook(data);
                setSuccessMessage('Kniha byla uspesne vytvorena');
            }
            setShowForm(false);
            setEditingBook(null);
            fetchBooks(filters);
        } catch (err) {
            // Error is handled by the hook
        }
    };

    const handleBorrow = (book) => {
        setBorrowBook(book);
    };

    const handleBorrowSubmit = async (data) => {
        try {
            await createLoan(data);
            setSuccessMessage('Kniha byla uspesne vypujcena');
            setBorrowBook(null);
            fetchBooks(filters);
        } catch (err) {
            // Error is handled by the hook
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Knihy</h1>
                {isAdmin && (
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Pridat knihu
                    </button>
                )}
            </div>

            {successMessage && (
                <Alert
                    type="success"
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {error && <Alert type="error" message={error} />}
            {loanError && <Alert type="error" message={loanError} />}

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <SearchInput onSearch={handleSearch} placeholder="Hledat knihy..." />
                </div>
                <BookFilter
                    genres={genres}
                    selectedGenre={filters.genre}
                    onGenreChange={handleGenreChange}
                />
            </div>

            <BookList
                books={books}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBorrow={handleBorrow}
            />

            <Pagination meta={meta} onPageChange={handlePageChange} />

            <Modal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingBook(null);
                }}
                title={editingBook ? 'Upravit knihu' : 'Nova kniha'}
            >
                <BookForm
                    book={editingBook}
                    genres={genres}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingBook(null);
                    }}
                    loading={loading}
                />
            </Modal>

            <BorrowModal
                isOpen={!!borrowBook}
                onClose={() => setBorrowBook(null)}
                book={borrowBook}
                readers={readers}
                onSubmit={handleBorrowSubmit}
                loading={loanLoading}
            />
        </div>
    );
}
