// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Firestore configuration and initialization (add your Firebase config here)
const firebaseConfig = {
    apiKey: "AIzaSyB2-CfeJtPN69JBZlgpv4WsY5NFljLw8ko",
    authDomain: "lawyer-website-2ac35.firebaseapp.com",
    projectId: "lawyer-website-2ac35",
    storageBucket: "lawyer-website-2ac35.appspot.com",
    messagingSenderId: "890560820921",
    appId: "1:890560820921:web:e905fc3299affe75fa4d68",
    measurementId: "G-41S9SK0WD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// initializeAnalytics(app);
const analytics = getAnalytics(app);

// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('caseLookupForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const dob = document.getElementById('dob').value;
        const caseId = document.getElementById('caseId').value.trim();

        const caseResultsSection = document.getElementById('caseResultsSection');
        const caseUpdatesList = document.getElementById('caseUpdatesList');  // Always reference this
        const caseResultsMessage = document.getElementById('caseResultsMessage');  // New element for messages

        // Clear any previous messages and list items, but keep elements intact
        caseResultsMessage.textContent = '';  // Clear previous "No case found" message
        caseUpdatesList.innerHTML = '';       // Clear previous case updates

        try {
            const caseQuery = query(
                collection(db, 'cases'),
                where('firstName', '==', firstName),
                where('lastName', '==', lastName)
            );

            const querySnapshot = await getDocs(caseQuery);

            if (querySnapshot.empty) {
                // No data found case
                console.log('No case found');
                caseResultsMessage.textContent = 'No case found matching the provided details.';
                caseResultsSection.classList.remove('hidden');  // Make sure section is visible
            } else {
                // Case found
                console.log('Case found');
                caseResultsSection.classList.remove('hidden');  // Make sure section is visible

                querySnapshot.forEach(doc => {
                    const caseData = doc.data();
                    const updates = caseData.updates;

                    // Sort updates by date
                    updates.sort((a, b) => new Date(a.date.toDate()) - new Date(b.date.toDate()));

                    updates.forEach(update => {
                        const updateDate = update.date.toDate();  // Convert Firestore Timestamp to JS Date

                        // Create a new list item for each update
                        const updateItem = document.createElement('li');
                        updateItem.innerHTML = `<strong>${updateDate.toLocaleDateString()}</strong> - ${update.details}`;

                        // Append the item to the pre-defined list in the HTML
                        caseUpdatesList.appendChild(updateItem);
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching case data:', error);
            caseResultsMessage.textContent = 'Failed to fetch case updates. Please try again later.';
        }
    });
});