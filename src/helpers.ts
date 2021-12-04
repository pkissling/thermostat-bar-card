import { PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { ThermostatBarCardConfig } from './types';


// Check if config or entity changed changed
export function hasConfigOrEntitiesChanged(hass: HomeAssistant, config: ThermostatBarCardConfig, changedProps: PropertyValues): boolean {
    if (!config) {
        // if no config present, nothing to re-render
        return false
    }

    if (changedProps.has('config')) {
        // always re-render on config changes
        return true;
    }

    if (!config.entities) {
        // if no entities defined, nothing to re-render
        return false;
    }

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) {
        // hass did not change, nothing to re-render
        return false
    }

    // check if one of the provided entity_ids has outdated attributes
    return config.entities
        .flatMap(entity => Object.values(entity))
        .map(entityId => hass.states[entityId])
        .filter(e => e !== undefined)
        .some(e => e !== oldHass.states[e.entity_id])
}
