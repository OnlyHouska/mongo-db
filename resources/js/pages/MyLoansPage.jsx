import { useEffect } from 'react';
import { useLoans } from '../hooks/useLoans';
import { Alert } from '../components/Common/Alert';

export function MyLoansPage() {
    const { myLoans, loading, error, fetchMyLoans } = useLoans();

    useEffect(() => {
        fetchMyLoans();
    }, [fetchMyLoans]);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('cs-CZ');
    };

    const isOverdue = (loan) => {
        if (loan.returned_at) return false;
        return new Date(loan.due_date) < new Date();
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const activeLoans = myLoans.filter((loan) => !loan.returned_at);
    const returnedLoans = myLoans.filter((loan) => loan.returned_at);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Moje vypujcky</h1>

            {error && <Alert type="error" message={error} />}

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Aktualni vypujcky ({activeLoans.length})
                </h2>
                {activeLoans.length === 0 ? (
                    <p className="text-gray-500">Nemate zadne aktivni vypujcky</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeLoans.map((loan) => (
                            <div
                                key={loan.id}
                                className={`bg-white rounded-lg shadow-sm border p-4 ${
                                    isOverdue(loan) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {loan.book?.title || 'Neznama kniha'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {loan.book?.author || ''}
                                </p>
                                <div className="mt-3 space-y-1 text-sm">
                                    <p>
                                        <span className="text-gray-500">Vypujceno:</span>{' '}
                                        {formatDate(loan.borrowed_at)}
                                    </p>
                                    <p>
                                        <span className="text-gray-500">Termin:</span>{' '}
                                        <span className={isOverdue(loan) ? 'text-red-600 font-medium' : ''}>
                                            {formatDate(loan.due_date)}
                                        </span>
                                    </p>
                                </div>
                                {isOverdue(loan) && (
                                    <div className="mt-2">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                            Po terminu!
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Historie vypujcek ({returnedLoans.length})
                </h2>
                {returnedLoans.length === 0 ? (
                    <p className="text-gray-500">Zadna historie vypujcek</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Kniha
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Vypujceno
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Vraceno
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {returnedLoans.map((loan) => (
                                    <tr key={loan.id}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {loan.book?.title || 'Neznama kniha'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {loan.book?.author || ''}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(loan.borrowed_at)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(loan.returned_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
