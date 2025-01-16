<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'items.*.id' => 'required|integer|exists:products,id',
'items.*.quantity' => 'required|integer|min:1',

            'items' => 'required|array',
            'total' => 'required|numeric',
            'payment' => 'required|numeric',
            'change' => 'required|numeric',
        ]);

        // Process the transaction
        $transaction = new Transaction();
        $transaction->items = json_encode($validated['items']);
        $transaction->total = $validated['total'];
        $transaction->payment = $validated['payment'];
        $transaction->change = $validated['change'];
        $transaction->save();

        return response()->json([
            'message' => 'Transaction saved successfully',
            'transaction' => $transaction,
        ], 201);
    }

    public function showTransaction($id)
    {
        $transaction = Transaction::find($id);  // Mencari transaksi berdasarkan ID

        if ($transaction) {
            return response()->json([
                'transaction' => $transaction,
            ]);
        } else {
            return response()->json([
                'message' => 'Transaction not found',
            ]);
        }
    }
}