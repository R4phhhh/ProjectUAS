<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        // Fetch all products from the database
        $products = Product::all();

        // Return the products as JSON response
        return response()->json($products);
    }
    
    public function store(Request $request)
    {
        try {
            // Validate the incoming data
            $validated = $request->validate([
                'productName' => 'required|string|max:255',
                'price' => 'required|numeric',
                'stock' => 'required|integer',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            ]);

            // Create a new product without image upload
            $product = new Product();
            $product->name = $validated['productName'];
            $product->price = $validated['price'];
            $product->stock = $validated['stock'];

            // Handle image upload if present
            if ($request->hasFile('image')) {
                // Store the image in the public/products directory
                $imagePath = $request->file('image')->store('products', 'public'); // Store directly in public directory

                // Save the image path in the database
                $product->image = 'products/' . basename($imagePath); // Store relative path
            }

            // Save the product to the database
            $product->save();

            return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
        } catch (\Exception $e) {
            \Log::error('Error in ProductController store method', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product not found.'], 404);
        }
    }
}