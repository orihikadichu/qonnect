import { addNotification as notify } from 'reapop';

export function notifySuccess(message) {
  return notify({
    message,
    position: 'tc',
    status: 'success',
    dismissAfter: 2000
  });
}

export function notifyError(message) {
  return notify({
    message,
    position: 'tc',
    status: 'error',
    dismissAfter: 2000
  });
}
