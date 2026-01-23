<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reader\StoreReaderRequest;
use App\Http\Requests\Reader\UpdateReaderRequest;
use App\Models\Reader;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReaderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->isAdmin() && !$user->isLibrarian()) {
            return response()->json([
                'message' => 'Nemate opravneni zobrazit seznam ctenaru',
            ], 403);
        }

        $query = Reader::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('class', 'like', "%{$search}%");
            });
        }

        if ($request->has('class') && $request->class) {
            $query->where('class', $request->class);
        }

        $perPage = $request->get('per_page', 10);
        $readers = $query->orderBy('name')->paginate($perPage);

        return response()->json([
            'readers' => $readers->items(),
            'meta' => [
                'current_page' => $readers->currentPage(),
                'last_page' => $readers->lastPage(),
                'per_page' => $readers->perPage(),
                'total' => $readers->total(),
            ],
        ]);
    }

    public function store(StoreReaderRequest $request): JsonResponse
    {
        $reader = Reader::create($request->validated());

        return response()->json([
            'message' => 'Ctenar byl uspesne vytvoren',
            'reader' => $reader,
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->isAdmin() && !$user->isLibrarian()) {
            return response()->json([
                'message' => 'Nemate opravneni zobrazit detail ctenare',
            ], 403);
        }

        $reader = Reader::with('activeLoans.book')->findOrFail($id);

        return response()->json([
            'reader' => $reader,
        ]);
    }

    public function update(UpdateReaderRequest $request, string $id): JsonResponse
    {
        $reader = Reader::findOrFail($id);
        $reader->update($request->validated());

        return response()->json([
            'message' => 'Ctenar byl uspesne aktualizovan',
            'reader' => $reader->fresh(),
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'Nemate opravneni smazat ctenare',
            ], 403);
        }

        $reader = Reader::findOrFail($id);

        if ($reader->activeLoans()->count() > 0) {
            return response()->json([
                'message' => 'Nelze smazat ctenare s aktivnimi vypujckami',
            ], 422);
        }

        $reader->delete();

        return response()->json([
            'message' => 'Ctenar byl uspesne smazan',
        ]);
    }
}
