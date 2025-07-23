document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calculateBtn = document.getElementById('calculateBtn');
    
    const yearsResult = document.getElementById('years-result');
    const monthsResult = document.getElementById('months-result');
    const daysResult = document.getElementById('days-result');
    
    const errorMessage = document.getElementById('error-message');

    // Attach event listener to the button
    calculateBtn.addEventListener('click', calculateAge);

    function calculateAge() {
        // Clear previous results and errors
        resetResults();
        
        // Get input values as numbers
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        // --- 1. VALIDATION ---
        if (!isValidDate(day, month, year)) {
            showError('Please enter a valid date.');
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        if (birthDate > today) {
            showError('Date of birth cannot be in the future.');
            return;
        }

        // --- 2. CALCULATION ---
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        // Adjust for negative days
        if (ageDays < 0) {
            ageMonths--;
            // Get the last day of the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }

        // Adjust for negative months
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        // --- 3. DISPLAY RESULTS ---
        displayResult(ageYears, ageMonths, ageDays);
    }

    function isValidDate(d, m, y) {
        // Basic checks for empty fields
        if (!d || !m || !y) return false;
        
        // Check for valid ranges
        if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900) return false;

        // Check for months with 30 days
        if ((m === 4 || m === 6 || m === 9 || m === 11) && d > 30) return false;
        
        // Check for February and leap years
        if (m === 2) {
            const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
            if (isLeap && d > 29) return false;
            if (!isLeap && d > 28) return false;
        }

        return true;
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function resetResults() {
        yearsResult.textContent = '--';
        monthsResult.textContent = '--';
        daysResult.textContent = '--';
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    function displayResult(y, m, d) {
        yearsResult.textContent = y;
        monthsResult.textContent = m;
        daysResult.textContent = d;
    }
});
