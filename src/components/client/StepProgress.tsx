import React from 'react';
import { Step } from '../../types';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: Step;
  onStepClick?: (step: Step) => void;
}

const STEPS = [
  { step: 1, label: 'Prestations', shortLabel: 'Formule' },
  { step: 2, label: 'Coordonnées', shortLabel: 'Infos' },
  { step: 3, label: 'Date & Heure', shortLabel: 'Créneau' },
  { step: 4, label: 'Confirmation', shortLabel: 'Recap' },
] as const;

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep, onStepClick }) => {
  // If at step 5 (Client Portal / Success), show all completed
  const activeNumber = currentStep === 5 ? 4 : currentStep;

  return (
    <nav aria-label="Progression de réservation" className="w-full py-3 sm:py-4 border-b border-studio-border/40 mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-1 sm:gap-3 max-w-2xl mx-auto px-1">
        {STEPS.map((s, idx) => {
          const isCompleted = activeNumber > s.step;
          const isCurrent = activeNumber === s.step;
          const isClickable = onStepClick && isCompleted;

          return (
            <React.Fragment key={s.step}>
              {/* Step item */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(s.step as Step)}
                className={`flex items-center gap-1.5 py-1 px-1 rounded-lg text-xs transition-colors duration-200 ${
                  isCurrent
                    ? 'text-white font-semibold'
                    : isCompleted
                    ? 'text-zinc-300 hover:text-white cursor-pointer'
                    : 'text-zinc-600 cursor-default'
                }`}
              >
                {/* Number indicator */}
                <span
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-studio-red text-white shadow-sm shadow-studio-red/40 ring-2 ring-studio-red/30'
                      : isCompleted
                      ? 'bg-zinc-800 text-zinc-300'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                </span>

                {/* Label (short on very small screens, full on sm+) */}
                <span className="tracking-wide text-[11px] sm:text-xs hidden min-[360px]:inline">
                  <span className="sm:hidden">{s.shortLabel}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </button>

              {/* Separator arrow */}
              {idx < STEPS.length - 1 && (
                <span
                  className={`text-[10px] select-none shrink-0 transition-colors ${
                    isCompleted ? 'text-zinc-500' : 'text-zinc-800'
                  }`}
                >
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
