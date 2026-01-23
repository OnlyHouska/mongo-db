<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\StoreLoanRequest;
use App\Models\Loan;
use App\Services\LoanService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function __construct(
        protected LoanService $loanService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->canManageLoans()) {
            return response()->json([
                'message' => 'Nemate opravneni zobrazit seznam vypujcek',
            ], 403);
        }

        $query = Loan::with(['book', 'reader']);

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->whereNull('returned_at');
            } elseif ($request->status === 'returned') {
                $query->whereNotNull('returned_at');
            } elseif ($request->status === 'overdue') {
                $query->whereNull('returned_at')->where('due_date', '<', now());
            }
        }

        if ($request->has('reader_id') && $request->reader_id) {
            $query->where('reader_id', $request->reader_id);
        }

        if ($request->has('book_id') && $request->book_id) {
            $query->where('book_id', $request->book_id);
        }

        $perPage = $request->get('per_page', 10);
        $loans = $query->orderBy('borrowed_at', 'desc')->paginate($perPage);

        return response()->json([
            'loans' => $loans->items(),
            'meta' => [
                'current_page' => $loans->currentPage(),
                'last_page' => $loans->lastPage(),
                'per_page' => $loans->perPage(),
                'total' => $loans->total(),
            ],
        ]);
    }

    public function store(StoreLoanRequest $request): JsonResponse
    {
        try {
            $dueDate = $request->due_date ? Carbon::parse($request->due_date) : null;

            $loan = $this->loanService->borrowBook(
                $request->book_id,
                $request->reader_id,
                $dueDate
            );

            return response()->json([
                'message' => 'Kniha byla uspesne vypujcena',
                'loan' => $loan,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function show(string $id): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->canManageLoans()) {
            return response()->json([
                'message' => 'Nemate opravneni zobrazit detail vypujcky',
            ], 403);
        }

        $loan = Loan::with(['book', 'reader'])->findOrFail($id);

        return response()->json([
            'loan' => $loan,
        ]);
    }

    public function return(string $id): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->canManageLoans()) {
            return response()->json([
                'message' => 'Nemate opravneni vratit knihu',
            ], 403);
        }

        try {
            $loan = Loan::findOrFail($id);
            $loan = $this->loanService->returnBook($loan);

            return response()->json([
                'message' => 'Kniha byla uspesne vracena',
                'loan' => $loan,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function myLoans(): JsonResponse
    {
        $user = auth('api')->user();

        $loans = Loan::with(['book', 'reader'])
            ->where('reader_id', $user->id)
            ->orderBy('borrowed_at', 'desc')
            ->get();

        return response()->json([
            'loans' => $loans,
        ]);
    }
}
