import { useAuth } from '../../hooks/useAuth';

export function BookCard({ book, onEdit, onDelete, onBorrow }) {
    const { isAdmin, canManageLoans } = useAuth();

    const getAvailabilityColor = () => {
        if (book.available_copies === 0) return 'text-red-600';
        if (book.available_copies <= 2) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {book.genre}
                        </span>
                        <span className="text-xs text-gray-500">{book.year}</span>
                    </div>
                    <p className={`mt-2 text-sm font-medium ${getAvailabilityColor()}`}>
                        Dostupne: {book.available_copies} ks
                    </p>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                    {canManageLoans && book.available_copies > 0 && (
                        <button
                            onClick={() => onBorrow(book)}
                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Vypujcit
                        </button>
                    )}
                    {isAdmin && (
                        <>
                            <button
                                onClick={() => onEdit(book)}
                                className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                            >
                                Upravit
                            </button>
                            <button
                                onClick={() => onDelete(book)}
                                className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
                            >
                                Smazat
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
