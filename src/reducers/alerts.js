import { DISMISS_ALERT } from '../actions/alerts';

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: '10999',
      value: 26,
      color: 'primary',
      footer: "Creando 'recipient'... 65%",
    },
    {
      id: 1,
      title: '109998',
      value: 73,
      color: 'success',
      footer: "Guardando 'payment'",
    },
  ],
};

export default function alertsReducer(state = defaultState, action) {
  let index;
  switch (action.type) {
    case DISMISS_ALERT:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.id) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
          ...state.alertsList.slice(index + 1),
        ],
      });
    default:
      return state;
  }
}
