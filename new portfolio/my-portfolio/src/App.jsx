// App.jsx
// Main entry point for the portfolio React application
// Renders the interactive 3D computer model

import React from 'react';
import ComputerModel from './ComputerModel';

/**
 * App Component
 * Renders the interactive 3D computer model as the landing page background/content.
 */
export default function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {/* Interactive 3D Computer Model */}
      <ComputerModel />
    </main>
  );
}