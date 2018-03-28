
let controlLabels = [
  {label: 'Speed', unit: 'km/h', value: 20},
  {label: 'Cyclist height', unit: 'cm', value: 180},
  {label: 'Cyclist weight', unit: 'kg', value: 80},
  {label: 'Bicycle weight', unit: 'kg', value: 7},
  {label: 'Average grade', unit: '%', value: 0},
  {label: 'Position', choices: ['Tops', 'Hoods', 'Drops']},
  {label: 'Tyre type', choices: ['Clinchers', 'Tubulars', 'MTB']}
];

function addControl(control, label, unit, value) {
  control.innerHTML = `<label>${label} (${unit})</label>
    <input name="${label}" type="number" value=${value}></input>`;
}

document.addEventListener('DOMContentLoaded', function() {
  let controlsContainer = document.getElementById('controls-container');

  controlLabels.forEach(({label, unit, value, choices}) => {
    var control = document.createElement('li');

    if(choices) {
      control.innerHTML = `<label>${label}</label>
        <select name="${label}">
          ${choices.map(choice => {
            return `<option>${choice}</option>`;
          })}
        </select>`;

      controlsContainer.appendChild(control);
    } else {
      addControl(control, label, unit, value);
    }

    control.addEventListener('change', e => {
      updateOutput();
    });
    controlsContainer.appendChild(control);
  });

  updateOutput();
});

function updateOutput() {
  let controlsContainer = document.getElementById('controls-container');
  let getControlFloatValue = (controlLabel) => {
    return parseFloat(controlsContainer.querySelector(`input[name="${controlLabel}"]`).value);
  };

  let speed = getControlFloatValue('Speed');
  let position = controlsContainer.querySelector('select[name="Position"]').value;
  let tyreType = controlsContainer.querySelector('select[name="Tyre type"]').value;
  let grade = getControlFloatValue('Average grade');
  let cyclistHeight = getControlFloatValue('Cyclist height');
  let cyclistWeight = getControlFloatValue('Cyclist weight');
  let bicycleWeight = getControlFloatValue('Bicycle weight');

  let powerGivenSpeed = (velocity) => getPower(
      velocity / 3.6,
      position,
      cyclistHeight,
      bicycleWeight,
      cyclistWeight,
      tyreType,
      grade
    );

  let power = powerGivenSpeed(speed);
  plot(powerGivenSpeed);
  document.getElementById('power-result').innerText = `${power.toFixed(0)}`;
}
