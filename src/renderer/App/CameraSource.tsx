import React, { useCallback } from 'react';

export function CameraSource() {
  const onClick = useCallback(async () => {
    const { canceled, filePaths } = await fpd.methods.showOpenDialog({
      properties: ['openDirectory'],
    });
    console.log(canceled, filePaths);
  }, []);
  return <button onClick={onClick}>Open directory</button>;
}
