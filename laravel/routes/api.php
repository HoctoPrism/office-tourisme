<?php

use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\ScheduleController;
use App\Http\Controllers\API\TypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource("types", TypeController::class);
Route::apiResource("events", EventController::class);
Route::apiResource("schedules", ScheduleController::class);
Route::apiResource("addresses", AddressController::class);
