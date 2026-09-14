import React, { useState } from 'react';
import { StudioPackage } from '../../types';
import { 
  Plus, 
  Edit2, 
  Check, 
  Clock, 
  Sparkles, 
  X, 
  Eye, 
  EyeOff, 
  Save, 
  Trash2, 
  Image as ImageIcon,
  Tag,
  AlertTriangle
} from 'lucide-react';

interface AdminServicesProps {
  packages: StudioPackage[];
  onSavePackages: (packages: StudioPackage[]) => void;
}

const PRESET_IMAGES = [
  { label: 'Plateau 4K (Frontal)', url: '/catalog-photos/tra-studio-desktop-frontal.jpg' },
  { label: 'Régie Directe (Mixer)', url: '/catalog-photos/tra-studio-desktop-angled.jpg' },
  { label: 'Logo Officiel Studio', url: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg' },
  { label: 'Ambiance Studio Témara', url: '/images/studio-hero-bg.jpg' },
];

export const AdminServices: React.FC<AdminServicesProps> = ({
  packages,
  onSavePackages,
}) => {
  const [editingPkg, setEditingPkg] = useState<StudioPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<StudioPackage | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(2);
  const [price, setPrice] = useState(1500);
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [popular, setPopular] = useState(false);
  const [badge, setBadge] = useState('');
  const [imageUrl, setImageUrl] = useState('/catalog-photos/tra-studio-desktop-frontal.jpg');

  const startEdit = (pkg: StudioPackage) => {
    setEditingPkg(pkg);
    setIsCreating(false);
    setName(pkg.name);
    setDuration(pkg.duration);
    setPrice(pkg.price);
    setSubtitle(pkg.subtitle || '');
    setDescription(pkg.description || '');
    setFeaturesText((pkg.features || []).join('\n'));
    setPopular(pkg.popular || false);
    setBadge(pkg.badge || '');
    setImageUrl(pkg.imageUrl || '/catalog-photos/tra-studio-desktop-frontal.jpg');
  };

  const startCreate = () => {
    setEditingPkg(null);
    setIsCreating(true);
    setName('');
    setDuration(2);
    setPrice(1500);
    setSubtitle('Prestation professionnelle en studio');
    setDescription('');
    setFeaturesText('2 heures d’accès exclusif au plateau\nÉclairages & caméras 4K\nFichiers bruts délivrés immédiatement');
    setPopular(false);
    setBadge('Nouveau');
    setImageUrl('/catalog-photos/tra-studio-desktop-frontal.jpg');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (isCreating) {
      const newPkg: StudioPackage = {
        id: 'pack-' + Date.now().toString(36),
        name: name.trim().toUpperCase(),
        duration,
        price,
        subtitle: subtitle.trim(),
        description: description.trim(),
        features,
        popular,
        badge: badge.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        active: true,
      };
      onSavePackages([...packages, newPkg]);
    } else if (editingPkg) {
      const updated = packages.map((p) =>
        p.id === editingPkg.id
          ? {
              ...p,
              name: name.trim().toUpperCase(),
              duration,
              price,
              subtitle: subtitle.trim(),
              description: description.trim(),
              features,
              popular,
              badge: badge.trim() || undefined,
              imageUrl: imageUrl.trim() || undefined,
            }
          : p
      );
      onSavePackages(updated);
    }

    setEditingPkg(null);
    setIsCreating(false);
  };

  const toggleActive = (id: string) => {
    const updated = packages.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    onSavePackages(updated);
  };

  const confirmDelete = (pkg: StudioPackage) => {
    setPackageToDelete(pkg);
  };

  const executeDelete = () => {
    if (!packageToDelete) return;
    const filtered = packages.filter((p) => p.id !== packageToDelete.id);
    onSavePackages(filtered);
    setPackageToDelete(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-studio-card border border-studio-border p-5 rounded-3xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-1">
            <Sparkles className="w-3 h-3 text-studio-red" />
            <span>Catalogue Studio</span>
          </div>
          <h2 className="text-xl font-black text-white">Prestations & Tarifs</h2>
          <p className="text-xs text-zinc-400">
            Créez, modifiez ou supprimez les formules visibles par vos clients.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-studio-red hover:bg-studio-redHover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Ajouter une prestation</span>
        </button>
      </div>

      {/* Confirmation Modal for Deletion */}
      {packageToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-red-900/60 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800/80 flex items-center justify-center text-studio-red">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Supprimer cette prestation ?</h3>
              <p className="text-xs text-zinc-400">
                Êtes-vous sûr de vouloir supprimer définitivement <strong className="text-white font-semibold">« {packageToDelete.name} »</strong> ? 
                Cette formule sera immédiatement retirée sur le site client et sur tous les téléphones.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setPackageToDelete(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-studio-red hover:bg-studio-redHover text-white flex items-center gap-1.5 cursor-pointer shadow-lg shadow-studio-red/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmer la suppression</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Form Modal */}
      {(editingPkg || isCreating) && (
        <div className="bg-studio-card border-2 border-zinc-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-studio-red" />
              <span>{isCreating ? 'Nouvelle Prestation Studio' : `Modifier ${editingPkg?.name}`}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingPkg(null);
                setIsCreating(false);
              }}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Titre du service <span className="text-studio-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: PODCAST STUDIO"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-bold uppercase"
                />
              </div>

              {/* Badge */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3 text-studio-red" />
                  <span>Badge Spécial</span>
                </label>
                <input
                  type="text"
                  placeholder="ex: Populaire, Viral 9:16..."
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                />
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Tarif (DH) <span className="text-studio-red">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  step={50}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-bold"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Durée de session (Heures) <span className="text-studio-red">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={12}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-bold"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Sous-titre accrocheur
                </label>
                <input
                  type="text"
                  placeholder="ex: Multicam 4K & micros Shure"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                />
              </div>
            </div>

            {/* Photo Selection / Image URL */}
            <div className="space-y-2 pt-1 border-t border-zinc-800">
              <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-studio-red" />
                <span>Photo d'ambiance de fond</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`text-xs px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                      imageUrl === preset.url
                        ? 'bg-studio-red text-white border-studio-red font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Chemin d'image (ex: /catalog-photos/tra-studio-desktop-frontal.jpg ou URL en ligne)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Description détaillée (visible sur la page de détail)
              </label>
              <textarea
                rows={2}
                placeholder="Description complète de ce que comprend la formule..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red resize-none"
              />
            </div>

            {/* Features text */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Atouts inclus (un par ligne)
              </label>
              <textarea
                rows={3}
                placeholder="2 heures de studio exclusif&#10;Caméras cinéma 4K&#10;Micros broadcast Shure"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red resize-none font-mono"
              />
            </div>

            {/* Popular checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="popCheck"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="rounded border-zinc-700 text-studio-red focus:ring-studio-red cursor-pointer"
              />
              <label htmlFor="popCheck" className="text-xs text-zinc-300 cursor-pointer">
                Mettre en avant ce pack (Badge rouge « Populaire »)
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setEditingPkg(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-white text-black hover:bg-zinc-200 flex items-center gap-2 cursor-pointer shadow-xl transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer la prestation</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`
              bg-studio-card border rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all relative overflow-hidden shadow-xl
              ${pkg.active ? 'border-studio-border' : 'border-zinc-800/60 opacity-60 bg-zinc-950'}
            `}
          >
            {/* Background thumbnail preview */}
            {pkg.imageUrl && (
              <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none overflow-hidden rounded-bl-full">
                <img src={pkg.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            {(pkg.popular || pkg.badge) && (
              <span
                className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  pkg.popular ? 'bg-studio-red text-white shadow-md' : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}
              >
                {pkg.badge || 'Populaire'}
              </span>
            )}

            <div className="space-y-3 relative z-10">
              <div className="pr-16">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">{pkg.name}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-studio-red" />
                  <span className="font-semibold">{pkg.duration} {pkg.duration > 1 ? 'heures' : 'heure'}</span>
                </span>
              </div>

              <div className="text-left pt-1">
                <span className="text-2xl font-black text-white">
                  {pkg.price.toLocaleString('fr-FR')}
                </span>
                <span className="text-xs font-bold text-studio-red ml-1">DH</span>
              </div>

              {pkg.subtitle && (
                <p className="text-xs text-zinc-300 italic">{pkg.subtitle}</p>
              )}

              {pkg.description && (
                <p className="text-xs text-zinc-400 line-clamp-2">{pkg.description}</p>
              )}

              {/* Features list */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-800/80">
                {pkg.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <span className="text-[10px] text-zinc-500 font-semibold italic">
                    +{pkg.features.length - 4} autres atouts...
                  </span>
                )}
              </div>
            </div>

            {/* Actions: Toggle Active, Edit, Delete */}
            <div className="pt-4 mt-5 border-t border-zinc-800/80 flex items-center justify-between gap-2 relative z-10">
              <button
                type="button"
                onClick={() => toggleActive(pkg.id)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  pkg.active
                    ? 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:text-white'
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                }`}
                title={pkg.active ? 'Masquer pour les clients' : 'Rendre visible pour les clients'}
              >
                {pkg.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-semibold">{pkg.active ? 'Actif' : 'Masqué'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => startEdit(pkg)}
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700 transition-all cursor-pointer"
                  title="Modifier les détails de cette prestation"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Modifier</span>
                </button>

                <button
                  type="button"
                  onClick={() => confirmDelete(pkg)}
                  className="p-1.5 text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-900/60 rounded-xl transition-all cursor-pointer"
                  title="Supprimer définitivement ce service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
