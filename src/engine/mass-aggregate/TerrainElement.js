import MassAggregateEngine from './MassAggregateEngine';

export default class TerrainElement {
    constructor({ polygon, restitution, timestep = MassAggregateEngine.defaultTimestep }) {
        this.polygon = polygon;
        this.restitution = undefined;

        this.setRestitution(restitution, timestep);
    }

    setRestitution(restitution, timestep = MassAggregateEngine.defaultTimestep) {
        this.restitution = Math.pow(restitution, timestep);
    }

    // Used mostly in the UI so that the user can see restitution independent of timestep
    humanReadableRestitution(timestep = MassAggregateEngine.defaultTimestep) {
        return Math.pow(this.restitution, 1/timestep);
    }
}
