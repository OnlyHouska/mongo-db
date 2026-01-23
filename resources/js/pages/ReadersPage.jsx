import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useReaders } from '../hooks/useReaders';
import { ReaderList } from '../components/Readers/ReaderList';
import { ReaderForm } from '../components/Readers/ReaderForm';
import { SearchInput } from '../components/Common/SearchInput';
import { Pagination } from '../components/Common/Pagination';
import { Modal } from '../components/Common/Modal';
import { Alert } from '../components/Common/Alert';
import { useNavigate } from 'react-router-dom';

export function ReadersPage() {
    const { isAdmin } = useAuth();
    const { readers, loading, error, meta, fetchReaders, createReader, updateReader, deleteReader } = useReaders();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [editingReader, setEditingReader] = useState(null);
    const [filters, setFilters] = useState({ search: '', page: 1 });
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchReaders(filters);
    }, [fetchReaders, filters]);

    const handleSearch = (search) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleCreate = () => {
        setEditingReader(null);
        setShowForm(true);
    };

    const handleEdit = (reader) => {
        setEditingReader(reader);
        setShowForm(true);
    };

    const handleDelete = async (reader) => {
        if (!confirm(`Opravdu chcete smazat ctenare "${reader.name}"?`)) return;

        try {
            await deleteReader(reader.id);
            setSuccessMessage('Ctenar byl uspesne smazan');
            fetchReaders(filters);
        } catch (err) {
            // Error is handled by the hook
        }
    };

    const handleViewLoans = (reader) => {
        navigate(`/loans?reader_id=${reader.id}`);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingReader) {
                await updateReader(editingReader.id, data);
                setSuccessMessage('Ctenar byl uspesne aktualizovan');
            } else {
                await createReader(data);
                setSuccessMessage('Ctenar byl uspesne vytvoren');
            }
            setShowForm(false);
            setEditingReader(null);
            fetchReaders(filters);
        } catch (err) {
            // Error is handled by the hook
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Ctenari</h1>
                {isAdmin && (
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Pridat ctenare
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

            <div className="mb-6">
                <SearchInput onSearch={handleSearch} placeholder="Hledat ctenare..." />
            </div>

            <ReaderList
                readers={readers}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewLoans={handleViewLoans}
            />

            <Pagination meta={meta} onPageChange={handlePageChange} />

            <Modal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingReader(null);
                }}
                title={editingReader ? 'Upravit ctenare' : 'Novy ctenar'}
            >
                <ReaderForm
                    reader={editingReader}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingReader(null);
                    }}
                    loading={loading}
                />
            </Modal>
        </div>
    );
}
