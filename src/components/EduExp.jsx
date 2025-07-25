import React, { useEffect, useState } from 'react';
import HeroText from './HeroText';
import GooeyTabs from './GooeyTabs';

const EduExp = () => {
  const [data, setData] = useState({ education: [], experience: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/eduexp.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load education/experience data');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center py-16">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-16">{error}</div>;

  return (
    <main className="min-h-screen bg-black text-white font-sans px-4 py-16 md:px-16 lg:px-48">
      {/* Education Section with Gooey Tabs */}
      <section className="mb-32">
        <div className="mb-16 text-center">
          <HeroText text="Education" />
        </div>
        <GooeyTabs education={data.education} />
      </section>
      {/* Experience Section */}
      <section>
        <div className="mb-16 text-center">
          <HeroText text="Experience" />
        </div>
        <div className="space-y-10">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-surface rounded-lg p-6 shadow-lg border border-border">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">{exp.title}</h3>
              <div className="text-lg md:text-xl font-medium mb-1">{exp.company}</div>
              <div className="text-sm text-secondary mb-2">{exp.period} &mdash; {exp.location}</div>
              <div className="text-base mb-1">{exp.description}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Installation and Usage Section */}
      <section className="mt-24 bg-white text-black rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Installation</h2>
        <div className="mb-4">
          <div className="font-semibold mb-2">CLI</div>
          <pre className="bg-black text-white rounded p-2 overflow-x-auto mb-2 text-sm">pnpm dlx shadcn@latest add "https://fancycomponents.dev/r/gooey-svg-filter.json"</pre>
          <div className="font-semibold mb-2">Manual</div>
          <ul className="list-disc list-inside mb-2 text-sm">
            <li>pnpm</li>
            <li>npm</li>
            <li>yarn</li>
            <li>bun</li>
          </ul>
        </div>
        <h2 className="text-3xl font-bold mb-4 mt-8">Usage</h2>
        <p className="mb-2 text-sm">Add the <code>GooeySvgFilter</code> component to your project, pass an <code>id</code> prop to the component (optional), then use the same <code>id</code> prop in the <code>filter</code> CSS property of the container you want to apply the filter to. High-level example:</p>
        <pre className="bg-black text-white rounded p-2 overflow-x-auto mb-2 text-sm">{`<GooeySvgFilter id="gooey-filter" />
<div style={{ filter: "url(#gooey-filter)" }}>
  filter will be applied here
</div>`}</pre>
        <p className="text-xs text-gray-600 mt-4">The filter applies a blur and increases the contrast of the alpha channel, then composites the layers. See <a href="https://css-tricks.com/gooey-effect/" target="_blank" rel="noopener noreferrer" className="underline">this article by Lucas Bebber</a> for more details.</p>
      </section>
    </main>
  );
};

export default EduExp; 