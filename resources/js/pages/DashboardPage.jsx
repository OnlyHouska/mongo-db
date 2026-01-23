import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks';
import { useReaders } from '../hooks/useReaders';
import { useLoans } from '../hooks/useLoans';

export function DashboardPage() {
    const { user, isAdmin, canManageLoans } = useAuth();
    const { books, fetchBooks } = useBooks();
    const { readers, fetchReaders } = useReaders();
    const { loans, fetchLoans } = useLoans();

    const [stats, setStats] = useState({
        totalBooks: 0,
        totalReaders: 0,
        activeLoans: 0,
        overdueLoans: 0,
    });

    useEffect(() => {
        fetchBooks({ per_page: 100 });
        if (isAdmin || canManageLoans) {
            fetchReaders({ per_page: 100 });
            fetchLoans({ status: 'active', per_page: 100 });
        }
    }, [fetchBooks, fetchReaders, fetchLoans, isAdmin, canManageLoans]);

    useEffect(() => {
        const overdueCount = loans.filter(
            (loan) => !loan.returned_at && new Date(loan.due_date) < new Date()
        ).length;

        setStats({
            totalBooks: books.length,
            totalReaders: readers.length,
            activeLoans: loans.length,
            overdueLoans: overdueCount,
        });
    }, [books, readers, loans]);

    const StatCard = ({ title, value, color, link }) => (
        <Link
            to={link}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`}
        >
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
        </Link>
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Vitejte, {user?.name}!
                </h1>
                <p className="text-gray-600">
                    Prehled skolni knihovny
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Celkem knih"
                    value={stats.totalBooks}
                    color="text-blue-600"
                    link="/books"
                />
                {(isAdmin || canManageLoans) && (
                    <>
                        <StatCard
                            title="Celkem ctenaru"
                            value={stats.totalReaders}
                            color="text-purple-600"
                            link="/readers"
                        />
                        <StatCard
                            title="Aktivni vypujcky"
                            value={stats.activeLoans}
                            color="text-yellow-600"
                            link="/loans"
                        />
                        <StatCard
                            title="Po terminu"
                            value={stats.overdueLoans}
                            color="text-red-600"
                            link="/loans?status=overdue"
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Rychle akce
                    </h2>
                    <div className="space-y-3">
                        <Link
                            to="/books"
                            className="block w-full px-4 py-2 text-center text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                            Prohlizet knihy
                        </Link>
                        {canManageLoans && (
                            <Link
                                to="/loans"
                                className="block w-full px-4 py-2 text-center text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50"
                            >
                                Spravovat vypujcky
                            </Link>
                        )}
                        <Link
                            to="/my-loans"
                            className="block w-full px-4 py-2 text-center text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50"
                        >
                            Moje vypujcky
                        </Link>
                    </div>
                </div>

                {canManageLoans && stats.overdueLoans > 0 && (
                    <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-6">
                        <h2 className="text-lg font-semibold text-red-900 mb-4">
                            Upozorneni
                        </h2>
                        <p className="text-red-700">
                            Mate {stats.overdueLoans} vypujcek po terminu!
                        </p>
                        <Link
                            to="/loans?status=overdue"
                            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Zobrazit
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
