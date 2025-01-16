<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

// Routes for Product management
Route::resource('products', ProductController::class);

Route::get('products', [ProductController::class, 'index']);
Route::post('products', [ProductController::class, 'store']);
Route::delete('products/{product}', [ProductController::class, 'destroy']);

// In your routes/api.php
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::post('/debug-product', [ProductController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['message' => 'Test route is working']);
});

// Route::post('/debug-product', function (Request $request) {
//     return response()->json([
//         'data' => $request->all(),  // This will return all incoming data
//         'message' => 'Debugging Product API'
//     ]);
// });

// Routes for Transaction management
Route::post('transactions', [TransactionController::class, 'store']);
Route::get('transactions/{id}', [TransactionController::class, 'showTransaction']);

// Optional: Route to test API is working (e.g., for debugging)
Route::get('ping', function () {
    return response()->json(['message' => 'API is working']);
});
