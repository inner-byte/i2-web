import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { X, ArrowRight } from 'lucide-react';

interface Step {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

interface GuidedTourProps {
  steps: Step[];
  isOpen: boolean;
  onClose: () => void;
}

export function GuidedTour({ steps, isOpen, onClose }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen) {
      positionTooltip();
    }
  }, [currentStep, isOpen]);

  const positionTooltip = () => {
    const step = steps[currentStep];
    const element = document.querySelector(step.target);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      const positions = {
        top: { top: rect.top - 120, left: rect.left },
        right: { top: rect.top, left: rect.right + 20 },
        bottom: { top: rect.bottom + 20, left: rect.left },
        left: { top: rect.top, left: rect.left - 320 },
      };
      
      setTooltipPosition(positions[step.position]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/50 pointer-events-auto" />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          className="w-80 bg-gray-900 rounded-lg border border-gray-800 shadow-xl pointer-events-auto"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">
                {steps[currentStep].title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-400 mb-4">{steps[currentStep].content}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                {currentStep === steps.length - 1 ? (
                  'Finish'
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Helper hook for tooltips
export function useTooltip(content: string) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 10,
      left: rect.left + (rect.width / 2) - 100,
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const Tooltip = () => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="fixed z-50 w-48 p-2 text-sm text-center text-white bg-gray-900 rounded-md border border-gray-800 shadow-lg"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return {
    tooltipProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    Tooltip,
  };
}