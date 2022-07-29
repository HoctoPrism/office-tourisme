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
            'name' => 'required|max:100',
        ]);

        $schedule = Schedule::create([
            'name' => $request->name,
            'monday_start' => $request->monday_start,
            'monday_end' => $request->monday_end,
            'tuesday_start' => $request->tuesday_start,
            'tuesday_end' => $request->tuesday_end,
            'wednesday_start' => $request->wednesday_start,
            'wednesday_end' => $request->wednesday_end,
            'thursday_start' => $request->thursday_start,
            'thursday_end' => $request->thursday_end,
            'friday_start' => $request->friday_start,
            'friday_end' => $request->friday_end,
            'saturday_start' => $request->saturday_start,
            'saturday_end' => $request->saturday_end,
            'sunday_start' => $request->sunday_start,
            'sunday_end' => $request->sunday_end
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
        $this->validate($request ,[
            'name' => 'required|max:100',
        ]);

        $schedule->update([
            'name' => $request->name,
            'monday_start' => $request->monday_start,
            'monday_end' => $request->monday_end,
            'tuesday_start' => $request->tuesday_start,
            'tuesday_end' => $request->tuesday_end,
            'wednesday_start' => $request->wednesday_start,
            'wednesday_end' => $request->wednesday_end,
            'thursday_start' => $request->thursday_start,
            'thursday_end' => $request->thursday_end,
            'friday_start' => $request->friday_start,
            'friday_end' => $request->friday_end,
            'saturday_start' => $request->saturday_start,
            'saturday_end' => $request->saturday_end,
            'sunday_start' => $request->sunday_start,
            'sunday_end' => $request->sunday_end
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
