<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShortenSentenceController;
use App\Http\Controllers\LongSentenceController;
use App\Http\Controllers\FixSpellingController;
use App\Http\Controllers\TranslateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/make_shorter', [ShortenSentenceController::class, 'makeShorter']);
Route::get('/make_longer', [LongSentenceController::class, 'makeLonger']);
Route::get('/fix_spelling', [FixSpellingController::class, 'fixSpelling']);
Route::get('/translate', [TranslateController::class, 'translate']);