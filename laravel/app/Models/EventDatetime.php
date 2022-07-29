<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventDatetime extends Model
{
    use HasFactory;
    protected $fillable = ['date_start', 'date_end'];

    public function event(): HasMany
    {
        return $this->HasMany(Event::class);
    }
}
