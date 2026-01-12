import { useState, useEffect } from 'react';
import { Ruler, Scale, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UnitType = 'metric' | 'imperial';

const UnitConverter = () => {
  const [heightValue, setHeightValue] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<UnitType>('metric');
  const [weightValue, setWeightValue] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<UnitType>('metric');

  const [convertedHeight, setConvertedHeight] = useState<string>('');
  const [convertedWeight, setConvertedWeight] = useState<string>('');

  // Conversion constants
  const CM_TO_INCH = 0.393701;
  const INCH_TO_CM = 2.54;
  const KG_TO_LB = 2.20462;
  const LB_TO_KG = 0.453592;

  useEffect(() => {
    if (heightValue) {
      const numValue = parseFloat(heightValue);
      if (!isNaN(numValue)) {
        if (heightUnit === 'metric') {
          // cm to inches
          setConvertedHeight((numValue * CM_TO_INCH).toFixed(2));
        } else {
          // inches to cm
          setConvertedHeight((numValue * INCH_TO_CM).toFixed(2));
        }
      }
    } else {
      setConvertedHeight('');
    }
  }, [heightValue, heightUnit]);

  useEffect(() => {
    if (weightValue) {
      const numValue = parseFloat(weightValue);
      if (!isNaN(numValue)) {
        if (weightUnit === 'metric') {
          // kg to lbs
          setConvertedWeight((numValue * KG_TO_LB).toFixed(2));
        } else {
          // lbs to kg
          setConvertedWeight((numValue * LB_TO_KG).toFixed(2));
        }
      }
    } else {
      setConvertedWeight('');
    }
  }, [weightValue, weightUnit]);

  const handleReset = () => {
    setHeightValue('');
    setWeightValue('');
    setConvertedHeight('');
    setConvertedWeight('');
  };

  return (
    <section id="unit-converter" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Unit Converter</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Convert <span className="text-gradient">Height & Weight</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Easily convert between metric and imperial units for your fitness tracking
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 animate-scale-in">
            <div className="space-y-8">
              {/* Height Converter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Height Conversion</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Input */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {heightUnit === 'metric' ? 'Centimeters (cm)' : 'Inches (in)'}
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        value={heightValue}
                        onChange={(e) => setHeightValue(e.target.value)}
                        placeholder={`Enter height in ${heightUnit === 'metric' ? 'cm' : 'inches'}`}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Unit Toggle */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => setHeightUnit(heightUnit === 'metric' ? 'imperial' : 'metric')}
                      className="w-full"
                    >
                      <ArrowRightLeft className="w-4 h-4 mr-2" />
                      Switch to {heightUnit === 'metric' ? 'Imperial' : 'Metric'}
                    </Button>
                  </div>
                </div>

                {/* Converted Value */}
                {convertedHeight && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">Converted Height</div>
                    <div className="text-2xl font-bold text-primary">
                      {convertedHeight} {heightUnit === 'metric' ? 'inches' : 'cm'}
                    </div>
                  </div>
                )}
              </div>

              {/* Weight Converter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Weight Conversion</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Input */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {weightUnit === 'metric' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                        placeholder={`Enter weight in ${weightUnit === 'metric' ? 'kg' : 'lbs'}`}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Unit Toggle */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => setWeightUnit(weightUnit === 'metric' ? 'imperial' : 'metric')}
                      className="w-full"
                    >
                      <ArrowRightLeft className="w-4 h-4 mr-2" />
                      Switch to {weightUnit === 'metric' ? 'Imperial' : 'Metric'}
                    </Button>
                  </div>
                </div>

                {/* Converted Value */}
                {convertedWeight && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">Converted Weight</div>
                    <div className="text-2xl font-bold text-primary">
                      {convertedWeight} {weightUnit === 'metric' ? 'lbs' : 'kg'}
                    </div>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <div className="pt-4">
                <Button variant="outline" onClick={handleReset} className="w-full">
                  Reset All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitConverter;