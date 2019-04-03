import React from 'react';

import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

export const HomePage = () => {
  return (
    <section className="hero-body">
      <BarChart
        data={[['X-Small', 5], ['Small', 27], ['Smalldasdas', 90]]}
        min={0}
        max={100}
        width="400px"
        height="120px"
        colors={[['#999999', '#ffff66', '#ff5050', '#00cc66', '#66ccff']]}
        suffix="%"
      />
      <h1 className="title">It's home baby</h1>
    </section>
  );
};
