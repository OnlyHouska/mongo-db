import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoans } from '../hooks/useLoans';
import { useBooks } from '../hooks/useBooks';
import { useReaders } from '../hooks/useReaders';
import { LoanList } from '../components/Loans/LoanList';
import { LoanForm } from '../components/Loans/LoanForm';
import { Pagination } from '../components/Common/Pagination';
import { Modal } from '../components/Common/Modal';
import { Alert } from '../components/Common/Alert';

export function LoansPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { loans, loading, error, meta, fetchLoans, createLoan, returnLoan } = useLoans();
    const { books, fetchBooks } = useBooks();
    const { readers, fetchReaders } = useReaders();

    const [showForm, setShowForm] = useState(false);
    const [filters, setFilters] = useState({
        status: searchParams.get('status') || '',
        reader_id: searchParams.get('reader_id') || '',
        book_id: searchParams.get('book_id') || '',
        page: 1,
    });
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchBooks({ per_page: 100 });
        fetchReaders({ per_page: 100 });
    }, [fetchBooks, fetchReaders]);

    useEffect(() => {
        fetchLoans(filters);
    }, [fetchLoans, filters]);

    const handleStatusChange = (status) => {
        setFilters((prev) => ({ ...prev, status, page: 1 }));
        setSearchParams(status ? { status } : {});
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleCreate = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (data) => {
        try {
            await createLoan(data);
            setSuccessMessage('Kniha byla uspesne vypujcena');
            setShowForm(false);
            fetchLoans(filters);
            fetchBooks({ per_page: 100 });
        } catch (err) {
            // Error is handled by the hook
        }
    };

    const handleReturn = async (loanId) => {
        try {
            await returnLoan(loanId);
            setSuccessMessage('Kniha byla uspesne vracena');
            fetchLoans(filters);
            fetchBooks({ per_page: 100 });
        } catch (err) {
            // Error is handled by the hook
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Vypujcky</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                    Nova vypujcka
                </button>
            </div>

            {successMessage && (
                <Alert
                    type="success"
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {error && <Alert type="error" message={error} />}

            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => handleStatusChange('')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        filters.status === ''
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Vsechny
                </button>
                <button
                    onClick={() => handleStatusChange('active')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        filters.status === 'active'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Aktivni
                </button>
                <button
                    onClick={() => handleStatusChange('overdue')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        filters.status === 'overdue'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Po terminu
                </button>
                <button
                    onClick={() => handleStatusChange('returned')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        filters.status === 'returned'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Vracene
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <LoanList
                    loans={loans}
                    loading={loading}
                    onReturn={handleReturn}
                    showReturnButton={true}
                />
            </div>

            <Pagination meta={meta} onPageChange={handlePageChange} />

            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                title="Nova vypujcka"
            >
                <LoanForm
                    books={books}
                    readers={readers}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    loading={loading}
                />
            </Modal>
        </div>
    );
}
