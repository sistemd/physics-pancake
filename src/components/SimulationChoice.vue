<template>
  <div id="options-root">
    <select v-model="engineChoice">
      <option value="massAggregate">
        Mass Aggregate Engine
      </option>
      <option value="rigidBody">
        Rigid Body Engine
      </option>
    </select>

    <select v-if="" @change="$emit('update: demoChoice')">
        <option v-for="">
        </option>
    </select>
  </div>
</template>

<script>
export default {
    data() {
        return {
            engineChoice: undefined,
        };
    },
    watch: {
        engineChoice(newChoice) {
            this.$emit('update:engineChoice')
        }
    }
};
</script>
