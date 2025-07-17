import Spline from '@splinetool/react-spline';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Spline scene="https://prod.spline.design/wiZ3GnYQoefGpX5N/scene.splinecode" />
      </div>
      {/* Main site content */}
      {/* ...existing site content goes here... */}
    </div>
  );
}

export default App;