<?php

use App\Http\Controllers\MaterialControllers;
use Illuminate\Support\Facades\Route;

Route::resource('materials', MaterialControllers::class)
    ->only(['index', 'store', 'update', 'destroy']);