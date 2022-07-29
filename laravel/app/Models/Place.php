<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Place extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'image', 'event', 'schedule', 'type', 'address'];

    public function event(): BelongsTo
    {
        return $this->BelongsTo(Event::class, 'event');
    }

    public function schedule(): BelongsTo
    {
        return $this->BelongsTo(Schedule::class, 'schedule');
    }

    public function type(): BelongsTo
    {
        return $this->BelongsTo(Type::class, 'type');
    }

    public function address(): BelongsTo
    {
        return $this->BelongsTo(Address::class, 'address');
    }
}
