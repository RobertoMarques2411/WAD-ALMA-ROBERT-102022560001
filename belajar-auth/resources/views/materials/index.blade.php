@extends('layouts.app')

@section('title', 'Cleaning Material')

@section('content')
<div class="box">
    <h1>Cleaning Material Module</h1>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if ($errors->any())
        <div class="alert alert-error">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <h3>Add New Material</h3>
    <form method="POST" action="{{ route('materials.store') }}">
        @csrf

        <label>Category</label>
        <select name="category" required>
            <option value="">-- Select Category --</option>
            @foreach (\App\Models\Material::CATEGORIES as $cat)
                <option value="{{ $cat }}" @selected(old('category') === $cat)>{{ $cat }}</option>
            @endforeach
        </select>

        <label>Brand</label>
        <input type="text" name="brand" value="{{ old('brand') }}" placeholder="e.g. Rinso" required>

        <label>Supplier</label>
        <input type="text" name="supplier" value="{{ old('supplier') }}" placeholder="e.g. PT Unilever" required>

        <label>Unit</label>
        <input type="text" name="unit" value="{{ old('unit', '5 liter') }}" required>

        <label>Stock</label>
        <input type="number" name="stock" min="0" value="{{ old('stock') }}" required>

        <label>Status</label>
        <select name="status" required>
            <option value="">-- Select Status --</option>
            @foreach (\App\Models\Material::STATUSES as $st)
                <option value="{{ $st }}" @selected(old('status') === $st)>{{ $st }}</option>
            @endforeach
        </select>

        <button type="submit">+ Add Item</button>
    </form>

    <h3>Material List</h3>
    <table>
        <tr>
            <th>No</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Unit</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
        </tr>

        @forelse ($materials as $i => $m)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $m->brand }}</td>
                <td>{{ $m->category }}</td>
                <td>{{ $m->supplier }}</td>
                <td>{{ $m->unit }}</td>

                <td colspan="3">
                    <form method="POST" action="{{ route('materials.update', $m) }}">
                        @csrf
                        @method('PUT')

                        <input type="number" name="stock" min="0" value="{{ $m->stock }}" required>

                        <select name="status" required>
                            @foreach (\App\Models\Material::STATUSES as $st)
                                <option value="{{ $st }}" @selected($m->status === $st)>{{ $st }}</option>
                            @endforeach
                        </select>

                        <button type="submit" class="btn-small btn-update">Update</button>
                    </form>

                    &nbsp;

                    <form method="POST" action="{{ route('materials.destroy', $m) }}"
                          onsubmit="return confirm('Delete this item?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn-small btn-delete">Delete</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="8">No data yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection