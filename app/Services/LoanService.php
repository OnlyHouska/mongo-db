<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Exception;

class LoanService
{
    public function borrowBook(string $bookId, string $readerId, ?Carbon $dueDate = null): Loan
    {
        $book = Book::findOrFail($bookId);
        $reader = User::findOrFail($readerId);

        if (!$book->isAvailable()) {
            throw new Exception('Kniha neni dostupna - vsechny kopie jsou vypujceny');
        }

        $loan = Loan::create([
            'book_id' => $book->id,
            'reader_id' => $reader->id,
            'borrowed_at' => now(),
            'due_date' => $dueDate ?? now()->addDays(14),
            'returned_at' => null,
        ]);

        $book->decrement('available_copies');

        return $loan->load(['book', 'reader']);
    }

    public function returnBook(Loan $loan): Loan
    {
        if ($loan->isReturned()) {
            throw new Exception('Tato vypujcka jiz byla vracena');
        }

        $loan->update([
            'returned_at' => now(),
        ]);

        $loan->book->increment('available_copies');

        return $loan->fresh()->load(['book', 'reader']);
    }

    public function getActiveLoans()
    {
        return Loan::with(['book', 'reader'])
            ->whereNull('returned_at')
            ->orderBy('due_date', 'asc')
            ->get();
    }

    public function getOverdueLoans()
    {
        return Loan::with(['book', 'reader'])
            ->whereNull('returned_at')
            ->where('due_date', '<', now())
            ->orderBy('due_date', 'asc')
            ->get();
    }

    public function getReaderLoans(string $readerId)
    {
        return Loan::with(['book'])
            ->where('reader_id', $readerId)
            ->orderBy('borrowed_at', 'desc')
            ->get();
    }

    public function getBookLoans(string $bookId)
    {
        return Loan::with(['reader'])
            ->where('book_id', $bookId)
            ->orderBy('borrowed_at', 'desc')
            ->get();
    }
}
