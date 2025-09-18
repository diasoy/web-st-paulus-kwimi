<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Jadwal Ibadah</title>
    <style>
        @page { size: A4; margin: 15px; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #222; }
        .header { text-align: center; margin-bottom: 18px; }
        .logo { width: 60px; height: 60px; margin-bottom: 8px; }
        .title { font-size: 1.5rem; font-weight: bold; color: #bfa14a; margin-bottom: 2px; }
        .subtitle { font-size: 1rem; color: #8c6a2a; margin-bottom: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: left; }
        .time-col { font-weight: 600; color: #2563eb; }
        th { background: linear-gradient(135deg, #bfa14a 0%, #8c6a2a 100%); color: white; font-weight: 600; font-size: 0.95rem; }
        tr:nth-child(even) { background: #f8fafc; }
        .footer { margin-top: 18px; text-align: center; font-size: 0.9rem; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logo.png') }}" alt="Logo Gereja" class="logo">
        <div class="title">Jadwal Ibadah</div>
        <div class="subtitle">Gereja St Paulus Kwimi</div>
    </div>
    <table>
        <thead>
            <tr >
                <th style="color:#222;">No</th>
                <th style="color:#222;">Nama Ibadah</th>
                <th style="color:#222;">Tanggal</th>
                <th style="color:#222;">Waktu</th>
                <th style="color:#222;">Pemimpin</th>
                <th style="color:#222;">Komunitas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($schedules as $i => $schedule)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $schedule->name }}</td>
                <td>{{ \Carbon\Carbon::parse($schedule->date)->format('d-m-Y') }}</td>
                <td class="time-col">{{ $schedule->time_start ? \Carbon\Carbon::parse($schedule->time_start)->format('H:i') . ' WIT' : '-' }}</td>
                <td>{{ $schedule->pic }}</td>
                <td>
                    @if($schedule->communities && count($schedule->communities))
                        {{ $schedule->communities->pluck('name')->implode(', ') }}
                    @else
                        Semua komunitas
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="footer">
        &copy; {{ date('Y') }} Gereja St Paulus Kwimi &mdash; Sistem Informasi Jadwal Ibadah
    </div>
</body>
</html>
