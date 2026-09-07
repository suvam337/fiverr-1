import { Product, Coupon } from '../types/ecommerce';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'ApexStudio Pro Noise-Cancelling Headphones',
    tagline: 'Hi-Res Wireless Audio with Spatial Acoustic Tuning',
    description: 'Engineered for developers, audio engineers, and deep-focus work. Features ultra-low latency aptX HD codecs, custom 40mm beryllium drivers, 45-hour battery life, and multi-point Bluetooth 5.3 switching.',
    price: 249,
    originalPrice: 299,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 128,
    badge: 'Best Seller',
    features: [
      'Active Hybrid ANC up to -42dB',
      '45-Hour Battery with USB-C Quick Charge',
      'Custom EQ mobile companion app',
      'Memory foam vegan leather ear cushions'
    ],
    specs: {
      'Frequency Response': '10Hz - 40,000Hz',
      'Driver Size': '40mm Custom Beryllium',
      'Weight': '255g',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm AUX'
    },
    createdAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'KeyCraft Pro 75% Wireless Mechanical Keyboard',
    tagline: 'Gasket-Mounted Hot-Swappable Developer Keyboard',
    description: 'A tactile masterpiece tuned for fast typing and programming comfort. Featuring pre-lubed mechanical switches, CNC anodized aluminum chassis, south-facing RGB, and programmable QMK/VIA firmware.',
    price: 179,
    originalPrice: 199,
    category: 'Developer Gear',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 9,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Featured',
    features: [
      'Gasket Mount Design with Sound-Dampening Silicone',
      'Hot-Swappable 5-Pin Switch Sockets',
      'Triple Connection: 2.4GHz, Bluetooth 5.1, Type-C',
      'Mac and Windows layout toggle switch'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Body Material': 'CNC 6063 Aluminum',
      'Battery': '4000mAh Rechargeable Li-ion',
      'Weight': '1.15kg'
    },
    createdAt: '2026-08-12T14:30:00Z'
  },
  {
    id: 'prod-3',
    name: 'UltraDesk Ergo Monitor Arm & Mount',
    tagline: 'Gas-Spring Precision Articulation for 17"-35" Displays',
    description: 'Reclaim your desk real estate. Aerospace-grade aluminum counterbalance mechanism with integrated cable routing channels, 360-degree rotation, and heavy-duty desk clamp supporting up to 12kg.',
    price: 119,
    originalPrice: 139,
    category: 'Workstation',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.7,
    reviewCount: 67,
    features: [
      'Universal VESA 75x75 & 100x100 Mounting Plates',
      'Dual Cable Management Concealment Channels',
      'Smooth Gas-Spring Tension Adjustment',
      'Clamp or Grommet Base Options Included'
    ],
    specs: {
      'Supported Screen Size': '17 to 35 inches',
      'Max Weight Capacity': '12 kg (26.4 lbs)',
      'Tilt Range': '+90° to -45°',
      'Extension Reach': '520 mm'
    },
    createdAt: '2026-08-14T09:15:00Z'
  },
  {
    id: 'prod-4',
    name: 'Lumio Minimalist Desk ScreenBar Halo Light',
    tagline: 'Asymmetric Optical Light Bar with Auto-Dimming Sensor',
    description: 'Zero screen glare and reduced eye fatigue during late-night coding sessions. Features wireless desktop rotary dial, 2700K-6500K color temperature slider, and ambient rear bias backlight.',
    price: 89,
    originalPrice: 109,
    category: 'Smart Home',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.9,
    reviewCount: 110,
    badge: 'Sale',
    features: [
      'Patented Asymmetric Optical Forward Beam',
      'Wireless Desktop Touch Dial Controller',
      'Real-Time Ambient Light Sensor Auto-Adjustment',
      'Backlight Halo for Contrast Eye Comfort'
    ],
    specs: {
      'Color Temperature': '2700K - 6500K Tunable',
      'Illuminance': '1000 Lux Center',
      'CRI Rating': 'Ra > 95 True Color',
      'Power Input': '5V 1.3A USB-C'
    },
    createdAt: '2026-08-15T11:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'PulseTrack Horizon Ultra Smartwatch',
    tagline: 'Titanium Grade-5 Smartwatch with Sapphire AMOLED',
    description: 'Combines rugged elegance with advanced biometrics. Always-on 1.4" retina display, dual-frequency multi-satellite GPS, 14-day battery life, and ECG heart rate monitoring.',
    price: 329,
    originalPrice: 389,
    category: 'Wearables',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    stock: 7,
    rating: 4.8,
    reviewCount: 83,
    badge: 'New',
    features: [
      'Sapphire Crystal Glass & Grade 5 Titanium Bezel',
      'Dual-Frequency Multi-GNSS Global Positioning',
      '100m Water Resistance (10 ATM)',
      'Continuous HRV, SpO2 & Sleep Stage Analysis'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466 (1000 nits)',
      'Water Rating': '10 ATM (100 meters)',
      'Battery Life': 'Up to 14 days normal use',
      'Sensors': 'Optical PPG, ECG, Barometer, Compass'
    },
    createdAt: '2026-08-18T16:20:00Z'
  },
  {
    id: 'prod-6',
    name: 'AeroStand CNC Solid Walnut & Aluminum Laptop Dock',
    tagline: 'Ergonomic Vertical & Angle Stand for MacBooks & ThinkPads',
    description: 'Precision milled solid American walnut top fused with heavy anodized space-gray aluminum. Raises your laptop screen to natural eye level while promoting 360-degree passive airflow cooling.',
    price: 69,
    originalPrice: 85,
    category: 'Workstation',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Best Seller',
    features: [
      'Authentic sustainably sourced American walnut wood',
      'Silicone non-slip protective edge pads',
      'Open airflow design reduces thermal throttling',
      'Fits all laptops from 11" to 17"'
    ],
    specs: {
      'Material': 'Solid Walnut + Space Gray Aluminum',
      'Elevation Angle': '18 degrees optimal typing angle',
      'Weight': '420g',
      'Compatibility': 'Universal'
    },
    createdAt: '2026-08-20T08:45:00Z'
  },
  {
    id: 'prod-7',
    name: 'StudioMic Podcaster USB-C Condenser Microphone',
    tagline: '24-bit / 192kHz Broadcast Audio with Built-in DSP',
    description: 'Crystal clear voice recording for meetings, podcasting, and streaming. Equipped with internal pop-filter, zero-latency headphone monitoring jack, and capacitive one-touch mute sensor.',
    price: 139,
    originalPrice: 159,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    rating: 4.8,
    reviewCount: 75,
    features: [
      'Cardioid Polar Pattern for focused room noise isolation',
      'Capacitive One-Tap Mute button with LED indicator ring',
      'Heavy cast-metal weighted desktop stand',
      'Plug-and-play compatibility with macOS, Windows, Linux'
    ],
    specs: {
      'Sample Rate': '24-bit / 192kHz',
      'Polar Pattern': 'Cardioid Unidirectional',
      'Capsule': '16mm Electret Condenser',
      'Connector': 'USB-C to USB-C/A'
    },
    createdAt: '2026-08-22T13:10:00Z'
  },
  {
    id: 'prod-8',
    name: 'OmniHub 12-in-1 Thunderbolt 4 Docking Station',
    tagline: 'Dual 4K@60Hz Displays with 96W Power Delivery',
    description: 'The ultimate single-cable docking station for modern workstations. Connect dual high-res monitors, Gigabit Ethernet, SD 4.0 card reader, and high-speed NVMe external drives with one cable.',
    price: 219,
    originalPrice: 259,
    category: 'Developer Gear',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    rating: 4.7,
    reviewCount: 52,
    badge: 'Featured',
    features: [
      'Thunderbolt 4 Certified up to 40Gbps data speed',
      '96W Dynamic Host Power Delivery Charging',
      'Dual DisplayPort 1.4 & HDMI 2.1 outputs',
      'Solid aluminum enclosure acts as heat sink'
    ],
    specs: {
      'Ports': '3x TB4, 4x USB-A 3.2, 1x HDMI, 1x DP, 2.5G Eth, SD/TF',
      'Max Video': 'Single 8K@30Hz or Dual 4K@60Hz',
      'Power Supply': '135W DC Included adapter',
      'Compatibility': 'M1/M2/M3 Mac, Windows 11'
    },
    createdAt: '2026-08-25T15:40:00Z'
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'MERN20', discountPercent: 20, description: '20% off entire order for MERN demo users' },
  { code: 'DEV10', discountPercent: 10, description: '10% developer discount' },
  { code: 'FREESHIP', discountPercent: 5, description: '5% bonus checkout discount' }
];
