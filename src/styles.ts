import { css } from 'lit-element';

export const styles = css`

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
  }

  thermostat-bar-card-row > * {
    margin-left: 6px;
    margin-right: 6px;
  }

  thermostat-bar-card-row > :first-child {
    margin-left: 0px;
    margin-right: 6px;
  }
  thermostat-bar-card-row > :last-child {
    margin-left: 6px;
    margin-right: 0px;
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
  }

  thermostat-bar-card-control-icon {
    cursor: pointer;
    color: var(--paper-item-icon-color);
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    position: relative;

    .fixed-width {
      width: 35px;
    }
  }

  thermostat-bar-card-control-icon + thermostat-bar-card-control-icon {
    margin-left: 10px;
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
    background: var(--bar-color);
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
    opacity: 0.7;
  }

  thermostat-bar-card-icon-indicator {
    display: flex;
    color: var(--icon-color);
    filter: brightness(0.8);
    margin-left: 12px;
  }

  thermostat-bar-card-flip {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`
export default styles;
