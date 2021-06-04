export const makeOptions = (max) => {
  return {
    scales: {
      yAxis: {
        beginAtZero: true,
        max,
      },
    },
  };
};
