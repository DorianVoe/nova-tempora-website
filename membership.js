// Paste the dedicated Form.taxi submission URL here once it has been created.
// An empty value keeps online submissions disabled on both language versions.
const membershipEndpoint = '';

const membershipForm = document.getElementById('membership-form');
const membershipType = membershipForm.elements.membership_type;
const organisationFields = document.getElementById('organisation-fields');
const submitApplication = membershipForm.querySelector('button[type="submit"]');
const endpoint = membershipEndpoint.trim();
const applicationEnabled = /^https:\/\/form\.taxi\/s\/[a-zA-Z0-9_-]+$/.test(endpoint)
  && endpoint.toLowerCase() !== 'https://form.taxi/s/eukktt74';

function updateOrganisationFields() {
  const isOrganisation = membershipType.value === 'organisation';
  organisationFields.hidden = !isOrganisation;
  organisationFields.disabled = !isOrganisation;
}

membershipType.addEventListener('change', updateOrganisationFields);
window.addEventListener('pageshow', updateOrganisationFields);
updateOrganisationFields();

membershipForm.addEventListener('invalid', event => {
  const field = event.target;
  if (field === membershipType) {
    field.setCustomValidity(membershipForm.dataset.errorType);
  } else if (field.type === 'checkbox') {
    field.setCustomValidity(membershipForm.dataset.errorCheckbox);
  } else if (field.validity.typeMismatch) {
    field.setCustomValidity(membershipForm.dataset.errorEmail);
  } else {
    field.setCustomValidity(membershipForm.dataset.errorRequired);
  }
}, true);

for (const eventName of ['input', 'change']) {
  membershipForm.addEventListener(eventName, event => {
    event.target.setCustomValidity('');
  });
}

membershipForm.addEventListener('submit', event => {
  if (!applicationEnabled) event.preventDefault();
});

if (applicationEnabled) {
  membershipForm.action = endpoint;
  submitApplication.disabled = false;
  document.getElementById('join-unavailable').hidden = true;
  membershipForm.setAttribute('aria-describedby', 'join-required');
}
