import { ReaderCard } from './ReaderCard';

export function ReaderList({ readers, onEdit, onDelete, onViewLoans, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (readers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Zadni ctenari k zobrazeni
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readers.map((reader) => (
                <ReaderCard
                    key={reader.id}
                    reader={reader}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onViewLoans={onViewLoans}
                />
            ))}
        </div>
    );
}
