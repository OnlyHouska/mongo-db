import { useAuth } from '../../hooks/useAuth';

export function ReaderCard({ reader, onEdit, onDelete, onViewLoans }) {
    const { isAdmin } = useAuth();

    const activeLoansCount = reader.active_loans?.length || 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{reader.name}</h3>
                    <p className="text-sm text-gray-600">{reader.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Trida: {reader.class}
                        </span>
                        {activeLoansCount > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Aktivni vypujcky: {activeLoansCount}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                    <button
                        onClick={() => onViewLoans(reader)}
                        className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Vypujcky
                    </button>
                    {isAdmin && (
                        <>
                            <button
                                onClick={() => onEdit(reader)}
                                className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                            >
                                Upravit
                            </button>
                            <button
                                onClick={() => onDelete(reader)}
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
