<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Kegiatan Gereja</title>
    <style>
        @page { 
            size: A4 portrait; 
            margin: 20mm 15mm; 
        }
        body { 
            font-family: 'Arial', sans-serif; 
            font-size: 11pt; 
            color: #222; 
            line-height: 1.4;
        }
        .header { 
            text-align: center; 
            margin-bottom: 25px; 
            padding-bottom: 15px;
            border-bottom: 3px solid #bfa14a;
        }
        .logo { 
            width: 70px; 
            height: 70px; 
            margin-bottom: 10px; 
        }
        .title { 
            font-size: 20pt; 
            font-weight: bold; 
            color: #bfa14a; 
            margin-bottom: 5px; 
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .church-name { 
            font-size: 14pt; 
            color: #8c6a2a; 
            margin-bottom: 3px;
            font-weight: 600;
        }
        .period { 
            font-size: 12pt; 
            color: #555; 
            margin-top: 10px;
            font-weight: 500;
        }
        
        .summary {
            background: #f8f9fa;
            padding: 12px 15px;
            margin: 20px 0;
            border-left: 4px solid #bfa14a;
            border-radius: 4px;
        }
        .summary-title {
            font-weight: bold;
            color: #8c6a2a;
            font-size: 11pt;
            margin-bottom: 8px;
        }
        .summary-item {
            margin: 5px 0;
            font-size: 10pt;
        }
        
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 15px; 
        }
        th, td { 
            padding: 8px 10px; 
            border: 1px solid #ddd; 
            text-align: left; 
            vertical-align: top;
        }
        th { 
            background: linear-gradient(135deg, #bfa14a 0%, #8c6a2a 100%); 
            color: white; 
            font-weight: 600; 
            font-size: 10pt;
            text-align: center;
        }
        tr:nth-child(even) { 
            background: #f8fafc; 
        }
        tr:hover {
            background: #e8f4f8;
        }
        .no-col {
            width: 5%;
            text-align: center;
        }
        .name-col {
            width: 30%;
        }
        .date-col {
            width: 15%;
            text-align: center;
        }
        .time-col {
            width: 12%;
            text-align: center;
            font-weight: 600;
            color: #2563eb;
        }
        .location-col {
            width: 20%;
        }
        .description-col {
            width: 18%;
            font-size: 9pt;
            color: #555;
        }
        
        .activity-name {
            font-weight: 600;
            color: #222;
            margin-bottom: 3px;
        }
        
        .no-data {
            text-align: center;
            padding: 30px;
            color: #999;
            font-style: italic;
        }
        
        .footer { 
            margin-top: 30px; 
            padding-top: 15px;
            border-top: 2px solid #e2e8f0;
            text-align: center; 
            font-size: 9pt; 
            color: #6b7280; 
        }
        .generated-info {
            margin-top: 5px;
            font-size: 8pt;
            color: #999;
        }
        
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logo.png') }}" alt="Logo Gereja" class="logo">
        <div class="title">Laporan Kegiatan Gereja</div>
        <div class="church-name">Gereja St Paulus Kwimi</div>
        <div class="period">Periode: {{ $period }}</div>
    </div>

    <div class="summary">
        <div class="summary-title">Ringkasan Laporan</div>
        <div class="summary-item">
            <strong>Periode:</strong> {{ $period }}
        </div>
        <div class="summary-item">
            <strong>Total Kegiatan Terlaksana:</strong> {{ $total_activities }} kegiatan
        </div>
        <div class="summary-item">
            <strong>Tanggal Cetak:</strong> {{ $generated_at }}
        </div>
    </div>

    @if(count($activities) > 0)
        <table>
            <thead>
                <tr>
                    <th class="no-col">No</th>
                    <th class="name-col">Nama Kegiatan</th>
                    <th class="date-col">Tanggal</th>
                    <th class="time-col">Waktu</th>
                    <th class="location-col">Lokasi</th>
                    <th class="description-col">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                @foreach($activities as $index => $activity)
                <tr>
                    <td class="no-col">{{ $index + 1 }}</td>
                    <td class="name-col">
                        <div class="activity-name">{{ $activity->name }}</div>
                    </td>
                    <td class="date-col">{{ $activity->formatted_date }}</td>
                    <td class="time-col">{{ $activity->formatted_time }}</td>
                    <td class="location-col">{{ $activity->location ?? '-' }}</td>
                    <td class="description-col">
                        {{ $activity->description ? Str::limit($activity->description, 100) : '-' }}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <div class="no-data">
            Tidak ada data kegiatan untuk periode yang dipilih.
        </div>
    @endif

    <div class="footer">
        <div>
            <strong>&copy; {{ date('Y') }} Gereja St Paulus Kwimi</strong>
        </div>
        <div>Sistem Informasi Manajemen Gereja</div>
        <div class="generated-info">
            Dokumen ini dicetak secara otomatis pada {{ $generated_at }}
        </div>
    </div>
</body>
</html>
