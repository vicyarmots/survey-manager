import React from 'react';
import Chart from 'react-apexcharts';

const data = {
  options: {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: ['кайф', 1992, 1993, 1994]
    }
  },
  series: [
    {
      name: 'series-1',
      data: [-50, 40, 45, 50]
    }
  ]
};

export const HomePage = () => {
  return (
    <section className="hero-body">
      <h1 className="title">It's home baby</h1>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="500"
      />
    </section>
  );
};
