const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (successMessage) {
    successMessage.setAttribute('role', 'alert');
    successMessage.setAttribute('aria-live', 'assertive');
    successMessage.setAttribute('aria-hidden', 'true');
}

const fieldValidators = {
    firstName: createFieldConfig('first-name', [required('This field is required')]),
    lastName: createFieldConfig('last-name', [required('This field is required')]),
    email: createFieldConfig('email', [
        required('This field is required'),
        value => (isValidEmail(value) ? null : 'Please enter a valid email address')
    ]),
    message: createFieldConfig('message', [required('This field is required')])
};

const radioGroup = createRadioGroupConfig();
const consentField = createConsentConfig();

Object.values(fieldValidators).forEach(field => {
    if (!field.input) return;
    ['input', 'blur'].forEach(evt => {
        field.input.addEventListener(evt, () => validateField(field));
    });
});

if (radioGroup.container) {
    radioGroup.container.addEventListener('change', () => {
        updateRadioOptionStates();
        validateRadioGroup();
    });
    updateRadioOptionStates();
}

if (consentField.input) {
    consentField.input.addEventListener('change', validateConsent);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    let isFormValid = true;

    Object.values(fieldValidators).forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!validateRadioGroup()) {
        isFormValid = false;
    }

    if (!validateConsent()) {
        isFormValid = false;
    }

    if (!isFormValid) {
        return;
    }

    handleSuccessfulSubmission();
});

function createFieldConfig(inputId, validators) {
    const input = document.getElementById(inputId);
    const error = document.querySelector(`#${inputId} + .form-alert`);
    const defaultMessage = error?.textContent.trim() || '';

    if (input) {
        input.setAttribute('aria-invalid', 'false');
    }

    if (input && error) {
        ensureErrorId(input, error);
    }

    return {
        input,
        error,
        validators,
        defaultMessage
    };
}

function createRadioGroupConfig() {
    const inputs = Array.from(document.querySelectorAll('input[name="query-type"]'));
    const container = document.querySelector('.radio-inputs');
    const error = document.querySelector('.radio-inputs + .form-alert');
    const defaultMessage = error?.textContent.trim() || '';

    if (inputs.length && error) {
        error.id = error.id || 'query-type-error';
        inputs.forEach(input => {
            input.setAttribute('aria-describedby', error.id);
        });
    }

    return { inputs, container, error, defaultMessage };
}

function createConsentConfig() {
    const input = document.getElementById('consent');
    const error = input?.closest('.form-item')?.querySelector('.form-alert') || null;
    const defaultMessage = error?.textContent.trim() || '';

    if (input) {
        input.setAttribute('aria-invalid', 'false');
    }

    if (input && error) {
        ensureErrorId(input, error);
    }

    return { input, error, defaultMessage };
}

function ensureErrorId(input, errorElement) {
    if (!errorElement.id) {
        errorElement.id = `${input.id}-error`;
    }
    input.setAttribute('aria-describedby', errorElement.id);
}

function required(message) {
    return value => (value.trim() ? null : message);
}

function validateField(field) {
    if (!field.input) {
        return true;
    }

    const value = field.input.value;

    for (const validator of field.validators) {
        const validationMessage = validator(value.trim());
        if (validationMessage) {
            showError(field, validationMessage);
            return false;
        }
    }

    clearError(field);
    if (value.trim()) {
        field.input.classList.add('form-success');
    } else {
        field.input.classList.remove('form-success');
    }
    return true;
}

function validateRadioGroup() {
    if (!radioGroup.inputs.length) {
        return true;
    }

    const selected = radioGroup.inputs.find(input => input.checked);

    if (!selected) {
        showGroupError(radioGroup, radioGroup.defaultMessage || 'Please select a query type');
        return false;
    }

    clearGroupError(radioGroup);
    return true;
}

function validateConsent() {
    if (!consentField.input) {
        return true;
    }

    if (!consentField.input.checked) {
        showGroupError(consentField, consentField.defaultMessage || 'To submit this form, please consent to being contacted');
        consentField.input.setAttribute('aria-invalid', 'true');
        return false;
    }

    clearGroupError(consentField);
    consentField.input.setAttribute('aria-invalid', 'false');
    return true;
}

function showError(field, message) {
    if (field.error) {
        field.error.textContent = message || field.defaultMessage;
        field.error.classList.add('form-error');
        field.error.removeAttribute('aria-hidden');
    }
    if (field.input) {
        field.input.classList.remove('form-success');
        field.input.classList.add('form-error');
        field.input.setAttribute('aria-invalid', 'true');
    }
}

function clearError(field) {
    if (field.error) {
        field.error.classList.remove('form-error');
        field.error.setAttribute('aria-hidden', 'true');
        field.error.textContent = field.defaultMessage;
    }
    if (field.input) {
        field.input.classList.remove('form-error');
        field.input.setAttribute('aria-invalid', 'false');
    }
}

function showGroupError(group, message) {
    if (group.error) {
        group.error.textContent = message || group.defaultMessage;
        group.error.classList.add('form-error');
        group.error.removeAttribute('aria-hidden');
    }
    if (group.container) {
        group.container.classList.add('form-error');
    }
}

function clearGroupError(group) {
    if (group.error) {
        group.error.classList.remove('form-error');
        group.error.setAttribute('aria-hidden', 'true');
        group.error.textContent = group.defaultMessage;
    }
    if (group.container) {
        group.container.classList.remove('form-error');
    }
}

function updateRadioOptionStates() {
    radioGroup.inputs.forEach(input => {
        const option = input.closest('.radio-option');
        if (option) {
            option.classList.toggle('active', input.checked);
        }
    });
}

function handleSuccessfulSubmission() {
    successMessage.classList.add('active');
    successMessage.setAttribute('aria-hidden', 'false');

    form.reset();

    Object.values(fieldValidators).forEach(resetFieldState);
    clearGroupError(radioGroup);
    clearGroupError(consentField);
    updateRadioOptionStates();

    setTimeout(() => {
        successMessage.classList.remove('active');
        successMessage.setAttribute('aria-hidden', 'true');
    }, 5000);
}

function resetFieldState(field) {
    if (field.input) {
        field.input.classList.remove('form-error', 'form-success');
        field.input.setAttribute('aria-invalid', 'false');
    }
    clearError(field);
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}