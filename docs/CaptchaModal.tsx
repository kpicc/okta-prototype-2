import { useState } from 'react';
import './CaptchaModal.css';

interface CaptchaModalProps {
  onClose: () => void;
  onVerified: () => void;
}

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export function CaptchaModal({ onClose, onVerified }: CaptchaModalProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleTile(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const hasSelection = selected.size > 0;

  return (
    <div className="okta-captcha__overlay" role="dialog" aria-modal="true" aria-label="Security verification" onClick={onClose}>
      <div className="okta-captcha__box" onClick={(e) => e.stopPropagation()}>
        <div className="okta-captcha__header">
          <p className="okta-captcha__prompt">Select all squares with</p>
          <p className="okta-captcha__prompt okta-captcha__prompt--strong">crosswalks</p>
        </div>

        <div className="okta-captcha__grid">
          {Array.from({ length: TILE_COUNT }, (_, index) => {
            const col = index % GRID_SIZE;
            const row = Math.floor(index / GRID_SIZE);
            const isSelected = selected.has(index);
            return (
              <button
                key={index}
                type="button"
                className={`okta-captcha__tile${isSelected ? ' okta-captcha__tile--selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={`Tile ${index + 1}`}
                onClick={() => toggleTile(index)}
                style={{
                  backgroundPosition: `${(col * 100) / (GRID_SIZE - 1)}% ${(row * 100) / (GRID_SIZE - 1)}%`,
                }}
              >
                {isSelected && (
                  <svg className="okta-captcha__tile-check" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="#FFFFFF" opacity="0.9" />
                    <path d="M7 12l3 3 7-7" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <div className="okta-captcha__footer">
          <div className="okta-captcha__footer-icons">
            <button type="button" className="okta-captcha__icon-btn" aria-label="Reload" onClick={() => setSelected(new Set())}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3.5M20 14a8 8 0 01-14 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="okta-captcha__icon-btn" aria-label="Audio challenge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3a9 9 0 00-9 9v5a2 2 0 002 2h2v-7H5v-0.001A7 7 0 0119 12v0.999h-2V19h2a2 2 0 002-2v-5a9 9 0 00-9-9z" fill="currentColor" />
              </svg>
            </button>
            <button type="button" className="okta-captcha__icon-btn" aria-label="More information">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v.01M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button type="button" className="okta-captcha__submit" onClick={onVerified}>
            {hasSelection ? 'VERIFY' : 'SKIP'}
          </button>
        </div>
      </div>
    </div>
  );
}
