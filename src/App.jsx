import React, { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

// ─── SAMPLE DATA — 20 Dokumen ISO 9001 ───────────────────────────────────────
const today = new Date()
function daysFromNow(d) {
  const t = new Date(today)
  t.setDate(t.getDate() + d)
  return t.toISOString().split('T')[0]
}
function daysBefore(d) {
  const t = new Date(today)
  t.setDate(t.getDate() - d)
  return t.toISOString().split('T')[0]
}

const DOCUMENTS = [
  { id: 'PSP-PRO-001', nama: 'Prosedur Kawalan Dokumen',            jenis: 'Prosedur',     versi: 'Ver 3.0', tarikhSemakan: daysBefore(10),  tarikhLuput: daysFromNow(355), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-PRO-002', nama: 'Prosedur Audit Dalaman',              jenis: 'Prosedur',     versi: 'Ver 2.0', tarikhSemakan: daysBefore(5),   tarikhLuput: daysFromNow(20),  pemilik: 'Unit Kualiti',         status: 'Hampir Luput' },
  { id: 'PSP-PRO-003', nama: 'Prosedur Tindakan Pembetulan',        jenis: 'Prosedur',     versi: 'Ver 2.1', tarikhSemakan: daysBefore(30),  tarikhLuput: daysFromNow(330), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-PRO-004', nama: 'Prosedur Semakan Pengurusan',         jenis: 'Prosedur',     versi: 'Ver 1.5', tarikhSemakan: daysBefore(60),  tarikhLuput: daysFromNow(10),  pemilik: 'Pengurusan Atasan',    status: 'Hampir Luput' },
  { id: 'PSP-PRO-005', nama: 'Prosedur Penilaian Pembekal',         jenis: 'Prosedur',     versi: 'Ver 1.0', tarikhSemakan: daysBefore(90),  tarikhLuput: daysBefore(5),    pemilik: 'Unit Perolehan',       status: 'Luput' },
  { id: 'PSP-PRO-006', nama: 'Prosedur Pengurusan Aduan',           jenis: 'Prosedur',     versi: 'Ver 2.0', tarikhSemakan: daysBefore(15),  tarikhLuput: daysFromNow(180), pemilik: 'Unit Khidmat Pelanggan', status: 'Semakan' },
  { id: 'PSP-PRO-007', nama: 'Prosedur Kawalan Rekod',              jenis: 'Prosedur',     versi: 'Ver 3.1', tarikhSemakan: daysBefore(3),   tarikhLuput: daysFromNow(362), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-AK-001',  nama: 'Arahan Kerja Mesyuarat Kualiti',      jenis: 'Arahan Kerja', versi: 'Ver 1.2', tarikhSemakan: daysBefore(20),  tarikhLuput: daysFromNow(160), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-AK-002',  nama: 'Arahan Kerja Pengurusan Fail',        jenis: 'Arahan Kerja', versi: 'Ver 2.0', tarikhSemakan: daysBefore(8),   tarikhLuput: daysFromNow(25),  pemilik: 'Unit Pentadbiran',     status: 'Hampir Luput' },
  { id: 'PSP-AK-003',  nama: 'Arahan Kerja Penggunaan Sistem ICT',  jenis: 'Arahan Kerja', versi: 'Ver 1.0', tarikhSemakan: daysBefore(45),  tarikhLuput: daysFromNow(200), pemilik: 'Unit ICT',             status: 'Semakan' },
  { id: 'PSP-AK-004',  nama: 'Arahan Kerja Pengurusan Aset',        jenis: 'Arahan Kerja', versi: 'Ver 1.3', tarikhSemakan: daysBefore(12),  tarikhLuput: daysFromNow(280), pemilik: 'Unit Aset',            status: 'Aktif' },
  { id: 'PSP-AK-005',  nama: 'Arahan Kerja Penyelenggaraan Makmal', jenis: 'Arahan Kerja', versi: 'Ver 2.1', tarikhSemakan: daysBefore(100), tarikhLuput: daysBefore(15),   pemilik: 'Unit Makmal',          status: 'Luput' },
  { id: 'PSP-AK-006',  nama: 'Arahan Kerja Pengurusan Perpustakaan',jenis: 'Arahan Kerja', versi: 'Ver 1.0', tarikhSemakan: daysBefore(25),  tarikhLuput: daysFromNow(300), pemilik: 'Unit Perpustakaan',    status: 'Aktif' },
  { id: 'PSP-BOR-001', nama: 'Borang Permohonan Semakan Dokumen',   jenis: 'Borang',       versi: 'Ver 2.0', tarikhSemakan: daysBefore(7),   tarikhLuput: daysFromNow(358), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-BOR-002', nama: 'Borang Daftar Dokumen Terkawal',      jenis: 'Borang',       versi: 'Ver 3.0', tarikhSemakan: daysBefore(2),   tarikhLuput: daysFromNow(363), pemilik: 'Unit Kualiti',         status: 'Aktif' },
  { id: 'PSP-BOR-003', nama: 'Borang Laporan Ketidakpatuhan (NCR)', jenis: 'Borang',       versi: 'Ver 1.5', tarikhSemakan: daysBefore(18),  tarikhLuput: daysFromNow(15),  pemilik: 'Unit Kualiti',         status: 'Hampir Luput' },
  { id: 'PSP-BOR-004', nama: 'Borang Tindakan Pembetulan (CAR)',    jenis: 'Borang',       versi: 'Ver 2.0', tarikhSemakan: daysBefore(40),  tarikhLuput: daysFromNow(250), pemilik: 'Unit Kualiti',         status: 'Kelulusan' },
  { id: 'PSP-BOR-005', nama: 'Borang Penilaian Latihan',            jenis: 'Borang',       versi: 'Ver 1.1', tarikhSemakan: daysBefore(55),  tarikhLuput: daysFromNow(185), pemilik: 'Unit HEP',             status: 'Aktif' },
  { id: 'PSP-BOR-006', nama: 'Borang Maklum Balas Pelanggan',       jenis: 'Borang',       versi: 'Ver 2.2', tarikhSemakan: daysBefore(22),  tarikhLuput: daysFromNow(5),   pemilik: 'Unit Kualiti',         status: 'Hampir Luput' },
  { id: 'PSP-BOR-007', nama: 'Borang Kelulusan Dokumen Baru',       jenis: 'Borang',       versi: 'Ver 1.0', tarikhSemakan: daysBefore(1),   tarikhLuput: daysFromNow(364), pemilik: 'Pengurusan Atasan',    status: 'Kelulusan' },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date(today.toISOString().split('T')[0])
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_STYLE = {
  'Aktif':        { pill: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  'Semakan':      { pill: 'bg-yellow-100 text-yellow-700',dot: 'bg-yellow-500' },
  'Kelulusan':    { pill: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500'   },
  'Hampir Luput': { pill: 'bg-orange-100 text-orange-700',dot: 'bg-orange-500' },
  'Luput':        { pill: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
}

const JENIS_COLOR = {
  'Prosedur':     '#2563eb',
  'Arahan Kerja': '#7c3aed',
  'Borang':       '#0891b2',
}

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard',   icon: '🏠' },
  { id: 'dokumen',   label: 'Dokumen',     icon: '📋' },
  { id: 'semakan',   label: 'Semakan',     icon: '🔄' },
  { id: 'luput',     label: 'Tamat Tempoh',icon: '⚠️' },
]

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, counts, onClose }) {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-6 pb-5 border-b border-blue-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-xl shadow flex-shrink-0">📋</div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Kawalan Dokumen</h1>
            <p className="text-xs text-blue-300">MS ISO 9001:2015</p>
          </div>
        </div>
        <div className="bg-blue-800/50 rounded-xl px-3 py-2.5">
          <p className="text-xs font-semibold text-blue-200 leading-tight">Politeknik Seberang Perai</p>
          <p className="text-xs text-blue-400 mt-0.5">Unit Kawalan Dokumen</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => { setActive(item.id); onClose && onClose() }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === item.id
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === 'luput' && counts.luput > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-bold">
                {counts.luput}
              </span>
            )}
            {item.id === 'semakan' && counts.semakan > 0 && (
              <span className="bg-yellow-500 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-bold">
                {counts.semakan}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-blue-800/50 space-y-0.5">
        <p className="text-xs text-blue-300 font-medium">Jumlah Dokumen</p>
        <p className="text-xl font-bold text-white">{DOCUMENTS.length}</p>
        <p className="text-xs text-blue-400">Semester 1 · 2024/2025</p>
      </div>
    </aside>
  )
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({ icon, title, value, sub, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 border-l-4 ${accent} hover:shadow-md transition-all w-full text-left`}
    >
      <span className="text-3xl select-none">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>}
      </div>
    </button>
  )
}

// ─── STATUS PILL ──────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Aktif']
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} flex-shrink-0`}></span>
      {status}
    </span>
  )
}

// ─── EXPIRY BADGE ─────────────────────────────────────────────────────────────
function ExpiryBadge({ dateStr }) {
  const days = daysUntil(dateStr)
  if (days < 0)  return <span className="text-xs font-semibold text-red-600">Luput {Math.abs(days)} hari lalu</span>
  if (days <= 30) return <span className="text-xs font-semibold text-orange-600">⚠ {days} hari lagi</span>
  return <span className="text-xs text-gray-400">{formatDate(dateStr)}</span>
}

// ─── DOCUMENT TABLE ───────────────────────────────────────────────────────────
function DocTable({ docs, compact }) {
  if (docs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📭</p>
        <p className="text-sm">Tiada dokumen dijumpai</p>
      </div>
    )
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID Dokumen</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Dokumen</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Jenis</th>
            {!compact && <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Versi</th>}
            {!compact && <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pemilik</th>}
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tamat Tempoh</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {docs.map(doc => (
            <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
              <td className="py-3 px-4 font-mono text-xs text-blue-700 font-semibold whitespace-nowrap">{doc.id}</td>
              <td className="py-3 px-4 text-gray-800 font-medium max-w-xs">
                <span className="truncate block" title={doc.nama}>{doc.nama}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-xs font-medium px-2 py-1 rounded-lg" style={{
                  background: JENIS_COLOR[doc.jenis] + '18',
                  color: JENIS_COLOR[doc.jenis]
                }}>
                  {doc.jenis}
                </span>
              </td>
              {!compact && <td className="py-3 px-4 text-gray-500 text-xs font-mono">{doc.versi}</td>}
              {!compact && <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">{doc.pemilik}</td>}
              <td className="py-3 px-4 whitespace-nowrap"><ExpiryBadge dateStr={doc.tarikhLuput} /></td>
              <td className="py-3 px-4"><StatusPill status={doc.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── PAGE: DASHBOARD ──────────────────────────────────────────────────────────
function PageDashboard({ setActive }) {
  const aktif      = DOCUMENTS.filter(d => d.status === 'Aktif').length
  const semakan    = DOCUMENTS.filter(d => d.status === 'Semakan' || d.status === 'Kelulusan').length
  const hampirLuput= DOCUMENTS.filter(d => d.status === 'Hampir Luput').length
  const luput      = DOCUMENTS.filter(d => d.status === 'Luput').length

  const chartData = [
    { name: 'Aktif',        count: aktif,       fill: '#16a34a' },
    { name: 'Semakan',      count: DOCUMENTS.filter(d => d.status === 'Semakan').length,  fill: '#ca8a04' },
    { name: 'Kelulusan',    count: DOCUMENTS.filter(d => d.status === 'Kelulusan').length,fill: '#2563eb' },
    { name: 'Hampir Luput', count: hampirLuput, fill: '#ea580c' },
    { name: 'Luput',        count: luput,       fill: '#dc2626' },
  ]

  const jenisStat = ['Prosedur', 'Arahan Kerja', 'Borang'].map(j => ({
    jenis: j,
    count: DOCUMENTS.filter(d => d.jenis === j).length,
    color: JENIS_COLOR[j]
  }))

  const alertDocs = DOCUMENTS
    .filter(d => daysUntil(d.tarikhLuput) <= 30)
    .sort((a, b) => daysUntil(a.tarikhLuput) - daysUntil(b.tarikhLuput))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-2xl p-6 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">Politeknik Seberang Perai</p>
        <h2 className="text-xl font-bold">Dashboard Kawalan Dokumen</h2>
        <p className="text-sm text-blue-200 mt-1">Sistem Pengurusan Kualiti MS ISO 9001:2015 · {DOCUMENTS.length} dokumen diuruskan</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon="📦" title="Jumlah Dokumen"    value={DOCUMENTS.length} sub="Semua kategori"          accent="border-blue-500"   onClick={() => setActive('dokumen')} />
        <KpiCard icon="✅" title="Dokumen Aktif"      value={aktif}            sub={`${Math.round(aktif/DOCUMENTS.length*100)}% daripada jumlah`} accent="border-green-500" onClick={() => setActive('dokumen')} />
        <KpiCard icon="🔄" title="Perlu Semakan"      value={semakan}          sub="Semakan & Kelulusan"     accent="border-yellow-500" onClick={() => setActive('semakan')} />
        <KpiCard icon="⚠️" title="Luput / Hampir Luput" value={luput + hampirLuput} sub={`${luput} luput · ${hampirLuput} hampir luput`} accent="border-red-400" onClick={() => setActive('luput')} />
      </div>

      {/* Chart + Jenis */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bar chart status */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">📊 Taburan Status Dokumen</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={v => [`${v} dokumen`, 'Bilangan']}
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontSize: 12 }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={52}>
                {chartData.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Jenis breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">📁 Pecahan Jenis Dokumen</h3>
          <div className="space-y-4">
            {jenisStat.map(j => {
              const pct = Math.round(j.count / DOCUMENTS.length * 100)
              return (
                <div key={j.jenis}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{j.jenis}</span>
                    <span className="font-bold" style={{ color: j.color }}>{j.count} dokumen ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: j.color }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium mb-2">Petunjuk Status</p>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.entries(STATUS_STYLE).map(([s, v]) => (
                <div key={s} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${v.dot}`}></span>
                  <span className="text-xs text-gray-600">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alert — hampir / sudah luput */}
      {alertDocs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <h3 className="text-sm font-semibold text-red-700">Dokumen Memerlukan Perhatian Segera</h3>
            </div>
            <button onClick={() => setActive('luput')} className="text-xs text-red-500 hover:text-red-700 font-semibold underline">
              Lihat semua →
            </button>
          </div>
          <DocTable docs={alertDocs} compact />
        </div>
      )}
    </div>
  )
}

// ─── PAGE: DOKUMEN ────────────────────────────────────────────────────────────
function PageDokumen() {
  const [search, setSearch]   = useState('')
  const [filterJ, setFilterJ] = useState('Semua')
  const [filterS, setFilterS] = useState('Semua')

  const jenisOpts  = ['Semua', 'Prosedur', 'Arahan Kerja', 'Borang']
  const statusOpts = ['Semua', 'Aktif', 'Semakan', 'Kelulusan', 'Hampir Luput', 'Luput']

  const filtered = useMemo(() => DOCUMENTS.filter(d => {
    const q = search.toLowerCase()
    const matchQ = d.nama.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.pemilik.toLowerCase().includes(q)
    const matchJ = filterJ === 'Semua' || d.jenis === filterJ
    const matchS = filterS === 'Semua' || d.status === filterS
    return matchQ && matchJ && matchS
  }), [search, filterJ, filterS])

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Cari nama dokumen, ID atau pemilik..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>
          <select
            value={filterJ}
            onChange={e => setFilterJ(e.target.value)}
            className="py-2.5 px-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          >
            {jenisOpts.map(j => <option key={j}>{j}</option>)}
          </select>
          <select
            value={filterS}
            onChange={e => setFilterS(e.target.value)}
            className="py-2.5 px-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          >
            {statusOpts.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-3">{filtered.length} daripada {DOCUMENTS.length} dokumen dipaparkan</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">📋 Senarai Dokumen Terkawal</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{filtered.length} dokumen</span>
        </div>
        <DocTable docs={filtered} />
      </div>
    </div>
  )
}

// ─── PAGE: SEMAKAN ────────────────────────────────────────────────────────────
function PageSemakan() {
  const semuaSemakan = DOCUMENTS.filter(d => d.status === 'Semakan' || d.status === 'Kelulusan')
  const semakan  = DOCUMENTS.filter(d => d.status === 'Semakan')
  const kelulusan= DOCUMENTS.filter(d => d.status === 'Kelulusan')

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-yellow-700">{semakan.length}</p>
          <p className="text-xs font-semibold text-yellow-600 mt-1 uppercase tracking-wide">Dalam Semakan</p>
          <p className="text-xs text-yellow-500 mt-0.5">Menunggu ulasan</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-blue-700">{kelulusan.length}</p>
          <p className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-wide">Menunggu Kelulusan</p>
          <p className="text-xs text-blue-500 mt-0.5">Perlu tindakan pengurusan</p>
        </div>
      </div>

      {/* Aliran */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">🔄 Aliran Semakan & Kelulusan Dokumen</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: 'Permintaan Semakan', color: 'bg-gray-100 text-gray-600' },
            { label: '→', color: '' },
            { label: 'Semakan Pegawai Kualiti', color: 'bg-yellow-100 text-yellow-700' },
            { label: '→', color: '' },
            { label: 'Kelulusan Pengurusan', color: 'bg-blue-100 text-blue-700' },
            { label: '→', color: '' },
            { label: 'Dokumen Aktif', color: 'bg-green-100 text-green-700' },
          ].map((s, i) => s.label === '→'
            ? <span key={i} className="text-gray-400 font-bold text-lg">→</span>
            : <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${s.color}`}>{s.label}</span>
          )}
        </div>
      </div>

      {/* Semakan table */}
      {semakan.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-yellow-50 border-b border-yellow-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-yellow-700 flex items-center gap-2">
              🔄 <span>Dokumen Dalam Semakan ({semakan.length})</span>
            </h3>
          </div>
          <DocTable docs={semakan} />
        </div>
      )}

      {/* Kelulusan table */}
      {kelulusan.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
              ✍️ <span>Menunggu Kelulusan ({kelulusan.length})</span>
            </h3>
          </div>
          <DocTable docs={kelulusan} />
        </div>
      )}

      {semuaSemakan.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400">
          <p className="text-5xl mb-3">✅</p>
          <p className="text-base font-medium text-gray-600">Tiada dokumen dalam semakan</p>
          <p className="text-sm mt-1">Semua dokumen sudah disemak dan diluluskan</p>
        </div>
      )}
    </div>
  )
}

// ─── PAGE: TAMAT TEMPOH ───────────────────────────────────────────────────────
function PageLuput() {
  const luput       = DOCUMENTS.filter(d => daysUntil(d.tarikhLuput) < 0)
  const hampir30    = DOCUMENTS.filter(d => { const days = daysUntil(d.tarikhLuput); return days >= 0 && days <= 30 })
  const hampir90    = DOCUMENTS.filter(d => { const days = daysUntil(d.tarikhLuput); return days > 30 && days <= 90 })

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-red-700">{luput.length}</p>
          <p className="text-xs font-semibold text-red-600 mt-1 uppercase tracking-wide">Sudah Luput</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-orange-700">{hampir30.length}</p>
          <p className="text-xs font-semibold text-orange-600 mt-1 uppercase tracking-wide">≤ 30 Hari</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-700">{hampir90.length}</p>
          <p className="text-xs font-semibold text-yellow-600 mt-1 uppercase tracking-wide">31–90 Hari</p>
        </div>
      </div>

      {/* Sudah luput */}
      {luput.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-red-600 px-6 py-4 flex items-center gap-2">
            <span className="text-white">🔴</span>
            <h3 className="text-sm font-semibold text-white">Dokumen Sudah Luput — Tindakan Segera Diperlukan ({luput.length})</h3>
          </div>
          <DocTable docs={luput} />
        </div>
      )}

      {/* Hampir luput ≤30 hari */}
      {hampir30.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 px-6 py-4 flex items-center gap-2">
            <span>🟠</span>
            <h3 className="text-sm font-semibold text-orange-700">Luput Dalam 30 Hari ({hampir30.length})</h3>
          </div>
          <DocTable docs={hampir30.sort((a, b) => daysUntil(a.tarikhLuput) - daysUntil(b.tarikhLuput))} />
        </div>
      )}

      {/* Hampir luput 31–90 hari */}
      {hampir90.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-yellow-50 border-b border-yellow-100 px-6 py-4 flex items-center gap-2">
            <span>🟡</span>
            <h3 className="text-sm font-semibold text-yellow-700">Luput Dalam 31–90 Hari ({hampir90.length})</h3>
          </div>
          <DocTable docs={hampir90.sort((a, b) => daysUntil(a.tarikhLuput) - daysUntil(b.tarikhLuput))} />
        </div>
      )}

      {luput.length === 0 && hampir30.length === 0 && hampir90.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-base font-medium text-gray-600">Semua dokumen dalam tempoh sah!</p>
          <p className="text-sm mt-1">Tiada dokumen luput atau hampir luput</p>
        </div>
      )}
    </div>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active,      setActive]      = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const counts = {
    luput:   DOCUMENTS.filter(d => d.status === 'Luput' || d.status === 'Hampir Luput').length,
    semakan: DOCUMENTS.filter(d => d.status === 'Semakan' || d.status === 'Kelulusan').length,
  }
  const activeNav = NAV.find(n => n.id === active)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar active={active} setActive={setActive} counts={counts} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar active={active} setActive={setActive} counts={counts} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-800">{activeNav?.icon} {activeNav?.label}</h2>
              <p className="text-xs text-gray-400">Politeknik Seberang Perai · MS ISO 9001:2015</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {counts.luput > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline">
                {counts.luput} perlu tindakan
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shadow-sm select-none">
              KD
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5 lg:p-7">
          <div className="max-w-6xl mx-auto">
            {active === 'dashboard' && <PageDashboard setActive={setActive} />}
            {active === 'dokumen'   && <PageDokumen />}
            {active === 'semakan'   && <PageSemakan />}
            {active === 'luput'     && <PageLuput />}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3 text-xs text-gray-400 flex items-center justify-between">
          <span>Politeknik Seberang Perai · Unit Kawalan Dokumen · MS ISO 9001:2015</span>
          <span>{DOCUMENTS.length} dokumen · v1.0.0</span>
        </footer>
      </div>
    </div>
  )
}
