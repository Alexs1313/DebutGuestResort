import {useCallback, useState} from 'react';

export function useBrightnessToggle() {
  const [isMaxBrightness, setIsMaxBrightness] = useState(false);

  const toggleBrightness = useCallback(() => {
    setIsMaxBrightness(current => !current);
  }, []);

  return {
    isMaxBrightness,
    toggleBrightness,
  };
}
