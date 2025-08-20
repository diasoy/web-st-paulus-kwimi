<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Detail Umat - {{ $user->name }}</title>
    <style>
        @page { 
            size: A4; 
            margin: 25px; 
        }
        
        body {
            font-family: 'Times New Roman', 'Segoe UI', serif;
            font-size: 14px;
            line-height: 1.5;
            background: #ffffff;
            color: #2c3e50;
            margin: 0;
            padding: 0;
        }
        
        .pdf-container {
            background: #ffffff;
            max-width: 100%;
            margin: 0;
            padding: 20px;
            border: 2px solid #bfa14a; /* gold theme */
            border-radius: 8px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #bfa14a; /* gold theme */
            position: relative;
        }
        
        .church-info {
            margin-bottom: 15px;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 10px;
            border: 2px solid #bfa14a; /* gold theme */
            border-radius: 50%;
            padding: 5px;
            background: #f8fafc;
        }
        
        .church-name {
            font-size: 1.4rem;
            font-weight: bold;
            color: #bfa14a; /* gold theme */
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .church-subtitle {
            font-size: 1rem;
            color: #475569;
            margin-bottom: 15px;
            font-style: italic;
        }
        
        .document-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: #bfa14a; /* gold theme */
            margin-bottom: 8px;
            text-decoration: underline;
            text-decoration-color: #8c6a2a; /* brown theme */
        }
        
        .member-name {
            font-size: 1.3rem;
            color: #dc2626;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .member-username {
            font-size: 0.95rem;
            color: #6b7280;
            font-style: italic;
        }
        
        .section-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #8c6a2a; /* brown theme */
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e5e7eb;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        th {
            background: linear-gradient(135deg, #bfa14a 0%, #8c6a2a 100%); /* gold to brown */
            color: white;
            font-weight: 600;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        
        .label-col {
            width: 35%;
            font-weight: 600;
            color: #8c6a2a; /* brown theme */
            background: #f8fafc;
        }
        
        .value-col {
            color: #1f2937;
            background: white;
        }
        
        tr:hover {
            background: #f1f5f9;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #8c6a2a;
            text-align: center;
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .footer-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .print-date {
            font-weight: 500;
            color: #374151;
        }
        
        .blessing {
            font-style: italic;
            color: #1e3a8a;
            margin-top: 15px;
            font-size: 0.95rem;
        }
        
        .divider {
            height: 3px;
            background: linear-gradient(90deg, #bfa14a 0%, #8c6a2a 50%, #bfa14a 100%); /* gold-brown-gold */
            margin: 20px 0;
            border-radius: 2px;
        }
        
        /* Print optimizations */
        @media print {
            body { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .pdf-container {
                border: none;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        <!-- Header Section -->
        <div class="header">
            <div class="church-info">
                <img src="{{ public_path('images/logo.png') }}" alt="Logo Gereja" class="logo">
                <div class="church-name">Gereja St Paulus Kwimi</div>
            </div>
            
            <div class="document-title">Kartu Data Umat</div>
        </div>
        
        <div class="divider"></div>
        
        <!-- Content Section -->
        <div class="content-section">
            <div class="section-title">Data Pribadi</div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 35%;">Keterangan</th>
                        <th>Informasi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="label-col">Nama Lengkap</td>
                        <td class="value-col">{{ $user->name }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Username</td>
                        <td class="value-col">{{ $user->username }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Tempat Lahir</td>
                        <td class="value-col">{{ $user->birth_place ?? 'Belum diisi' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Tanggal Lahir</td>
                        <td class="value-col">
                            {{ $user->birth_date ? \Carbon\Carbon::parse($user->birth_date)->format('d F Y') : 'Belum diisi' }}
                            @if($user->birth_date)
                                ({{ \Carbon\Carbon::parse($user->birth_date)->age }} tahun)
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td class="label-col">Jenis Kelamin</td>
                        <td class="value-col">
                            @if($user->gender == 'male')
                                <span class="gender-male">Laki-laki</span>
                            @else
                                <span class="gender-female">Perempuan</span>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td class="label-col">Alamat</td>
                        <td class="value-col">{{ $user->address ?? 'Belum diisi' }}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="section-title">Informasi Gerejawi</div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 35%;">Keterangan</th>
                        <th>Informasi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="label-col">Komunitas Basis</td>
                        <td class="value-col">{{ $user->community ? $user->community->name : 'Belum terdaftar dalam KB' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Status Keanggotaan</td>
                        <td class="value-col">
                            @if($user->status == 'active')
                                <span class="status-active">Aktif</span>
                            @else
                                <span class="status-inactive">Nonaktif</span>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td class="label-col">Terdaftar Sejak</td>
                        <td class="value-col">{{ \Carbon\Carbon::parse($user->created_at)->format('d F Y, H:i') }} WIT</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="divider"></div>
        
        <!-- Footer Section -->
        <div class="footer">
            <div style="margin: 15px 0; font-size: 0.85rem;">
                &copy; {{ date('Y') }} Gereja St Paulus Kwimi &mdash; Sistem Informasi Data Umat
            </div>
        </div>
    </div>
</body>
</html>