import React, { useState, useMemo } from 'react';
import { Booking, QuoteRequest, StudioPackage } from '../../types';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart,
  Sparkles,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

interface AdminStatsProps {
  bookings: Booking[];
  quotes: QuoteRequest[];
  packages: StudioPackage[];
}

type TimeRange = 'all' | '30days' | 'month' | '7days';

export const AdminStats: React.FC<AdminStatsProps> = ({ bookings, quotes, packages }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // Filter bookings according to timeRange
  const filteredBookings = useMemo(() => {
    const now = new Date();
    if (timeRange === 'all') return bookings;

    return bookings.filter((b) => {
      const bDate = new Date(b.date + 'T00:00:00');
      if (timeRange === '7days') {
        const diffDays = (now.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays >= 0 && diffDays <= 7;
      }
      if (timeRange === '30days') {
        const diffDays = (now.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays >= 0 && diffDays <= 30;
      }
      if (timeRange === 'month') {
        return (
          bDate.getFullYear() === now.getFullYear() &&
          bDate.getMonth() === now.getMonth()
        );
      }
      return true;
    });
  }, [bookings, timeRange]);

  // Key Financial & Operational Metrics
  const stats = useMemo(() => {
    let confirmedRevenue = 0;
    let pendingRevenue = 0;
    let totalStudioHours = 0;
    let confirmedCount = 0;
    let newCount = 0;
    let completedCount = 0;
    let cancelledCount = 0;
    let totalPeople = 0;

    // Service popularity map: { [pkgName]: { count, revenue, duration } }
    const serviceStats: {
      [pkgName: string]: { count: number; revenue: number; duration: number };
    } = {};

    // Hour popularity map
    const hourStats: { [slot: string]: number } = {};

    // Day of week popularity map
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dayStats: { [day: string]: number } = {
      Lundi: 0,
      Mardi: 0,
      Mercredi: 0,
      Jeudi: 0,
      Vendredi: 0,
      Samedi: 0,
      Dimanche: 0,
    };

    filteredBookings.forEach((b) => {
      const isConfirmedOrDone = b.status === 'confirmed' || b.status === 'completed';
      const isPending = b.status === 'new' || b.status === 'pending';

      if (isConfirmedOrDone) {
        confirmedRevenue += b.packagePrice || 0;
        totalStudioHours += b.packageDuration || 0;
      }

      if (isPending) {
        pendingRevenue += b.packagePrice || 0;
      }

      if (b.status === 'confirmed') confirmedCount++;
      if (b.status === 'new') newCount++;
      if (b.status === 'completed') completedCount++;
      if (b.status === 'cancelled') cancelledCount++;

      totalPeople += b.peopleCount || 1;

      // Group by package
      const sName = b.packageName || 'Autre';
      if (!serviceStats[sName]) {
        serviceStats[sName] = { count: 0, revenue: 0, duration: 0 };
      }
      serviceStats[sName].count += 1;
      if (isConfirmedOrDone) {
        serviceStats[sName].revenue += b.packagePrice || 0;
      }
      serviceStats[sName].duration += b.packageDuration || 0;

      // Group by slot
      if (b.timeSlot) {
        hourStats[b.timeSlot] = (hourStats[b.timeSlot] || 0) + 1;
      }

      // Group by day of week
      if (b.date) {
        const d = new Date(b.date + 'T00:00:00');
        const dayName = dayNames[d.getDay()];
        if (dayName) {
          dayStats[dayName] = (dayStats[dayName] || 0) + 1;
        }
      }
    });

    const totalCount = filteredBookings.length;
    const avgOrderValue =
      confirmedCount + completedCount > 0
        ? Math.round(confirmedRevenue / (confirmedCount + completedCount))
        : 0;

    const confirmationRate =
      totalCount > 0 ? Math.round(((confirmedCount + completedCount) / totalCount) * 100) : 0;

    const avgPeople = totalCount > 0 ? (totalPeople / totalCount).toFixed(1) : '1.0';

    // Quotes metrics
    const closedQuotesCount = quotes.filter((q) => q.status === 'closed').length;
    const newQuotesCount = quotes.filter((q) => q.status === 'new').length;

    // Convert serviceStats to sorted array
    const sortedServices = Object.entries(serviceStats)
      .map(([name, data]) => ({
        name,
        count: data.count,
        revenue: data.revenue,
        duration: data.duration,
        pct: confirmedRevenue > 0 ? Math.round((data.revenue / confirmedRevenue) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Busiest hour
    const busiestHour = Object.entries(hourStats).sort((a, b) => b[1] - a[1])[0] || [
      '14:00',
      0,
    ];

    // Busiest day
    const busiestDay = Object.entries(dayStats).sort((a, b) => b[1] - a[1])[0] || [
      'Samedi',
      0,
    ];

    return {
      confirmedRevenue,
      pendingRevenue,
      totalStudioHours,
      confirmedCount,
      newCount,
      completedCount,
      cancelledCount,
      totalCount,
      avgOrderValue,
      confirmationRate,
      avgPeople,
      sortedServices,
      busiestHour,
      busiestDay,
      dayStats,
      newQuotesCount,
      closedQuotesCount,
    };
  }, [filteredBookings, quotes]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-studio-card border border-studio-border p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Tableau de Bord & Performance Financière
            </h2>
            <p className="text-xs text-zinc-400">
              Statistiques générées en temps réel pour TRA Studio
            </p>
          </div>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              timeRange === 'all'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tout le temps
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              timeRange === 'month'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ce mois-ci
          </button>
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              timeRange === '30days'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            30 derniers jours
          </button>
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              timeRange === '7days'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            7 jours
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Chiffre d'Affaires Confirmé */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              CA Encaissé / Confirmé
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">
              {stats.confirmedRevenue.toLocaleString('fr-FR')}
            </span>
            <span className="text-sm font-bold text-studio-red">DH</span>
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 pt-1 border-t border-studio-border/50">
            <span className="text-emerald-400 font-semibold">{stats.confirmedCount + stats.completedCount}</span> séance(s) validée(s)
          </p>
        </div>

        {/* KPI 2: Revenu Potentiel En Attente */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Revenus en attente
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-amber-300">
              {stats.pendingRevenue.toLocaleString('fr-FR')}
            </span>
            <span className="text-sm font-bold text-studio-red">DH</span>
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 pt-1 border-t border-studio-border/50">
            <span className="text-amber-400 font-semibold">{stats.newCount}</span> nouvelle(s) demande(s) à confirmer
          </p>
        </div>

        {/* KPI 3: Panier Moyen par Séance */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Panier Moyen
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">
              {stats.avgOrderValue.toLocaleString('fr-FR')}
            </span>
            <span className="text-sm font-bold text-studio-red">DH</span>
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 pt-1 border-t border-studio-border/50">
            Moyenne facturée par séance
          </p>
        </div>

        {/* KPI 4: Heures de Studio Réservées */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Heures de Studio
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">
              {stats.totalStudioHours}
            </span>
            <span className="text-sm font-semibold text-zinc-400">heures</span>
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 pt-1 border-t border-studio-border/50">
            Temps total réservé en plateau
          </p>
        </div>
      </div>
      {/* Toggle Button for Detailed Charts */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-studio-red" />
          <span>Analyse approfondie (Prestations, Statuts & Habitudes)</span>
        </span>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>{showDetails ? 'Masquer les graphiques' : 'Afficher les graphiques'}</span>
          <span className="text-[10px]">{showDetails ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Secondary Metrics: Service Breakdown & Operational Stats */}
      {showDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Left Column: Prestation Performance (8 cols) */}
          <div className="lg:col-span-8 bg-studio-card border border-studio-border rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border/60">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-studio-red" />
                  <span>Performance par Prestation</span>
                </h3>
              <p className="text-xs text-zinc-400">
                Volume de réservations et part du chiffre d'affaires par service
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {stats.sortedServices.length} prestation(s)
            </span>
          </div>

          {stats.sortedServices.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              Aucune donnée de réservation pour la période sélectionnée.
            </div>
          ) : (
            <div className="space-y-4">
              {stats.sortedServices.map((srv, idx) => (
                <div key={idx} className="space-y-1.5 bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        {srv.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-zinc-400">
                        <strong className="text-white font-bold">{srv.count}</strong> séance(s)
                      </span>
                      <span className="font-bold text-white">
                        {srv.revenue.toLocaleString('fr-FR')} <span className="text-[10px] text-studio-red">DH</span>
                      </span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                        {srv.pct}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-studio-red to-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(srv.pct, 4)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Status Funnel & Key Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Breakdown Card */}
          <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 pb-2 border-b border-studio-border/50 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-studio-red" />
              <span>Statuts des Réservations</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirmées</span>
                </span>
                <span className="font-mono font-bold text-white">{stats.confirmedCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/50">
                <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>En cours d'examen</span>
                </span>
                <span className="font-mono font-bold text-white">{stats.newCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/50">
                <span className="text-purple-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Séances Réalisées</span>
                </span>
                <span className="font-mono font-bold text-white">{stats.completedCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/50">
                <span className="text-rose-300 font-semibold flex items-center gap-1.5">
                  <span>Annulées</span>
                </span>
                <span className="font-mono font-bold text-white">{stats.cancelledCount}</span>
              </div>

              <div className="pt-2 border-t border-studio-border/50 flex items-center justify-between text-zinc-400">
                <span>Taux de validation :</span>
                <span className="text-white font-bold">{stats.confirmationRate}%</span>
              </div>
            </div>
          </div>

          {/* Operational Insights */}
          <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 pb-2 border-b border-studio-border/50 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-studio-red" />
              <span>Habitudes de Réservation</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Horaire le plus demandé</span>
                <span className="text-white font-bold font-mono px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  {stats.busiestHour[0]}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Jour le plus actif</span>
                <span className="text-white font-bold px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  {stats.busiestDay[0]}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Moyenne participants</span>
                <span className="text-white font-bold">
                  {stats.avgPeople} pers. / séance
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-studio-border/40">
                <span className="text-zinc-400">Devis sur mesure reçus</span>
                <span className="text-blue-400 font-bold">{quotes.length} ({stats.newQuotesCount} en attente)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
