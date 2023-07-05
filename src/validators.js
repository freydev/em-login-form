const requiredValidate = (message) => async (name, data) =>
    !data || !data.trim().length === 0 ?
        Promise.reject({errors: {[name]: message}}) : Promise.resolve();
const emailValidate = (message) => async (name, data) =>
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data) ?
        Promise.reject({errors: {[name]: message}}) : Promise.resolve();
const minValidate = (message, min) => async (name, data) =>
    data.length < min ?
        Promise.reject({errors: {[name]: message}}) : Promise.resolve();

const validate = async (formData, name, validators) =>
    Promise.all(validators.map(fn => fn(name, formData.get(name))))

export {validate, requiredValidate, emailValidate, minValidate}
