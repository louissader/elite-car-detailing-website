import React, { useState, useEffect } from 'react';

const PricingCalculator = ({ onPriceChange, onServiceSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('auto');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [vehicleSize, setVehicleSize] = useState('medium');

  // Service packages with base pricing
  const packages = {
    auto: [
      { id: 'auto-basic', name: 'Essential Detail', basePrice: 199, description: 'Basic wash & interior' },
      { id: 'auto-premium', name: 'Executive Detail', basePrice: 399, description: 'Polish, wax, deep clean', popular: true },
      { id: 'auto-luxury', name: 'Concierge Detail', basePrice: 799, description: 'Paint correction, ceramic coating' }
    ],
    jet: [
      { id: 'jet-light', name: 'Light Aircraft Detail', basePrice: 1499, description: 'Small planes & turboprops' },
      { id: 'jet-executive', name: 'Executive Jet Detail', basePrice: 3999, description: 'Mid-size private jets', popular: true },
      { id: 'jet-fleet', name: 'Fleet & Large Aircraft', basePrice: 8999, description: 'Large jets & commercial' }
    ]
  };

  // Add-on services
  const addons = [
    { id: 'ceramic', name: 'Ceramic Coating', price: 599 },
    { id: 'ppf', name: 'Paint Protection Film', price: 1299 },
    { id: 'interior-protection', name: 'Interior Protection', price: 299 },
    { id: 'engine', name: 'Engine Detailing', price: 199 },
    { id: 'headlight', name: 'Headlight Restoration', price: 149 },
    { id: 'pet-hair', name: 'Pet Hair Removal', price: 99 }
  ];

  // Vehicle size multipliers
  const sizeMultipliers = {
    small: 0.9,
    medium: 1.0,
    large: 1.2,
    xlarge: 1.5
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedPackage) return 0;

    const pkg = packages[selectedCategory].find(p => p.id === selectedPackage);
    const basePrice = pkg ? pkg.basePrice : 0;

    const sizeAdjustedPrice = basePrice * sizeMultipliers[vehicleSize];

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);

    return Math.round(sizeAdjustedPrice + addonsTotal);
  };

  // Toggle addon selection
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Update parent component when price changes
  useEffect(() => {
    const total = calculateTotal();
    if (onPriceChange) {
      onPriceChange(total);
    }
    if (onServiceSelect && selectedPackage) {
      const pkg = packages[selectedCategory].find(p => p.id === selectedPackage);
      onServiceSelect({
        category: selectedCategory,
        package: pkg,
        addons: selectedAddons.map(id => addons.find(a => a.id === id)),
        vehicleSize,
        total
      });
    }
  }, [selectedCategory, selectedPackage, selectedAddons, vehicleSize]);

  const total = calculateTotal();

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <div>
        <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
          Service Category
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSelectedCategory('auto');
              setSelectedPackage(null);
            }}
            className={`p-4 border-2 rounded-sm transition-all duration-300 ${
              selectedCategory === 'auto'
                ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                : 'border-luxury-gold/20 text-luxury-white hover:border-luxury-gold'
            }`}
          >
            <div className="text-2xl mb-2" role="img" aria-label="Car">🚗</div>
            <div className="font-semibold">Luxury Auto</div>
          </button>
          <button
            onClick={() => {
              setSelectedCategory('jet');
              setSelectedPackage(null);
            }}
            className={`p-4 border-2 rounded-sm transition-all duration-300 ${
              selectedCategory === 'jet'
                ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                : 'border-luxury-gold/20 text-luxury-white hover:border-luxury-gold'
            }`}
          >
            <div className="text-2xl mb-2" role="img" aria-label="Airplane">✈️</div>
            <div className="font-semibold">Private Jet</div>
          </button>
        </div>
      </div>

      {/* Package Selection */}
      <div>
        <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
          Select Package
        </label>
        <div className="space-y-3">
          {packages[selectedCategory].map(pkg => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`w-full p-4 border-2 rounded-sm text-left transition-all duration-300 relative ${
                selectedPackage === pkg.id
                  ? 'border-luxury-gold bg-luxury-gold/10'
                  : 'border-luxury-gold/20 hover:border-luxury-gold'
              }`}
            >
              {pkg.popular && (
                <span className="absolute top-2 right-2 bg-luxury-gold text-luxury-black px-2 py-1 text-xs font-bold uppercase">
                  Popular
                </span>
              )}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-luxury-white font-semibold text-lg">{pkg.name}</div>
                  <div className="text-luxury-white/60 text-sm">{pkg.description}</div>
                </div>
                <div className="text-luxury-gold font-bold text-xl">
                  ${pkg.basePrice}+
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Size Selection */}
      {selectedPackage && (
        <div>
          <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
            {selectedCategory === 'auto' ? 'Vehicle Size' : 'Aircraft Size'}
          </label>
          <select
            value={vehicleSize}
            onChange={(e) => setVehicleSize(e.target.value)}
            className="w-full bg-luxury-dark-gray border-2 border-luxury-gold/20 text-luxury-white p-3 rounded-sm focus:border-luxury-gold focus:outline-none"
          >
            <option value="small">Small (Sedan, Coupe) - 10% discount</option>
            <option value="medium">Medium (SUV, Luxury Sedan) - Standard</option>
            <option value="large">Large (Full-size SUV, Exotic) - 20% premium</option>
            <option value="xlarge">Extra Large (Fleet, Commercial) - 50% premium</option>
          </select>
        </div>
      )}

      {/* Add-ons Selection */}
      {selectedPackage && (
        <div>
          <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
            Add-On Services (Optional)
          </label>
          <div className="space-y-2">
            {addons.map(addon => (
              <label
                key={addon.id}
                className="flex items-center justify-between p-3 border border-luxury-gold/20 rounded-sm hover:border-luxury-gold cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="w-5 h-5 rounded border-luxury-gold/20 text-luxury-gold focus:ring-luxury-gold focus:ring-2 cursor-pointer"
                  />
                  <span className="ml-3 text-luxury-white">{addon.name}</span>
                </div>
                <span className="text-luxury-gold font-semibold">+${addon.price}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Summary */}
      {selectedPackage && (
        <div className="bg-luxury-dark-gray border-2 border-luxury-gold p-6 rounded-sm">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-luxury-white/70">
              <span>Base Package</span>
              <span>${packages[selectedCategory].find(p => p.id === selectedPackage)?.basePrice}</span>
            </div>
            <div className="flex justify-between text-luxury-white/70">
              <span>Size Adjustment ({vehicleSize})</span>
              <span>×{sizeMultipliers[vehicleSize]}</span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between text-luxury-white/70">
                <span>Add-ons ({selectedAddons.length})</span>
                <span>
                  +${selectedAddons.reduce((sum, id) => {
                    const addon = addons.find(a => a.id === id);
                    return sum + (addon ? addon.price : 0);
                  }, 0)}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-luxury-gold/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-luxury-white text-lg font-semibold">Estimated Total</span>
              <span className="text-luxury-gold text-3xl font-bold">${total.toLocaleString()}</span>
            </div>
            <p className="text-luxury-white/50 text-xs mt-2">
              * Final price may vary based on vehicle condition
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
