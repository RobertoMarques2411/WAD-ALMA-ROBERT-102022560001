<?php

namespace App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MaterialControllers extends Controller
{
    public function index(): View
    {
        $materials = Material::orderByDesc('id')->get();

        return view('materials.index', compact('materials'));
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'category' => ['required', Rule::in(Material::CATEGORIES)],
            'brand'    => ['required', 'string', 'max:100'],
            'supplier' => ['required', 'string', 'max:100'],
            'unit'     => ['required', 'string', 'max:50'],
            'stock'    => ['required', 'integer', 'min:0'],
            'status'   => ['required', Rule::in(Material::STATUSES)],
        ]);

        Material::create($data);

        return redirect()->route('materials.index')->with('success', 'Item berhasil ditambahkan.');
    }

    public function update(Request $request, Material $material): RedirectResponse
    {
        $data = $request->validate([
            'stock'  => ['required', 'integer', 'min:0'],
            'status' => ['required', Rule::in(Material::STATUSES)],
        ]);

        $material->update($data);

        return redirect()->route('materials.index')->with('success', 'Item berhasil diperbarui.');
    }

    public function destroy(Material $material): RedirectResponse
    {
        $material->delete();

        return redirect()->route('materials.index')->with('success', 'Item berhasil dihapus.');
    }
}
