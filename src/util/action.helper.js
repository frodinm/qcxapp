export const createAction = (value) => ({
    SUCCESS : `${value}_SUCCESS`,
    PENDING: `${value}_PENDING`,
    ERROR: `${value}_ERROR`
})