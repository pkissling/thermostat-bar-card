/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues,
  internalProperty,
} from 'lit-element';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types

import './editor';
import { styles } from './styles';
import type { Climate, TemperatureRow, ThermostatBarCardConfig } from './types';
import { CARD_VERSION, DEFAULT_MIN_TEMPERATURE, DEFAULT_MAX_TEMPERATURE } from './constants';
import { localize } from './localize/localize';
import { actionHandler } from './action-handler-directive';

/* eslint no-console: 0 */
console.info(
  `%c  THERMOSTAT-BAR-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'thermostat-bar-card',
  name: 'Thermostat Bar Card',
  description: 'A custom Lovelace card to monitor and control your thermostats',
});

@customElement('thermostat-bar-card')
export class ThermostatBarCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('thermostat-bar-card-editor');
  }

  public static getStubConfig(): object {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit-element.polymer-project.org/guide/properties
  @property({ attribute: false }) public hass!: HomeAssistant;
  @internalProperty() private config!: ThermostatBarCardConfig;

  // https://lit-element.polymer-project.org/guide/properties#accessors-custom
  public setConfig(config: ThermostatBarCardConfig): void {
    if (!config) {
      throw new Error(localize('validation.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    if (!config.entities) {
      throw new Error(localize('validation.no_entities'))
    }

    this.config = config;
  }

  // https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return true
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit-element.polymer-project.org/guide/templates
  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    return html`
      <ha-card
        .header=${this.config.title}
        tabindex="0"
        .label=${`Thermostat Bar Card: ${this.config.entities || 'No Entity Defined'}`}
      >
        <div
            id="states"
            class="card-content"
        >
          ${this._createBars()}
        </div>
      </ha-card>
    `;
  }

  private _createBars(): TemplateResult[] {
    if (!this.config.entities) {
      return []
    }

    return this.config.entities
      .map(entity => this._createBar(entity))
  }

  private _createBar(row: TemperatureRow): TemplateResult {
    const entity = this.hass.states[row.entity_id] as Climate
    const icon = row.icon

    const unitOfMeasurement = entity.attributes.unit_of_measurement || '°C'
    const targetTemperature = entity.attributes.temperature
    const currentTemperature = entity.attributes.current_temperature

    const isOn = entity.state !== 'off'
    const isHeating = entity.attributes.hvac_action === 'heating';
    const barPercent = this.calculatePercentage(currentTemperature)
    const targetPercent = this.calculatePercentage(targetTemperature)
    const barColor = entity.state === 'off' ? 'var(--light-primary-color)' : 'var(--primary-color)'
    const isManualMode = entity.state === 'heat'
    const isWindowOpen = this.isWindowOpen(row.window_sensor)

    const targetBarStart = (currentTemperature < targetTemperature) ? barPercent : targetPercent
    const targetBarEnd = (currentTemperature < targetTemperature) ? targetPercent : barPercent

    const temperatureText = this.temperatureText(currentTemperature, targetTemperature, unitOfMeasurement, entity.state)

    return html`
      <thermostat-bar-card-row>
          <thermostat-bar-card-icon>
            <ha-icon icon="${icon}"></ha-icon>
          </thermostat-bar-card-icon>

        <thermostat-bar-card-bar>
          <thermostat-bar-card-backgroundbar
            style="--bar-color: ${barColor}"
          ></thermostat-bar-card-backgroundbar>
          <thermostat-bar-card-currentbar
            style="--bar-percent: ${barPercent}%; --bar-color: ${barColor}"
          ></thermostat-bar-card-currentbar>
          ${isOn ? html`
            <thermostat-bar-card-targetbar
              style="--bar-percent: ${targetBarStart}%; --bar-target-percent: ${targetBarEnd}%; --bar-color: ${barColor}"
            ></thermostat-bar-card-targetbar>
            <thermostat-bar-card-markerbar
              style="--bar-target-percent: ${targetPercent}%; left: calc(${targetPercent}% - 1px); --bar-color: ${barColor}"
            ></thermostat-bar-card-markerbar>` : '' }
          <thermostat-bar-card-textcontent
            @action=${() => this.toggleHvacMode(entity)}
            .actionHandler=${actionHandler()}
          >
            <thermostat-bar-card-icon-indicator
              style="--icon-color: ${barColor}"
            >
              ${isHeating ? html`<ha-icon icon="mdi:fire"></ha-icon> `: '' }
              ${isManualMode ? html`<ha-icon icon="mdi:thermometer-alert"></ha-icon> `: '' }
              ${isWindowOpen ? html`<ha-icon icon="mdi:window-open-variant"></ha-icon> `: '' }
            </thermostat-bar-card-icon-indicator>
            <thermostat-bar-card-text>
              ${temperatureText}
            </thermostat-bar-card-text>
          </thermostat-bar-card-textcontent>
        </thermostat-bar-card-bar>

        <thermostat-bar-card-control>
          <thermostat-bar-card-control-icon
            @action=${() => this.decreaseTemperature(entity)}
            .actionHandler=${actionHandler()}
          >
            <ha-icon icon="mdi:thermometer-minus"></ha-icon>
          </thermostat-bar-card-control-icon>
          <thermostat-bar-card-control-icon
            @action=${() => this.increaseTemperature(entity)}
            .actionHandler=${actionHandler()}
          >
            <ha-icon icon="mdi:thermometer-plus"></ha-icon>
          </thermostat-bar-card-control-icon>
        </thermostat-bar-card-control>
      </thermostat-bar-card-row>
      `
  }
  isWindowOpen(window_sensor?: string): boolean {
    if (!window_sensor) {
      return false
    }

    return this.hass.states[window_sensor]?.state === 'on'
  }

  private increaseTemperature(entity: Climate): void {
    this.changeTemperatureBy(entity, 1)
  }

  private decreaseTemperature(entity: Climate): void {
    this.changeTemperatureBy(entity, -1)
  }

  private changeTemperatureBy(entity: Climate, diff: number): void {
    const serviceData = {
      entity_id: entity.entity_id,
      temperature: entity.attributes.temperature + diff
    };

    this.hass.callService('climate', 'set_temperature', serviceData);
  }

  private temperatureText(currentTemperature: number, targetTemperature: number, unit: string, state: 'heat' | 'auto' | 'off'): string {
    const currentRounded = Math.round(currentTemperature);
    if (state === 'off') {
      return `${currentRounded} ${unit}`
    }

    return `${targetTemperature} ${unit}`
  }

  private calculatePercentage(value: number): number {
    const minTemperature = this.config.min_temperature || DEFAULT_MIN_TEMPERATURE
    const maxTemperature = this.config.max_temperature || DEFAULT_MAX_TEMPERATURE

    return (100 * (value - minTemperature)) / (maxTemperature - minTemperature)
  }

  private toggleHvacMode(entity: Climate): void {

    const hvacMode = entity.state === 'auto' ? 'off' : 'auto'
    const serviceData = {
      entity_id: entity.entity_id,
      hvac_mode: hvacMode
    };

    this.hass.callService('climate', 'set_hvac_mode', serviceData);
  }

  // https://lit-element.polymer-project.org/guide/styles
  static get styles(): CSSResult {
    return styles;
  }
}
