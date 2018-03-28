const airDensity = 1.225; // in kg/m3

const Cds = {
  'Tops': 1.15,
  'Hoods': 1.0,
  'Drops': 0.88,
  'Aero Bars': 0.70
};

const driveTrainEfficiency = 0.975;

const tyreRollingResistance = {
  'Clinchers': 0.005,
  'Tubulars': 0.004,
  'MTB': 0.012
};

function getEstimatedArea(heightInCm, cylistWeightInKg) {
  //Approximation of cyclist surface
  return 0.0276 * ((heightInCm / 100) ** 0.725) * (cylistWeightInKg ** 0.425) + 0.1647;
}

function getCdA(position, heightInCm, weightInKg) {
  return Cds[position] * getEstimatedArea(heightInCm, weightInKg);
}

function getPower(velocity, position, heightInCm, bicycleWeightInKg, cyclistWeightInKg, tyreType, grade) {
  let drag = (1 / 2) * getCdA(position, heightInCm, cyclistWeightInKg) * airDensity * velocity ** 2;
  let totalWeight = bicycleWeightInKg + cyclistWeightInKg;
  let rollingResistanceForce = 9.81 * totalWeight * tyreRollingResistance[tyreType];
  let gravityForce = 9.81 * totalWeight * Math.sin(Math.atan(grade * 0.01));

  let F = gravityForce + rollingResistanceForce + drag;

  let power = velocity * F / driveTrainEfficiency;

  return power;
}
