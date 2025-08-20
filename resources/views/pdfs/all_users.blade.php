<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Semua Umat</title>
    <style>
        @page { size: A4; margin: 15px; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #222; }
        .header { text-align: center; margin-bottom: 18px; }
        .logo { width: 60px; height: 60px; margin-bottom: 8px; }
        .title { font-size: 1.5rem; font-weight: bold; color: #bfa14a; margin-bottom: 2px; }
        .subtitle { font-size: 1rem; color: #8c6a2a; margin-bottom: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
        th { background: linear-gradient(135deg, #bfa14a 0%, #8c6a2a 100%); color: white; font-weight: 600; font-size: 0.95rem; }
        tr:nth-child(even) { background: #f8fafc; }
        .footer { margin-top: 18px; text-align: center; font-size: 0.9rem; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logo.png') }}" alt="Logo Gereja" class="logo">
        <div class="title">Data Semua Umat</div>
        <div class="subtitle">Gereja St Paulus Kwimi</div>
    </div>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Gender</th>
                <th>Alamat</th>
                <th>Komunitas Basis</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $i => $user)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->username }}</td>
                <td>{{ $user->birth_place ?? '-' }}</td>
                <td>{{ $user->birth_date ? \Carbon\Carbon::parse($user->birth_date)->format('d-m-Y') : '-' }}</td>
                <td>{{ $user->gender == 'male' ? 'Laki-laki' : 'Perempuan' }}</td>
                <td>{{ $user->address ?? '-' }}</td>
                <td>{{ $user->community ? $user->community->name : '-' }}</td>
                <td>{{ $user->status == 'active' ? 'Aktif' : 'Nonaktif' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="footer">
        &copy; {{ date('Y') }} Gereja St Paulus Kwimi &mdash; Sistem Informasi Data Umat
    </div>
</body>
</html>
