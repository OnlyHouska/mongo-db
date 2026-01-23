import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export function Header() {
    const { user, logout, isAdmin, isLibrarian } = useAuth();

    const getRoleBadge = () => {
        if (isAdmin) return 'Admin';
        if (isLibrarian) return 'Knihovnik';
        return 'Ctenar';
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            Skolni Knihovna
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {user?.name}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {getRoleBadge()}
                        </span>
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Odhlasit
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
