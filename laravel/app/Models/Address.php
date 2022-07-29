<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['address', 'city', 'postal_code', 'latitude', 'longitude'];

    public function place(): HasMany
    {
        return $this->HasMany(Place::class);
    }
}
