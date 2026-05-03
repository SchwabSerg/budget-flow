<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table): void {
            $table->string('emoji', 16)->nullable()->after('name');
        });

        DB::table('categories')->update([
            'emoji' => '🏷️',
            'color' => 'coral',
        ]);

        Schema::table('categories', function (Blueprint $table): void {
            $table->string('emoji', 16)->nullable(false)->change();
            $table->string('color', 16)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        DB::table('categories')->update([
            'color' => '#D85A30',
        ]);

        Schema::table('categories', function (Blueprint $table): void {
            $table->string('color', 7)->nullable()->default(null)->change();
            $table->dropColumn('emoji');
        });
    }
};
