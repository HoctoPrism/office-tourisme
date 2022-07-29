<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EventDatetime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EventDatetimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $eventdatetimes = DB::table('event_datetimes')
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'Success',
            'data' => $eventdatetimes
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
            'date_start' => 'required',
            'date_end' => 'required',
        ]);

        $eventdatetime = EventDatetime::create([
            'date_start' => $request->date_start,
            'date_end' => $request->date_end,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $eventdatetime,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param EventDatetime $eventdatetime
     * @return JsonResponse
     */
    public function show(EventDatetime $eventdatetime): JsonResponse
    {
        return response()->json($eventdatetime);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param EventDatetime $eventdatetime
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, EventDatetime $eventdatetime): JsonResponse
    {
        $this->validate($request, [
            'date_start' => 'required',
            'date_end' => 'required',
        ]);

        $eventdatetime->update([
            'date_start' => $request->date_start,
            'date_end' => $request->date_end,
        ]);

        return response()->json([
            'status' => 'Modifié avec success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param EventDatetime $eventdatetime
     * @return JsonResponse
     */
    public function destroy(EventDatetime $eventdatetime): JsonResponse
    {
        $eventdatetime->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }
}
