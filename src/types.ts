import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntityBase } from 'home-assistant-js-websocket/dist/types';

declare global {
  interface HTMLElementTagNameMap {
    'thermostat-bar-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface ThermostatBarCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  entities?: TemperatureRow[];
  min_temperature?: number;
  max_temperature?: number;
}

export declare type TemperatureRow = {
  entity_id: string;
  icon: string;
  window_sensor: string;
}

export declare type Climate = HassEntityBase & {
  state: 'auto' | 'heat' | 'off';
  attributes: {
    temperature: number;
    current_temperature: number;
    hvac_action: 'heating' | 'idle';
    unit_of_measurement?: string;
  };
}