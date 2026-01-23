import { useState } from 'react';

export function ReturnButton({ loan, onReturn }) {
    const [loading, setLoading] = useState(false);

    const handleReturn = async () => {
        if (!confirm('Opravdu chcete vratit tuto knihu?')) return;

        setLoading(true);
        try {
            await onReturn(loan.id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleReturn}
            disabled={loading}
            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Vracim...' : 'Vratit'}
        </button>
    );
}
