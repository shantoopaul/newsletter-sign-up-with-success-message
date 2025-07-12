const form = document.querySelector('.newsletter-form');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const successEmail = document.querySelector('.success-email');
const newsletterContainer = document.querySelector('.newsletter-container');
const successContainer = document.querySelector('.success-message-container');
const dismissButton = document.querySelector('.success-message-container .btn');

const isValidEmail = email => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);

const showError = message => {
	emailError.textContent = message;
	emailError.classList.remove('hidden');
	emailInput.classList.add('invalid');
	emailInput.setAttribute('aria-invalid', 'true');
	emailInput.setAttribute('aria-describedby', 'email-error');
};

const clearError = () => {
	emailError.textContent = '';
	emailError.classList.add('hidden');
	emailInput.classList.remove('invalid');
	emailInput.removeAttribute('aria-invalid');
	emailInput.removeAttribute('aria-describedby');
};

const showSuccess = email => {
	newsletterContainer.classList.add('hidden');
	successContainer.classList.remove('hidden');
	successEmail.textContent = email;
};

// Form validation
const validateForm = () => {
	const email = emailInput.value.trim();

	if (!email) {
		showError('Email is required');
		return false;
	}

	if (!isValidEmail(email)) {
		showError('Please enter a valid email address');
		return false;
	}

	clearError();
	return true;
};

// Event handlers
const handleSubmit = e => {
	e.preventDefault();
	if (validateForm()) {
		showSuccess(emailInput.value.trim());
	}
};

const handleInput = () => {
	if (emailError.textContent) validateForm();
};

const handleDismiss = () => {
	successContainer.classList.add('hidden');
	newsletterContainer.classList.remove('hidden');
	form.reset();
};

form.addEventListener('submit', handleSubmit);
emailInput.addEventListener('blur', validateForm);
emailInput.addEventListener('input', handleInput);
dismissButton.addEventListener('click', handleDismiss);
