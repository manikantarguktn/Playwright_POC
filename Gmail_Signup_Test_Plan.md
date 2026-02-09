# Gmail Signup Flow Test Plan

## Overview
This document outlines comprehensive test scenarios for the Gmail account creation process. The signup flow consists of multiple sequential steps including personal information collection, account credentials setup, and device verification.

---

## Test Scenarios

### SCENARIO 1: Happy Path - Successful Signup with Valid Data

**Objective:** Verify that a user can successfully create a Gmail account with valid information through all signup steps.

**Preconditions:**
- Browser is open and navigated to gmail.com
- No existing account is logged in
- User has access to a unique email address or phone number for verification (if required)

**Steps:**

1. Click on "Create account" button on the Gmail login page
2. Select "For my personal use" from the dropdown menu
3. Enter first name: "John"
4. Enter last name: "Doe"
5. Click "Next" button
6. Select month: "January" from the Month dropdown
7. Enter day: "15"
8. Enter year: "1990"
9. Select gender: "Male"
10. Click "Next" button
11. Enter username: "johndoe.test123" (or any available username)
12. If username is taken, select one of the suggested available usernames
13. Click "Next" button
14. Enter password: "TestPassword123!" (strong password with uppercase, lowercase, numbers, and symbols)
15. Confirm password: "TestPassword123!"
16. Click "Next" button
17. On the verification page, scan the QR code with a mobile device or complete alternative verification method
18. Follow the verification steps on the mobile device
19. Return to the browser and complete final account creation

**Expected Outcomes:**
- User successfully navigates through all 5 signup steps
- No validation errors appear for any field
- Account is created and user is redirected to Gmail inbox or account dashboard
- Confirmation message appears indicating successful account creation
- The new Gmail address is accessible for login

**Success Criteria:**
- Account creation completes without errors
- User can log in with the created credentials
- Gmail inbox is accessible

---

### SCENARIO 2: Username Validation and Suggestions

**Objective:** Verify that username validation works correctly and suggestions are provided for taken usernames.

**Preconditions:**
- User is on the "Create a Gmail address" step (Step 3)
- Field is cleared and ready for input

**Steps:**

1. Enter a common/taken username: "johndoe.test"
2. Wait for validation to complete (observe for error message)
3. Verify that "That username is taken. Try another." message appears
4. Observe the list of suggested available usernames
5. Click on one of the suggested usernames
6. Verify the username field is populated with the selected suggestion
7. Click "Next" button

**Expected Outcomes:**
- Username validation occurs automatically after user input
- Error message clearly indicates the username is taken
- A list of alternative suggestions is displayed
- Suggested usernames are clickable and auto-populate the field
- User can proceed with a valid suggested username

**Success Criteria:**
- Validation message is clear and informative
- Suggested usernames are relevant (derived from entered name/data)
- Clicking a suggestion properly fills the field
- Form can proceed with suggested username

---

### SCENARIO 3: Invalid Username Format

**Objective:** Verify that invalid username formats are rejected appropriately.

**Preconditions:**
- User is on the "Create a Gmail address" step (Step 3)

**Steps:**

1. Enter username with special characters: "john@doe#"
2. Wait for validation response
3. Clear field and enter username with only numbers: "12345"
4. Wait for validation response
5. Clear field and enter username with spaces: "john doe"
6. Observe validation message
7. Enter a valid username following the rules (letters, numbers, periods)

**Expected Outcomes:**
- Special characters are rejected or show validation error
- Usernames with invalid format display appropriate error messages
- Helper text "You can use letters, numbers & periods" is visible and informative
- System guides user toward valid username format
- Valid username format is accepted

**Success Criteria:**
- All invalid formats are caught and rejected
- Error messages are clear about what characters are allowed
- Helper text is visible and helpful

---

### SCENARIO 4: Password Strength Validation

**Objective:** Verify password strength validation and requirements are enforced.

**Preconditions:**
- User is on the "Create a strong password" step (Step 4)
- Both password fields are empty

**Steps:**

1. Enter weak password: "123456"
2. Enter same password in confirm field: "123456"
3. Attempt to click "Next" or observe validation feedback
4. Clear both fields
5. Enter password with only letters: "abcdefgh"
6. Try to proceed or observe validation
7. Clear and enter strong password: "MyPassword123!"
8. Enter same strong password in confirm field
9. Observe "Show password" checkbox and toggle it
10. Click "Next" button

**Expected Outcomes:**
- Weak passwords show validation error or warning
- Password requirements are displayed or enforced
- Strong password with mixed case, numbers, and symbols is accepted
- "Show password" checkbox toggles password visibility
- Matching passwords allow progression to next step
- Mismatched passwords prevent progression

**Success Criteria:**
- Password validation enforces strength requirements
- Show/hide toggle works correctly
- Strong passwords are accepted
- Weak passwords are rejected with clear messaging

---

### SCENARIO 5: Password Mismatch Error

**Objective:** Verify that mismatched passwords are caught and prevent form submission.

**Preconditions:**
- User is on the "Create a strong password" step (Step 4)

**Steps:**

1. Enter password: "TestPassword123!"
2. Enter different password in Confirm field: "TestPassword124!"
3. Try to click "Next" button
4. Observe error message
5. Correct the confirm field to match: "TestPassword123!"
6. Click "Next" button

**Expected Outcomes:**
- Mismatch error appears before attempting to submit
- Error message clearly indicates passwords don't match
- "Next" button remains disabled or shows error state
- Correcting the confirm field removes the error
- Form can proceed with matching passwords

**Success Criteria:**
- Mismatch validation works before form submission
- Error message is clear
- Form allows progression after matching passwords

---

### SCENARIO 6: Birthday and Gender Selection

**Objective:** Verify that birthday and gender fields work correctly with various inputs.

**Preconditions:**
- User is on the "Basic information" step (Step 2)
- Birthday and gender fields are empty

**Steps:**

1. Click Month dropdown and select "December"
2. Enter day: "31"
3. Enter year: "2000"
4. Click Gender dropdown
5. Observe all gender options: "Female", "Male", "Rather not say", "Custom"
6. Select "Rather not say"
7. Click "Next" button
8. (Alternative test) Go back, select "Custom" for gender
9. Observe if additional fields appear for custom gender input

**Expected Outcomes:**
- Month dropdown opens with all 12 months available
- Day field accepts valid dates (1-31)
- Year field accepts year values
- All four gender options are available and selectable
- Custom gender option works if available
- No errors occur with any valid combination
- Form proceeds to next step successfully

**Success Criteria:**
- All dropdown options are accessible
- Date inputs are validated
- Gender selection works smoothly
- Form progression succeeds with complete information

---

### SCENARIO 7: Account Type Selection

**Objective:** Verify that different account creation types are clearly presented and functional.

**Preconditions:**
- User is on the Gmail login page
- "Create account" button is visible

**Steps:**

1. Click "Create account" button
2. Observe dropdown menu appears with options
3. Verify three options are visible:
   - "For my personal use"
   - "For my child"
   - "For work or my business"
4. Click "For my personal use"
5. Verify flow continues to name entry step
6. (Alternative test) Repeat steps 1-3 and select "For my child"
7. Observe if flow differs for child account

**Expected Outcomes:**
- Dropdown menu displays all three account type options
- Each option is clickable and selectable
- "For my personal use" leads to standard signup flow
- Different account types may show different flows or requirements
- Selection progresses to next appropriate step

**Success Criteria:**
- All account types are clearly presented
- Selection works correctly
- Appropriate flow is triggered for each type

---

### SCENARIO 8: Empty Field Submission

**Objective:** Verify that required fields cannot be left empty and appropriate errors are shown.

**Preconditions:**
- User is on any signup step with required fields
- Fields are empty or partially filled

**Steps:**

1. On Step 1 (Name): Leave first name empty, try to click "Next"
2. Observe error message on first name field
3. Enter first name: "John"
4. Leave last name empty (it's optional) and click "Next"
5. Verify form proceeds (last name is optional)
6. (Repeat for each required field on subsequent steps)
7. On Step 3 (Username): Leave username empty and try "Next"
8. Observe validation error

**Expected Outcomes:**
- Required fields show error when left empty
- Error messages indicate which field is required
- Optional fields (like last name) allow submission
- "Next" button is disabled or submission is prevented until required fields are filled
- Error messages are clear and specific

**Success Criteria:**
- All required fields are validated
- Optional fields are correctly identified
- Submission is prevented for empty required fields
- Error messages are helpful

---

### SCENARIO 9: Mobile-Friendly Responsive Design

**Objective:** Verify that signup flow works correctly on mobile devices and responsive layouts.

**Preconditions:**
- Browser is resized to mobile viewport (375x667px or similar)
- User navigates to gmail.com signup

**Steps:**

1. Resize browser to mobile dimensions
2. Click "Create account"
3. Select "For my personal use"
4. Fill in name fields
5. Click "Next"
6. Fill in birthday and gender on mobile layout
7. Click "Next"
8. Fill username on mobile
9. Verify all form elements are accessible and properly sized
10. Verify buttons are easily clickable (at least 44px height)
11. Verify no horizontal scrolling is required
12. Verify dropdowns work properly on touch devices

**Expected Outcomes:**
- All form elements are properly sized and accessible
- Touch targets are adequate size (44px minimum)
- No horizontal scrolling required
- Dropdown menus work smoothly
- Text input fields are easily tappable
- Layout is optimized for mobile viewing

**Success Criteria:**
- All form functionality works on mobile
- No usability issues due to screen size
- Touch interaction is smooth and responsive

---

### SCENARIO 10: Device Verification Methods

**Objective:** Verify the device/phone verification step and alternative methods.

**Preconditions:**
- User has completed all steps through password creation
- User is on the verification page with QR code
- A mobile device is available for testing

**Steps:**

1. Observe the QR code verification method
2. Open camera app on mobile device
3. Scan the QR code
4. Follow the link and verification instructions on mobile
5. (Alternative) Look for alternative verification methods (if "Skip for now" or phone number entry option exists)
6. Complete verification on mobile device
7. Return to browser and verify account completion

**Expected Outcomes:**
- QR code is clearly displayed and scannable
- Instructions are clear and easy to follow
- Mobile verification process works smoothly
- Account is created successfully after verification
- User is redirected to Gmail dashboard after verification completion
- Alternative verification methods (if available) are clearly labeled

**Success Criteria:**
- QR code is properly generated and scannable
- Verification process is smooth and logical
- Account creation completes successfully
- User can access newly created Gmail account

---

### SCENARIO 11: Browser Back Button Behavior

**Objective:** Verify that using browser back button during signup works correctly and doesn't lose data.

**Preconditions:**
- User is in the middle of signup process
- Multiple steps have been completed

**Steps:**

1. Complete Steps 1-2 (name, birthday, gender)
2. Click browser back button
3. Observe what happens and verify data persistence
4. Click browser forward button
5. Continue to Step 3 (username)
6. Click browser back button multiple times
7. Verify data is retained or lost as expected per system design

**Expected Outcomes:**
- Data may be retained or cleared based on system design
- Navigation is smooth without errors
- User can navigate backward through steps if needed
- System either preserves session data or clearly indicates session state

**Success Criteria:**
- Browser navigation doesn't cause errors or data corruption
- User experience is consistent with expected behavior
- Session management is clear

---

### SCENARIO 12: Session Timeout

**Objective:** Verify behavior when signup session times out or expires.

**Preconditions:**
- User has started signup process
- User is in the middle of form completion

**Steps:**

1. Complete Step 1 (name information)
2. Leave browser idle for an extended period (observe system timeout duration)
3. Attempt to interact with next step
4. Observe if session expires or data is lost
5. Refresh the page
6. Check if user is returned to signup or login

**Expected Outcomes:**
- System may show timeout warning or message
- Session may be preserved for reasonable idle time
- Data may be retained or lost based on system design
- User is clearly informed of session status
- No errors occur when session expires

**Success Criteria:**
- Session timeout behavior is documented and consistent
- User is informed of timeout (if applicable)
- No data corruption occurs

---

### SCENARIO 13: Special Characters in Name Fields

**Objective:** Verify that name fields accept valid special characters and reject invalid ones.

**Preconditions:**
- User is on Step 1 (Name entry)

**Steps:**

1. Enter first name with apostrophe: "O'Connor"
2. Enter last name with hyphen: "Smith-Jones"
3. Click "Next" and verify acceptance
4. (Alternative test) Enter first name with special symbols: "John@#$"
5. Observe if validation rejects or accepts
6. Enter first name with numbers: "John123"
7. Observe validation behavior

**Expected Outcomes:**
- Common special characters (apostrophe, hyphen) are accepted
- Invalid special characters are rejected or flagged
- Numbers in name fields may be accepted or rejected based on validation rules
- Appropriate error messages guide user

**Success Criteria:**
- International and hyphenated names are supported
- Invalid formats are clearly rejected
- Error messages are helpful

---

### SCENARIO 14: Very Long Input Values

**Objective:** Verify that fields have appropriate length limits and handle long input.

**Preconditions:**
- User is on any text input field

**Steps:**

1. On Step 1: Enter extremely long first name (100+ characters)
2. Observe if field accepts or truncates
3. Try to click "Next"
4. Repeat on username field
5. Enter very long password
6. Observe field behavior

**Expected Outcomes:**
- Fields have reasonable length limits
- Input is truncated or rejected if exceeds limit
- Error messages indicate length requirements
- Form behaves gracefully with long inputs
- No system errors occur

**Success Criteria:**
- All fields have appropriate length validation
- Users are informed of limits
- System handles long input gracefully

---

### SCENARIO 15: Language and Localization

**Objective:** Verify language selection and UI localization in signup flow.

**Preconditions:**
- User is on signup page
- Language selector is visible (usually in footer)

**Steps:**

1. Click language dropdown (showing "English (United States)")
2. Select alternative language (e.g., Spanish, French, etc.)
3. Observe if signup form is translated
4. Verify all labels, buttons, and error messages are translated
5. Complete signup flow in alternate language
6. Switch back to English

**Expected Outcomes:**
- Language dropdown is functional
- All UI elements translate to selected language
- Form functionality is unchanged
- Error messages appear in selected language
- Language preference is consistent throughout signup

**Success Criteria:**
- Language switching works smoothly
- Translations are complete and accurate
- Form remains fully functional in all languages

---

### SCENARIO 16: Accessibility - Keyboard Navigation

**Objective:** Verify that signup form is fully navigable using keyboard only (no mouse).

**Preconditions:**
- Browser is open to signup page
- Keyboard is available

**Steps:**

1. Use Tab key to navigate through form fields in order
2. Use Shift+Tab to navigate backward
3. Use Enter key to submit forms and click buttons
4. Use arrow keys to navigate dropdowns
5. Verify focus indicators are visible for each element
6. Verify all interactive elements are reachable via keyboard
7. Verify no keyboard traps exist

**Expected Outcomes:**
- All form fields are reachable via Tab key
- Tab order is logical (top-to-bottom, left-to-right)
- Focus indicators are clearly visible
- Enter key submits forms and activates buttons
- Arrow keys work properly in dropdown menus
- No elements are unreachable via keyboard only
- No keyboard traps prevent escaping

**Success Criteria:**
- Full keyboard navigation is possible
- Focus management is clear and logical
- All functionality is accessible via keyboard

---

### SCENARIO 17: Screen Reader Compatibility

**Objective:** Verify that signup form is accessible to screen reader users.

**Preconditions:**
- Screen reader is available (NVDA, JAWS, or system screen reader)
- Browser is navigated to signup page

**Steps:**

1. Enable screen reader
2. Verify page title is announced: "Sign in" or appropriate heading
3. Navigate to form fields and verify labels are announced
4. Verify field types are announced (textbox, button, checkbox, combobox, etc.)
5. Verify error messages are announced when validation fails
6. Verify button purposes are clear when announced
7. Complete signup flow and verify all steps are properly announced

**Expected Outcomes:**
- All form fields have associated labels
- Field types are properly announced
- Error messages are announced to screen reader users
- Button purposes are clear (e.g., "Next", "Create account")
- Headings and structure are properly announced
- Focus management is clear

**Success Criteria:**
- Form is fully usable with screen reader
- All content is accessible
- No screen reader-specific issues

---

### SCENARIO 18: Error Recovery

**Objective:** Verify that users can recover from errors and continue signup.

**Preconditions:**
- User encounters an error during signup

**Steps:**

1. Intentionally trigger error (e.g., taken username, weak password)
2. Verify error message is displayed
3. Correct the problematic input
4. Verify error message clears
5. Verify previously entered data is retained
6. Click "Next" to proceed

**Expected Outcomes:**
- Error messages are clear and specific
- Previously entered data is preserved after error
- User can easily correct the error
- Subsequent form submission succeeds
- No data loss occurs due to error

**Success Criteria:**
- Errors don't cause data loss
- Error recovery is smooth
- User experience is not significantly disrupted

---

### SCENARIO 19: Concurrent Account Creation

**Objective:** Verify system behavior when creating multiple accounts in parallel sessions.

**Preconditions:**
- Multiple browser windows or tabs are open
- Both are on signup page

**Steps:**

1. Start signup process in Window A
2. Start signup process in Window B with different user data
3. Complete signup in Window A
4. Complete signup in Window B
5. Verify both accounts are created successfully
6. Log in with both accounts to verify

**Expected Outcomes:**
- Both accounts are created successfully
- No data collision or mixing occurs
- Each account is independent and functional
- No session conflicts arise

**Success Criteria:**
- System can handle concurrent signups
- No data integrity issues
- Both accounts are fully functional

---

### SCENARIO 20: Privacy and Security

**Objective:** Verify that sensitive data is handled securely during signup.

**Preconditions:**
- Browser developer tools network tab is open
- User is on signup page

**Steps:**

1. Monitor network traffic during password entry
2. Verify password data is transmitted over HTTPS (not HTTP)
3. Complete signup and check browser storage/cookies
4. Verify sensitive data is not stored in localStorage or plain cookies
5. Check that form data is cleared after successful submission
6. Verify no password data appears in URLs or console logs

**Expected Outcomes:**
- All communication is via HTTPS
- Passwords are not visible in network traffic
- Sensitive data is not stored in browser localStorage
- Form is properly cleared after submission
- No security warnings appear
- Browser security indicators are positive (lock icon, etc.)

**Success Criteria:**
- HTTPS is used throughout
- Password security is maintained
- No sensitive data exposure
- Industry security standards are met

---

## Summary

This test plan provides comprehensive coverage of the Gmail signup process including:
- **Happy path scenarios** ensuring the primary user flow works correctly
- **Input validation** verifying required fields and data format requirements
- **Error handling** testing recovery from validation errors
- **Edge cases** including very long inputs and special characters
- **Accessibility** ensuring keyboard navigation and screen reader support
- **Responsiveness** verifying mobile device compatibility
- **Security** confirming sensitive data protection
- **Localization** testing multi-language support

All test scenarios should be executed in a test environment before deployment, and any defects should be documented and tracked through the development process.

