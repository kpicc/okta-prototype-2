import { RateCard } from '../src';
import type { RateCardProps } from '../src';
import './RateCardDemo.css';

/* ------------------------------------------------------------------ */
/*  Inline SVG icons for section titles                                */
/* ------------------------------------------------------------------ */

function FlagIcon() {
  return (
    <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
      <rect x="0" y="0" width="5" height="20" rx="0.5" fill="#BF0A30" />
      <rect x="5" y="0" width="5" height="20" fill="#FFFFFF" />
      <rect x="10" y="0" width="5" height="20" rx="0.5" fill="#BF0A30" />
      <path d="M6.5 6L7.5 4L8.5 6L7.5 5.5z" fill="#BF0A30" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M16 2L7.5 10.5M16 2l-5 14-2.5-6.5M16 2L2 7l6.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="1" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.5L3 4.5v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9v-5L10 1.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.5 10l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Plan data                                                          */
/* ------------------------------------------------------------------ */

const plans: RateCardProps[] = [
  {
    dataAmount: '10GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+1GB Roam Beyond'],
    price: '$34',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>10GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '1GB data (one-time allotment)', tooltip: 'info' },
        ],
      },
    ],
    promos: [
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
  {
    promoFlag: 'Limited Time: Black Friday Offer!',
    dataAmount: '60GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+10GB Roam Beyond'],
    price: '$39',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>60GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '10GB data (one-time allotment)', tooltip: 'info' },
        ],
      },
    ],
    promos: [
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
  {
    promoFlag: 'Limited Time: Black Friday Offer!',
    dataAmount: '100GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+15GB Roam Beyond'],
    price: '$49',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>100GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '15GB data' },
          { text: 'Unlimited talk & text' },
        ],
      },
    ],
    legalNote: 'Minimum 3 months required',
    promos: [
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
  {
    promoFlag: 'Limited Time: Black Friday Offer!',
    dataAmount: '150GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+25GB Roam Beyond'],
    price: '$59',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>150GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '25GB data' },
          { text: 'Unlimited talk & text' },
        ],
      },
    ],
    legalNote: 'Minimum 3 months required',
    promos: [
      {
        icon: <TabletIcon />,
        text: <>Tablet & Watch plans included.</>,
        href: '#',
      },
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
  {
    promoFlag: 'Limited Time: Black Friday Offer!',
    dataAmount: '200GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+30GB Roam Beyond'],
    price: '$69',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>200GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '30GB data (one-time allotment)', tooltip: 'info' },
        ],
      },
    ],
    legalNote: 'Minimum 3 months required',
    promos: [
      {
        icon: <TabletIcon />,
        text: <>Tablet & Watch plans included.</>,
        href: '#',
      },
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
  {
    promoFlag: 'Limited Time: Black Friday Offer!',
    dataAmount: '250GB',
    networkBadge: '5G+ network access',
    stickers: ['Canada-U.S.-Mexico', '+35GB Roam Beyond'],
    price: '$79',
    priceSuffix: '/mo.¹',
    priceLegal: 'With Digital Discount¹',
    secondaryFlag: 'Save the $45 connection fee (online only)¹⁸',
    sections: [
      {
        icon: <FlagIcon />,
        title: 'Canada + U.S. + Mexico',
        tooltip: 'info',
        features: [
          { text: <>250GB data. Unlimited data at reduced speeds thereafter*</> },
          { text: <>Unlimited talk & text</> },
        ],
      },
      {
        icon: <PlaneIcon />,
        title: 'Roam Beyond in 120+ destinations',
        tooltip: 'info',
        features: [
          { text: '35GB data (one-time allotment)', tooltip: 'info' },
          { text: 'Unlimited talk & text' },
        ],
      },
    ],
    legalNote: 'Minimum 3 months required',
    promos: [
      {
        icon: <TabletIcon />,
        text: <>Tablet & Watch plans included.</>,
        href: '#',
      },
      {
        icon: <ShieldIcon />,
        text: <>This plan price is covered by our <strong>Price Freeze Promise</strong>¹⁹</>,
        href: '#',
      },
    ],
  },
];

export function RateCardDemo() {
  return (
    <div className="rate-card-demo">
      <h2 className="rate-card-demo__title">Rate Cards</h2>
      <div className="rate-card-demo__scroll">
        {plans.map((plan, i) => (
          <RateCard key={i} {...plan} />
        ))}
      </div>
    </div>
  );
}
