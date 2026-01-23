import { ReturnButton } from './ReturnButton';

export function LoanList({ loans, onReturn, loading, showReturnButton = true }) {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (loans.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Zadne vypujcky k zobrazeni
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('cs-CZ');
    };

    const isOverdue = (loan) => {
        if (loan.returned_at) return false;
        return new Date(loan.due_date) < new Date();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kniha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ctenar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vypujceno
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Termín vraceni
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vraceno
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stav
                        </th>
                        {showReturnButton && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Akce
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((loan) => (
                        <tr key={loan.id} className={isOverdue(loan) ? 'bg-red-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {loan.book?.title || 'Neznama kniha'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {loan.book?.author || ''}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {loan.reader?.name || 'Neznamy ctenar'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {loan.reader?.class || ''}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(loan.borrowed_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(loan.due_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(loan.returned_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {loan.returned_at ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Vraceno
                                    </span>
                                ) : isOverdue(loan) ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Po terminu
                                    </span>
                                ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        Vypujceno
                                    </span>
                                )}
                            </td>
                            {showReturnButton && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {!loan.returned_at && (
                                        <ReturnButton loan={loan} onReturn={onReturn} />
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
