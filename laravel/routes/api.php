<?php

use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\PlaceController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('current-user', 'currentUser');
});

Route::controller(TypeController::class)->group(function () {
    Route::get('types', 'index');
    Route::get('types/{type}', 'show');
    Route::post('types', 'store')->middleware('auth:api');
    Route::patch('types/{type}', 'update')->middleware('auth:api');
    Route::delete('types/{type}', 'destroy')->middleware('auth:api');
});

Route::controller(ScheduleController::class)->group(function () {
    Route::get('schedules', 'index');
    Route::get('schedules/{schedule}', 'show');
    Route::post('schedules', 'store')->middleware('auth:api');
    Route::patch('schedules/{schedule}', 'update')->middleware('auth:api');
    Route::delete('schedules/{schedule}', 'destroy')->middleware('auth:api');
});

Route::controller(EventController::class)->group(function () {
    Route::get('events', 'index');
    Route::get('events/{event}', 'show');
    Route::post('events', 'store')->middleware('auth:api');
    Route::patch('events/{event}', 'update')->middleware('auth:api');
    Route::delete('events/{event}', 'destroy')->middleware('auth:api');
});

Route::controller(AddressController::class)->group(function () {
    Route::get('addresses', 'index');
    Route::get('addresses/{address}', 'show');
    Route::post('addresses', 'store')->middleware('auth:api');
    Route::patch('addresses/{address}', 'update')->middleware('auth:api');
    Route::delete('addresses/{address}', 'destroy')->middleware('auth:api');
});

Route::controller(PlaceController::class)->group(function () {
    Route::get('places', 'index');
    Route::get('places/{place}', 'show');
    Route::post('places', 'store')->middleware('auth:api');
    Route::patch('places/{place}', 'update')->middleware('auth:api');
    Route::delete('places/{place}', 'destroy')->middleware('auth:api');
});
