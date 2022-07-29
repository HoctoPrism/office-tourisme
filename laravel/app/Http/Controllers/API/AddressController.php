<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $addresss = DB::table('addresses')
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'Success',
            'data' => $addresss
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $this->validate($request ,[
            'address' => 'required|max:100',
            'city' => 'required|max:100',
            'postal_code' => 'required|max:5',
            'latitude' => 'required|max:100',
            'longitude' => 'required|max:100'
        ]);

        $address = Address::create([
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $address,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Address $address
     * @return JsonResponse
     */
    public function show(Address $address): JsonResponse
    {
        return response()->json($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Address $address
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Address $address): JsonResponse
    {
        $this->validate($request ,[
            'address' => 'required|max:100',
            'city' => 'required|max:100',
            'postal_code' => 'required|max:5',
            'latitude' => 'required|max:100',
            'longitude' => 'required|max:100'
        ]);

        $address->update([
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json([
            'status' => 'Mise à jour avec success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Address $address
     * @return JsonResponse
     */
    public function destroy(Address $address): JsonResponse
    {
        $address->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }
}
