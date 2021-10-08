const currentPeriod = "2021-2022";
const collectionStudentNameBuilder = (currentPeriod, type) => {
  return `alumnos-${type}-${currentPeriod}`;
};

export { currentPeriod, collectionStudentNameBuilder };
