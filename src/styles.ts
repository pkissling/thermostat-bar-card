import { html } from 'lit-element';

export const styles = html`
  <style>
    #states > * {
      margin-bottom: 8px;
    }

    #states > :last-child {
      margin-bottom: 0px;
    }

    thermostat-bar-card-row {
      display: flex;
      flex-grow: 1;
      height: 40px;
      column-gap: 8px;
    }

    thermostat-bar-card-icon {
      color: var(--icon-color, var(--paper-item-icon-color));
      display: flex;
      align-items: center;
      align-self: center;
      justify-content: center;
      position: relative;
    }

    thermostat-bar-card-control {
      display: flex;
      column-gap: 12px;
      padding-left: 8px;
      padding-right: 8px;
    }

    thermostat-bar-card-control-icon {
      cursor: pointer;
      color: var(--icon-color, var(--paper-item-icon-color));
      display: flex;
      align-items: center;
      align-self: center;
      justify-content: center;
      position: relative;
    }

    thermostat-bar-card-bar {
      cursor: pointer;
      flex-grow: 1;
      position: relative;
    }

    thermostat-bar-card-currentbar {
      background: linear-gradient(
        to right,
        var(--bar-color) var(--bar-percent),
        #0000 var(--bar-percent),
        #0000 var(--bar-percent)
      );
    }
    thermostat-bar-card-targetbar {
      background: linear-gradient(
        to right,
        #0000 var(--bar-percent),
        var(--bar-color) var(--bar-percent),
        var(--bar-color) var(--bar-target-percent),
        #0000 var(--bar-target-percent)
      );
      display: var(--target-display);
      filter: brightness(0.66);
      opacity: 0.33;
    }
    thermostat-bar-card-markerbar {
      background: var(--bar-color);
      filter: brightness(0.75);
      opacity: 50%;
      position: absolute;
      height: 100%;
      width: 2px;
    }
    thermostat-bar-card-backgroundbar {
      background: var(--primary-color);
      filter: brightness(0.5);
      opacity: 0.25;
    }

    thermostat-bar-card-currentbar,
    thermostat-bar-card-backgroundbar,
    thermostat-bar-card-targetbar,
    thermostat-bar-card-textcontent {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: var(--ha-card-border-radius);
    }

    thermostat-bar-card-textcontent {
      align-items: center;
      color: var(--primary-text-color);
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
    }

    thermostat-bar-card-text {
      margin: 12px;
      margin-left: auto;
    }

    thermostat-bar-card-icon-indicator {
      display: flex;
      color: var(--primary-color);
      filter: brightness(0.8);
      margin-left: 12px;
    }
  </style>
`;

export default styles;
