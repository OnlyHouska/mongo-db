<?php

namespace App\Http\Controllers\Api;

use App\Enums\Genre;
use App\Http\Controllers\Controller;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Book::query();

        if ($request->has('genre') && $request->genre) {
            $query->where('genre', $request->genre);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 10);
        $books = $query->orderBy('title')->paginate($perPage);

        return response()->json([
            'books' => $books->items(),
            'meta' => [
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
                'per_page' => $books->perPage(),
                'total' => $books->total(),
            ],
        ]);
    }

    public function store(StoreBookRequest $request): JsonResponse
    {
        $book = Book::create($request->validated());

        return response()->json([
            'message' => 'Kniha byla uspesne vytvorena',
            'book' => $book,
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $book = Book::findOrFail($id);

        return response()->json([
            'book' => $book,
        ]);
    }

    public function update(UpdateBookRequest $request, string $id): JsonResponse
    {
        $book = Book::findOrFail($id);
        $book->update($request->validated());

        return response()->json([
            'message' => 'Kniha byla uspesne aktualizovana',
            'book' => $book->fresh(),
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'Nemate opravneni smazat knihu',
            ], 403);
        }

        $book = Book::findOrFail($id);

        if ($book->activeLoans()->count() > 0) {
            return response()->json([
                'message' => 'Nelze smazat knihu s aktivnimi vypujckami',
            ], 422);
        }

        $book->delete();

        return response()->json([
            'message' => 'Kniha byla uspesne smazana',
        ]);
    }

    public function genres(): JsonResponse
    {
        return response()->json([
            'genres' => Genre::values(),
        ]);
    }
}
