import React, { useCallback } from 'react';
import { dialog } from 'electron';

export function CameraSource() {
  const onClick = useCallback(async () => {
    const inputDir = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    console.log(inputDir);
  }, []);
  return <button onClick={onClick}></button>;
}
