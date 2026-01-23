import { useState, useCallback } from 'react';
import { booksApi } from '../services/api';

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchBooks = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await booksApi.getAll(params);
            setBooks(response.data.books);
            setMeta(response.data.meta);
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist knihy');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchBook = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await booksApi.getOne(id);
            setBook(response.data.book);
            return response.data.book;
        } catch (err) {
            setError(err.response?.data?.message || 'Nepodarilo se nacist knihu');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchGenres = useCallback(async () => {
        try {
            const response = await booksApi.getGenres();
            setGenres(response.data.genres);
        } catch (err) {
            console.error('Failed to fetch genres:', err);
        }
    }, []);

    const createBook = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await booksApi.create(data);
            return response.data.book;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se vytvorit knihu';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateBook = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await booksApi.update(id, data);
            return response.data.book;
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se aktualizovat knihu';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteBook = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await booksApi.delete(id);
        } catch (err) {
            const message = err.response?.data?.message || 'Nepodarilo se smazat knihu';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        books,
        book,
        genres,
        loading,
        error,
        meta,
        fetchBooks,
        fetchBook,
        fetchGenres,
        createBook,
        updateBook,
        deleteBook,
    };
}
