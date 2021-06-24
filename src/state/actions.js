
export const ACTIONS = Object.freeze({
    SAVE_FORM: 'save-form',
    UPDATE_VERSION: 'update-version',
});

export const createSaveFormAction = (data) => ({ type: ACTIONS.SAVE_FORM, data });

export const createVersionChangedAction = (v) => ({ type: ACTIONS.UPDATE_VERSION, version: (v || process.env.REACT_APP_VERSION) });
