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

    return errors;
}

// FUNCTION - Validates products data
export function validateProduct(data) {
    const errors = [];

    // Checks if title exists and is not empty
    if (!data.title || data.title.trim() === '') {
        errors.push('Title is required');
    }

    // Checks if author exists and is not empty
    if (!data.author || data.author.trim() === '') {
        errors.push('Author is required');
    }

    // Checks if quantity exists and is a valid number
    if (data.quantity === undefined || data.quantity === null) {
        errors.push('Quantity is required');
    } else if (typeof data.quantity !== 'number' || isNaN(data.quantity)) {
        errors.push('Quantity must be a number (without quotes)');
    } else if (data.quantity < 0) {
        errors.push('Quantity cannot be negative');
    }

    // Checks if price exists and is a valid number
    if (data.price === undefined || data.price === null) {
        errors.push('Price is required');
    } else if (typeof data.price !== 'number' || isNaN(data.price)) {
        errors.push('Price must be a number (without quotes)');
    } else if (data.price < 0) {
        errors.push('Price cannot be negative');
    }

    // Checks if category exists and is not empty
    if (!data.category || data.category.trim() === '') {
        errors.push('Category is required');
    }

    // Checks if supplier_id exists and is a valid number
    if (data.supplier_id === undefined || data.supplier_id === null) {
        errors.push('Supplier ID is required');
    } else if (typeof data.supplier_id !== 'number' || isNaN(data.supplier_id)) {
        errors.push('Supplier ID must be number (without quotes)');
    }

    return errors;
}