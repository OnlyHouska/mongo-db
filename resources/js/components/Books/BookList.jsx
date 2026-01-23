import { BookCard } from './BookCard';

export function BookList({ books, onEdit, onDelete, onBorrow, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Zadne knihy k zobrazeni
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onBorrow={onBorrow}
                />
            ))}
        </div>
    );
}
