// FUNCTION - Validates supplier data
// Returns array of error messages, if empty = everything is OK!
export function validateSupplier(data) {
    const errors = [];

    // Checks if name exists and is not empty
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required and cannot be empty');
    }

    // Checks that contact_person exists
    if (!data.contact_person || data.contact_person.trim() === '') {
        errors.push('Contact person is required');
    }

    // Checks if email exists and contains @
    if(!data.email || data.email.trim() === '') {
        errors.push('Email is required');
    } else if (!data.email.includes('@')) {
        errors.push('Email must be a valid email address')
    }

    // Checks if country exists
    if(!data.country || data.country.trim() === '') {
        errors.push('Country is required');
    }

    return errors; // Empty array if everything is OK
}

// FUNCTION - Product validation will come here later..