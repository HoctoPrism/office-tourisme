<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Type;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        $places = Place::with(['event', 'type', 'schedule', 'address'])->get();

        return response()->json([
            'status' => 'Success',
            'data' => $places
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
            'name' => 'required|max:100',
            'description' => 'required',
            'image' => 'image|nullable|max: 1999',
            'address' => 'required',
        ]);

        $place = Place::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'address' => $request->address,
            'event' => $request->event,
            'type' => $request->type,
            'schedule' => $request->schedule,
        ]);

        $place->type = $place->type()->get()[0];
        $place->event = $place->event()->get()[0];
        $place->schedule = $place->schedule()->get()[0];
        $place->address = $place->address()->get()[0];

        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Place $place
     * @return JsonResponse
     */
    public function show(Place $place): JsonResponse
    {
        $place->type = $place->type()->get()[0];
        $place->event = $place->event()->get()[0];
        $place->schedule = $place->schedule()->get()[0];
        $place->address = $place->address()->get()[0];
        return response()->json($place);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Place $place
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Place $place): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|max:100',
            'description' => 'required',
            'image' => 'nullable' /*'image|nullable|max: 1999'*/,
            'address' => 'required',
        ]);

        $place->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'address' => $request->address,
            'event' => $request->event,
            'type' => $request->type,
            'schedule' => $request->schedule,
        ]);

        $place->type = $place->type()->get()[0];
        $place->event = $place->event()->get()[0];
        $place->schedule = $place->schedule()->get()[0];
        $place->address = $place->address()->get()[0];

        return response()->json([
            'status' => 'Mise à jour avec success',
            'data' => $place
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Place $place
     * @return JsonResponse
     */
    public function destroy(Place $place): JsonResponse
    {
        $place->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }
}
