import { useState, useCallback } from 'react';
import { readersApi } from '../services/api';

export function useReaders() {
    const [readers, setReaders] = useState([]);
    const [reader, setReader] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchReaders = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await readersApi.getAll(params);
            setReaders(response.data.readers);
            setMeta(response.data.meta);
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist ctenare');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchReader = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await readersApi.getOne(id);
            setReader(response.data.reader);
            return response.data.reader;
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist ctenare');
        } finally {
            setLoading(false);
        }
    }, []);

    const createReader = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await readersApi.create(data);
            return response.data.reader;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se vytvorit ctenare';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateReader = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await readersApi.update(id, data);
            return response.data.reader;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se aktualizovat ctenare';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteReader = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await readersApi.delete(id);
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se smazat ctenare';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        readers,
        reader,
        loading,
        error,
        meta,
        fetchReaders,
        fetchReader,
        createReader,
        updateReader,
        deleteReader,
    };
}
