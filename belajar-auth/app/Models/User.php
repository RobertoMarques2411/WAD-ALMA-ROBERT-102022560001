<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    public const CATEGORIES = ['Fragrance', 'Detergent', 'Softener'];
    public const STATUSES   = ['Still Available', 'Need Order'];

    protected $fillable = [
        'brand', 'category', 'supplier', 'unit', 'stock', 'status',
    ];
}