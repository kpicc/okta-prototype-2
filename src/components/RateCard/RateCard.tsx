import type { HTMLAttributes, ReactNode } from 'react';
import { Badge } from '../Badge/index.js';
import { Button } from '../Button/index.js';
import './RateCard.css';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RateCardFeature {
  text: ReactNode;
  tooltip?: string;
}

export interface RateCardSection {
  icon?: ReactNode;
  title: string;
  tooltip?: string;
  features: RateCardFeature[];
}

export interface RateCardPromo {
  icon?: ReactNode;
  text: ReactNode;
  href?: string;
}

export interface RateCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary promo flag text, e.g. "Limited Time: Black Friday Offer!" */
  promoFlag?: string;
  /** Secondary flag text, e.g. "Save the $45 connection fee (online only)" */
  secondaryFlag?: string;
  /** Sticker-style badges shown above the data bucket */
  stickers?: string[];
  /** Data amount label, e.g. "10GB" */
  dataAmount: string;
  /** Network badge label, e.g. "5G+ network access" */
  networkBadge?: string;
  /** Price value, e.g. "$34" */
  price: string;
  /** Price suffix, e.g. "/mo." */
  priceSuffix?: string;
  /** Small legal text below the price, e.g. "With Digital Discount" */
  priceLegal?: string;
  /** Feature sections (Canada+US+Mexico, Roam Beyond, etc.) */
  sections: RateCardSection[];
  /** Legal footnote below sections, e.g. "Minimum 3 months required" */
  legalNote?: string;
  /** Promo badges (Tablet & Watch, Price Freeze Promise, etc.) */
  promos?: RateCardPromo[];
  /** CTA button text */
  ctaLabel?: string;
  /** CTA click handler */
  onCtaClick?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Tooltip icon                                                       */
/* ------------------------------------------------------------------ */

function TooltipIcon({ className = '' }: { className?: string }) {
  return (
    <span className={`ds-rate-card__tooltip ${className}`} aria-label="More info">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
        <text x="6" y="9" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="600">?</text>
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkmark icon                                                     */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg className="ds-rate-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.81 10.01l2.19 2.07 4.19-5.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Chevron icon (for promo links)                                     */
/* ------------------------------------------------------------------ */

function ChevronIcon() {
  return (
    <svg className="ds-rate-card__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RateCard({
  promoFlag,
  secondaryFlag,
  stickers,
  dataAmount,
  networkBadge,
  price,
  priceSuffix = '/mo.',
  priceLegal,
  sections,
  legalNote,
  promos,
  ctaLabel = 'Choose this plan',
  onCtaClick,
  className = '',
  ...rest
}: RateCardProps) {
  const classes = ['ds-rate-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {/* Primary flag */}
      {promoFlag && (
        <div className="ds-rate-card__primary-flag">
          <span className="ds-rate-card__flag-icon" aria-hidden="true">🏷️</span>
          <span className="ds-rate-card__flag-text">{promoFlag}</span>
        </div>
      )}

      {/* Header */}
      <div className="ds-rate-card__header">
        {stickers && stickers.length > 0 && (
          <div className="ds-rate-card__stickers">
            {stickers.map((s) => (
              <Badge key={s} variant="filled">{s}</Badge>
            ))}
          </div>
        )}

        <div className="ds-rate-card__data-bucket">
          <span className="ds-rate-card__data-amount">{dataAmount}</span>
          {networkBadge && (
            <Badge variant="outline">{networkBadge}</Badge>
          )}
        </div>

        <div className="ds-rate-card__price-bucket">
          <div className="ds-rate-card__price-row">
            <span className="ds-rate-card__price">{price}</span>
            <span className="ds-rate-card__price-suffix">{priceSuffix}</span>
          </div>
          {priceLegal && (
            <div className="ds-rate-card__price-legal">
              {priceLegal}
              <TooltipIcon />
            </div>
          )}
        </div>
      </div>

      {/* Secondary flag */}
      {secondaryFlag && (
        <div className="ds-rate-card__secondary-flag">
          {secondaryFlag}
        </div>
      )}

      {/* Feature sections */}
      <div className="ds-rate-card__sections">
        {sections.map((section) => (
          <div key={section.title} className="ds-rate-card__section">
            <div className="ds-rate-card__section-title">
              {section.icon && <span className="ds-rate-card__section-icon">{section.icon}</span>}
              <span>{section.title}</span>
              {section.tooltip && <TooltipIcon />}
            </div>
            <ul className="ds-rate-card__feature-list">
              {section.features.map((f, i) => (
                <li key={i} className="ds-rate-card__feature">
                  <CheckIcon />
                  <span>
                    {f.text}
                    {f.tooltip && <TooltipIcon className="ds-rate-card__feature-tooltip" />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal note */}
      {legalNote && (
        <div className="ds-rate-card__legal-note">{legalNote}</div>
      )}

      {/* Promo badges */}
      {promos && promos.length > 0 && (
        <div className="ds-rate-card__promos">
          {promos.map((promo, i) => (
            <div key={i} className="ds-rate-card__promo">
              {promo.icon && <span className="ds-rate-card__promo-icon">{promo.icon}</span>}
              <span className="ds-rate-card__promo-text">{promo.text}</span>
              {promo.href && <ChevronIcon />}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="ds-rate-card__cta">
        <Button size="large" className="ds-rate-card__cta-button" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
