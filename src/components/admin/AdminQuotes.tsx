import React, { useState } from 'react';
import { QuoteRequest } from '../../types';
import { Phone, Mail, Instagram, Calendar, FileText, CheckCircle2, MessageSquare, Trash2, Edit2 } from 'lucide-react';

interface AdminQuotesProps {
  quotes: QuoteRequest[];
  onUpdateQuote: (id: string, updates: Partial<QuoteRequest>) => void;
  onDeleteQuote: (id: string) => void;
}

export const AdminQuotes: React.FC<AdminQuotesProps> = ({
  quotes,
  onUpdateQuote,
  onDeleteQuote,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const filtered = quotes.filter((q) => {
    if (activeTab !== 'all' && q.status !== activeTab) return false;
    return true;
  });

  const getStatusBadge = (status: QuoteRequest['status']) => {
    switch (status) {
      case 'new':
        return { label: 'Nouveau devis', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
      case 'contacted':
        return { label: 'Contacté', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'quoted':
        return { label: 'Devis envoyé', bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30' };
      case 'closed':
        return { label: 'Validé / Clôturé', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
      default:
        return { label: status, bg: 'bg-zinc-800 text-zinc-300' };
    }
  };

  const handleSaveNote = (id: string) => {
    onUpdateQuote(id, { adminNotes: noteText });
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-studio-card border border-studio-border p-4 rounded-2xl">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-studio-red" />
            <span>Demandes de Devis Sur Mesure</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Projets personnalisés issus de l'option « Projet sur mesure ».
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'new', label: 'Nouveaux' },
            { id: 'contacted', label: 'Contactés' },
            { id: 'quoted', label: 'Devis envoyés' },
            { id: 'closed', label: 'Validés' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Cards */}
      {filtered.length === 0 ? (
        <div className="bg-studio-card border border-studio-border rounded-2xl p-12 text-center space-y-2">
          <FileText className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">Aucune demande de devis</h3>
          <p className="text-xs text-zinc-500">
            Les demandes de projets sur mesure s'afficheront automatiquement ici.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => {
            const badge = getStatusBadge(q.status);

            return (
              <div
                key={q.id}
                className="bg-studio-card border border-studio-border rounded-2xl p-5 shadow-xl space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-sm">
                      {q.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{q.fullName}</h4>
                        <span className="text-xs font-semibold text-studio-red">{q.instagram}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                        <a href={`tel:${q.phone}`} className="hover:text-white flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{q.phone}</span>
                        </a>
                        <span className="text-zinc-600">•</span>
                        <span>{q.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & actions */}
                  <div className="flex items-center gap-2">
                    <select
                      value={q.status}
                      onChange={(e) =>
                        onUpdateQuote(q.id, { status: e.target.value as QuoteRequest['status'] })
                      }
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-studio-red ${badge.bg}`}
                    >
                      <option value="new">Nouveau</option>
                      <option value="contacted">Contacté</option>
                      <option value="quoted">Devis envoyé</option>
                      <option value="closed">Validé / Clôturé</option>
                    </select>

                    <button
                      onClick={() => onDeleteQuote(q.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Supprimer la demande"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scope details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-semibold">
                      Type de projet
                    </span>
                    <span className="text-white font-semibold">{q.projectType}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-semibold">
                      Date souhaitée
                    </span>
                    <span className="text-white font-medium">
                      {q.desiredDate ? q.desiredDate : 'Non spécifiée'}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-semibold">
                      Nombre de personnes
                    </span>
                    <span className="text-white font-medium">{q.peopleCount} pers.</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-semibold">
                      Budget estimé
                    </span>
                    <span className="text-studio-red font-bold font-mono">{q.budgetRange}</span>
                  </div>
                </div>

                {/* Services tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-semibold uppercase text-zinc-500 tracking-wider">
                    Services demandés :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {q.services.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-700/70 text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-xs">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">
                    Cahier des charges / Description :
                  </span>
                  <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">{q.description}</p>
                </div>

                {/* Internal Admin Note */}
                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  {editingNoteId === q.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Ajouter une note de suivi..."
                        className="flex-1 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                      />
                      <button
                        onClick={() => handleSaveNote(q.id)}
                        className="px-3 py-1 bg-white text-black font-semibold rounded-lg text-xs"
                      >
                        Enregistrer
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-zinc-500">
                        Note interne :{' '}
                        <span className="text-zinc-300 italic">
                          {q.adminNotes || 'Aucune note.'}
                        </span>
                      </span>
                      <button
                        onClick={() => {
                          setEditingNoteId(q.id);
                          setNoteText(q.adminNotes || '');
                        }}
                        className="text-xs text-studio-red hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>{q.adminNotes ? 'Modifier note' : 'Ajouter note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
