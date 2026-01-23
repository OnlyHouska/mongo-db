import { useState, useCallback } from 'react';
import { loansApi } from '../services/api';

export function useLoans() {
    const [loans, setLoans] = useState([]);
    const [loan, setLoan] = useState(null);
    const [myLoans, setMyLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchLoans = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loansApi.getAll(params);
            setLoans(response.data.loans);
            setMeta(response.data.meta);
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist vypujcky');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchLoan = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loansApi.getOne(id);
            setLoan(response.data.loan);
            return response.data.loan;
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist vypujcku');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMyLoans = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await loansApi.getMyLoans();
            setMyLoans(response.data.loans);
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist vase vypujcky');
        } finally {
            setLoading(false);
        }
    }, []);

    const createLoan = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loansApi.create(data);
            return response.data.loan;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se vytvorit vypujcku';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const returnLoan = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loansApi.return(id);
            return response.data.loan;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se vratit knihu';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loans,
        loan,
        myLoans,
        loading,
        error,
        meta,
        fetchLoans,
        fetchLoan,
        fetchMyLoans,
        createLoan,
        returnLoan,
    };
}
