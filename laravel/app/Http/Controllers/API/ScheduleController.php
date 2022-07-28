<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $schedules = DB::table('schedules')
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'Success',
            'data' => $schedules
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
            'monday' => 'required',
            'tuesday' => 'required',
            'wednesday' => 'required',
            'thursday' => 'required',
            'friday' => 'required',
            'saturday' => 'required',
            'sunday' => 'required'
        ]);

        $schedule = Schedule::create([
            'monday' => $request->monday,
            'tuesday' => $request->tuesday,
            'wednesday' => $request->wednesday,
            'thursday' => $request->thursday,
            'friday' => $request->friday,
            'saturday' => $request->saturday,
            'sunday' => $request->sunday,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $schedule,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Schedule $schedule
     * @return JsonResponse
     */
    public function show(Schedule $schedule): JsonResponse
    {
        return response()->json($schedule);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Schedule $schedule
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Schedule $schedule): JsonResponse
    {
        $this->validate($request, [
            'monday' => 'required',
            'tuesday' => 'required',
            'wednesday' => 'required',
            'thursday' => 'required',
            'friday' => 'required',
            'saturday' => 'required',
            'sunday' => 'required'
        ]);

        $schedule->update([
            'monday' => $request->monday,
            'tuesday' => $request->tuesday,
            'wednesday' => $request->wednesday,
            'thursday' => $request->thursday,
            'friday' => $request->friday,
            'saturday' => $request->saturday,
            'sunday' => $request->sunday,
        ]);

        return response()->json([
            'status' => 'Mise à jour avec success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Schedule $schedule
     * @return JsonResponse
     */
    public function destroy(Schedule $schedule): JsonResponse
    {
        $schedule->delete();

        return response()->json([
            'status' => 'Supprimer avec success'
        ]);
    }
}
