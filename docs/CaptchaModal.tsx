import { useMemo, useState } from 'react';
import './CaptchaModal.css';

interface CaptchaModalProps {
  onClose: () => void;
  onVerified: () => void;
}

interface CaptchaChallenge {
  id: string;
  prompt: string;
  image: string;
}

/**
 * Pool of 5 image challenges. One is picked randomly per session.
 * Add/remove items here to grow or shrink the challenge library.
 */
const CHALLENGE_POOL: readonly CaptchaChallenge[] = [
  { id: 'crosswalks', prompt: 'crosswalks', image: '/okta/captcha-crosswalk.jpg' },
  { id: 'traffic-lights', prompt: 'traffic lights', image: '/okta/captcha-trafficlight.jpg' },
  { id: 'buses', prompt: 'buses', image: '/okta/captcha-bus.jpg' },
  { id: 'bicycles', prompt: 'bicycles', image: '/okta/captcha-bicycle.jpg' },
  { id: 'fire-hydrants', prompt: 'fire hydrants', image: '/okta/captcha-hydrant.jpg' },
];

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

function pickRandomChallenge(): CaptchaChallenge {
  return CHALLENGE_POOL[Math.floor(Math.random() * CHALLENGE_POOL.length)];
}

export function CaptchaModal({ onClose, onVerified }: CaptchaModalProps) {
  const [challenge, setChallenge] = useState<CaptchaChallenge>(() => pickRandomChallenge());
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleTile(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function reload() {
    setChallenge(pickRandomChallenge());
    setSelected(new Set());
  }

  const hasSelection = selected.size > 0;
  const tiles = useMemo(() => Array.from({ length: TILE_COUNT }, (_, i) => i), []);

  return (
    <div className="okta-captcha__overlay" role="dialog" aria-modal="true" aria-label="Security verification" onClick={onClose}>
      <div className="okta-captcha__box" onClick={(e) => e.stopPropagation()}>
        <div className="okta-captcha__header">
          <p className="okta-captcha__prompt">Select all squares with</p>
          <p className="okta-captcha__prompt okta-captcha__prompt--strong">{challenge.prompt}</p>
        </div>

        <div className="okta-captcha__grid">
          {tiles.map((index) => {
            const col = index % GRID_SIZE;
            const row = Math.floor(index / GRID_SIZE);
            const isSelected = selected.has(index);
            return (
              <button
                key={`${challenge.id}-${index}`}
                type="button"
                className={`okta-captcha__tile${isSelected ? ' okta-captcha__tile--selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={`Tile ${index + 1}`}
                onClick={() => toggleTile(index)}
                style={{
                  backgroundImage: `url(${challenge.image})`,
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
            <button type="button" className="okta-captcha__icon-btn" aria-label="Get a new challenge" onClick={reload}>
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
