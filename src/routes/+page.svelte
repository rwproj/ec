<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Reactive state
  let W1 = "";
  let loadedWeight = "";
  let realWeight = "";
  let R1 = "";
  let W2 = "";
  let R2 = "";
  let percentage = "";
  let pRM = "";

  // Calculation Functions
  const calculateW2 = (W1, R1, R2) => {
    return W1 * ((1 + R1 / 30) / (1 + R2 / 30));
  };

  const calculateR2 = (W1, R1, W2) => {
    return 30 * ((W1 / W2) * (1 + R1 / 30) - 1);
  };

  const calculate1RM = (W, R) => {
    return W * (1 + R / 30);
  };

  const calculateW2ForPercentage = (oneRM, percentage) => {
    return oneRM * (percentage / 100);
  };

  const calculatePercentageOf1RM = (W1, R1) => {
    const oneRM = calculate1RM(W1, R1);
    return (W1 / oneRM) * 100;
  };

  // Derived reactive variables
  $: percentageOf1RM = !isNaN(parseFloat(W1)) && !isNaN(parseFloat(R1))
    ? ` ${(calculatePercentageOf1RM(parseFloat(W1), parseFloat(R1))).toFixed(2)}% 1RM`
    : "";

  $: calculatedW2 = !isNaN(parseFloat(W1)) && !isNaN(parseFloat(R1)) && !isNaN(parseFloat(R2))
    ? `W2: ${(calculateW2(parseFloat(W1), parseFloat(R1), parseFloat(R2))).toFixed(2)} kg`
    : "";

  $: calculatedR2 = !isNaN(parseFloat(W1)) && !isNaN(parseFloat(R1)) && !isNaN(parseFloat(W2))
    ? `R2: ${(calculateR2(parseFloat(W1), parseFloat(R1), parseFloat(W2))).toFixed(2)} reps`
    : "";

  $: plateToRealWeight = !isNaN(parseFloat(loadedWeight))
    ? (parseFloat(loadedWeight) / 2.23 + 7.75).toFixed(2)
    : "";

  $: realToPlateWeight = !isNaN(parseFloat(realWeight))
    ? (parseFloat(realWeight) * 2.23 - 7.75).toFixed(2)
    : "";

    $: rmW = !isNaN(parseFloat(W1)) && !isNaN(parseFloat(R1)) && !isNaN(parseFloat(pRM))
    ? `: ${calculateW2ForPercentage(calculate1RM(W1, R1), pRM).toFixed(2)} kg`
    : "";

</script>

<style>
  @import './App.css';
</style>

<div class="app-container">
  <h1>Exercise Calculator</h1>

  <div class="inputGroup">
    <label>W1 (kg):</label>
    <input type="text" bind:value={W1} />
    <label>R1:</label>
    <input type="text" bind:value={R1} />
    <div class="result">{percentageOf1RM}</div>
  </div>

  <div class="inputGroup">
    <label>Desired R2:</label>
    <input type="text" bind:value={R2} />
    <div class="result">{calculatedW2}</div>
  </div>

  <div class="inputGroup">
    <label>Desired W2 (kg):</label>
    <input type="text" bind:value={W2} />
    <div class="result">{calculatedR2}</div>
  </div>

  <div class="inputGroup">
    <label>Desired % of 1RM:</label>
    <input
      type="text"
      bind:value={pRM}
    />
    <div class="result">{rmW}</div>
  </div>

  <div class="inputGroup">
    <label>Loaded Weight (kg):</label>
    <input
      type="text"
      bind:value={loadedWeight}
      on:input={() => realWeight = plateToRealWeight}
    />
    <label>Real Weight (kg):</label>
    <input
      type="text"
      bind:value={realWeight}
      on:input={() => loadedWeight = realToPlateWeight}
    />
  </div>
</div>