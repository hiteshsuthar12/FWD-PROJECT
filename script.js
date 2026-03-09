// ==============================
// CHECK IF JS IS CONNECTED
// ==============================
console.log("Script Loaded Successfully");


// ================= AUTH SYSTEM =================
// Backend API URL
const API_BASE_URL = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", function () {

    // ===== SIGN UP =====
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            // Validate inputs
            if (!name || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }

            // Send signup request to backend
            const signupData = {
                name: name,
                email: email,
                password: password
            };

            fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    // Clear form
                    signupForm.reset();
                    // Redirect to login page
                    window.location.href = "Login.html";
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred during sign up. Please try again.");
            });
        });
    }


    // ===== LOGIN =====
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Validate inputs
            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            // Send login request to backend
            const loginData = {
                email: email,
                password: password
            };

            fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store user and token in sessionStorage
                    sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
                    sessionStorage.setItem("token", data.token);
                    
                    alert(data.message);
                    // Clear form
                    loginForm.reset();
                    // Redirect to home page
                    window.location.href = "HOME.HTML";
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred during login. Please check if backend is running on port 8080.");
            });
        });
    }

});

// ===== LOGOUT =====
function logout() {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "Login.html";
}

// ===== CHECK IF USER IS LOGGED IN =====
function isUserLoggedIn() {
    return sessionStorage.getItem("loggedInUser") !== null &&
           sessionStorage.getItem("token") !== null;
}

// ===== GET LOGGED IN USER =====
function getLoggedInUser() {
    const userJson = sessionStorage.getItem("loggedInUser");
    return userJson ? JSON.parse(userJson) : null;
}

// ===== GET AUTH TOKEN =====
function getAuthToken() {
    return sessionStorage.getItem("token");
}




document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("city.html")) {
        localStorage.removeItem("selectedCities");
    }
});
// ==============================
// STATE SELECTION
// ==============================
function selectState(stateName) {
    localStorage.setItem("selectedState", stateName);
    localStorage.removeItem("selectedCities");
    window.location.href = "city.html";
}


// ==============================
// MULTI CITY SELECTION
// ==============================
function selectCity(cityName, element) {

    element.classList.toggle("selected-city");

    let selectedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];

    if (selectedCities.includes(cityName)) {
        selectedCities = selectedCities.filter(city => city !== cityName);
    } else {
        selectedCities.push(cityName);
    }

    localStorage.setItem("selectedCities", JSON.stringify(selectedCities));

    console.log("Selected:", selectedCities);
}

// ==============================
// EXPLORE DESTINATION PAGE
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("ExploreDestination.html")) return;

    const destinations = [
        { name: "Pillared Cenotaph", img: "./Rajasthan-cities/84_Pillared_Cenotaph_1.jpeg" },
        { name: "Akshardham Temple", img: "./Rajasthan-cities/aksardham-temple.jpg" },
        { name: "Albert Hall Museum", img: "./Rajasthan-cities/Albert-Museum.jpg" },
        { name: "Amar Jawan Jyoti", img: "./Rajasthan-cities/Amar-Jawan-jyoti.jpg" },
        { name: "Amber Fort", img: "./Rajasthan-cities/amber.jpg" },
        { name: "Ambrai Ghat", img: "./Rajasthan-cities/Ambrai-Ghat.jpeg" },
        { name: "Bada Bagh", img: "./Rajasthan-cities/Bada-Bagh.jpeg" },
        { name: "Bada Mahal", img: "./Rajasthan-cities/Bada-Mahal.jpeg" },
        { name: "Bahubali Hills", img: "./Rajasthan-cities/Bahubali-Hills.jpg" },
        { name: "Bahubali Hills 2", img: "./Rajasthan-cities/Bahubli-Hills.jpeg" },
        { name: "Balsamand Lake", img: "./Rajasthan-cities/balsamand-lake.jpg" },
        { name: "Bhimlat Waterfall", img: "./Rajasthan-cities/Bhimlat_Waterfall_1.jpeg" },
        { name: "Bikaner Fort", img: "./Rajasthan-cities/bikaner.jpg" },
        { name: "Birla Temple", img: "./Rajasthan-cities/Birla-Temple.jpg" },
        { name: "Brahma Temple", img: "./Rajasthan-cities/Brahma_Temple_1.jpeg" },
        { name: "Chamunda Mata Temple", img: "./Rajasthan-cities/chamunda-Mataji.jpg" },
        { name: "Chittorgarh Fort", img: "./Rajasthan-cities/Chittorgrah-fort.jpeg" },
        { name: "Bundi City Palace", img: "./Rajasthan-cities/city-bundi.jpg" },
        { name: "City Palace Udaipur", img: "./Rajasthan-cities/City-Palace.jpeg" },
        { name: "City Palace Jaipur", img: "./Rajasthan-cities/city-palace.jpg" },
        { name: "Devi Kund", img: "./Rajasthan-cities/devi-Kund.jpg" },
        { name: "Fateh Sagar Lake", img: "./Rajasthan-cities/Fateh-Sagar-Lake.jpeg" },
        { name: "Prakash Palace", img: "./Rajasthan-cities/Fetch-Prakash-Palace.jpeg" },
        { name: "Gajner Palace & Lake", img: "./Rajasthan-cities/Gajner-Palace-and-Lake.jpg" },
        { name: "Galta Ji Temple", img: "./Rajasthan-cities/Galta-ji.jpg" },
        { name: "Gangaur Ghat", img: "./Rajasthan-cities/Ganguar-Ghat.jpeg" },
        { name: "Garh Palace", img: "./Rajasthan-cities/Garh_Palace_1.jpg" },
        { name: "Gau Ghat", img: "./Rajasthan-cities/Gau_Ghat_1.jpeg" },
        { name: "Gayatri Mata Temple", img: "./Rajasthan-cities/Gayatri_Mata_Temple_1.jpeg" },
        { name: "Ghanta Ghar", img: "./Rajasthan-cities/ghanta-ghar.jpg" },
        { name: "Gortire Fort", img: "./Rajasthan-cities/Gortire.jpg" },
        { name: "Gulab Bagh & Zoo", img: "./Rajasthan-cities/Gulab-Bagh-and-Zoo.jpeg" },
        { name: "Hathi Pol Bazaar", img: "./Rajasthan-cities/Hati-pol-bazzer.jpeg" },
        { name: "Hawa Mahal", img: "./Rajasthan-cities/Hawa-mahal.jpg" },
        { name: "Jagmandir Island Palace", img: "./Rajasthan-cities/Jagmandir-Island-Palace.jpeg" },
        { name: "Jaigarh Fort", img: "./Rajasthan-cities/Jaigarh-fort.jpg" },
        { name: "Jaipur Wax Museum", img: "./Rajasthan-cities/Jaipur-wax-museum.jpg" },
        { name: "Jaisalmer War Museum", img: "./Rajasthan-cities/Jaisalmer_War_Museum.jpeg" },
        { name: "Jaisalmer Fort", img: "./Rajasthan-cities/Jaisalmer-Fort.jpeg" },
        { name: "Jaisalmer City ", img: "./Rajasthan-cities/jaislmar.jpg" },
        { name: "Jal Mahal", img: "./Rajasthan-cities/JAL-MAHAL.jpg" },
        { name: "Jantar Mantar", img: "./Rajasthan-cities/jantar-mantar.jpg" },
        { name: "Jawahar Circle", img: "./Rajasthan-cities/Jawahar-circle.jpg" },
        { name: "Kalika Mata Temple", img: "./Rajasthan-cities/Kalika-Mata-Temple.jpeg" },
        { name: "Karnataka Temple", img: "./Rajasthan-cities/KARNATAKA_5.jpg" },
        { name: "Karni Mata Temple", img: "./Rajasthan-cities/Karni-Mata-Temple.jpg" },
        { name: "Kirti Stambh", img: "./Rajasthan-cities/Kirti-Stambh.jpeg" },
        { name: "Kshar Bagh", img: "./Rajasthan-cities/Kshar_Bagh_1.png" },
        { name: "Lake Jait Sagar", img: "./Rajasthan-cities/Lake_Jait_Sagar_1.jpeg" },
        { name: "Lake Nawal Sagar", img: "./Rajasthan-cities/Lake_Nawal_Sagar_1.jpeg" },
        { name: "Madhvendra Palace", img: "./Rajasthan-cities/Madhvendra-palace.jpg" },
        { name: "Man Mahal", img: "./Rajasthan-cities/Man_Mahal_1.jpeg" },
        { name: "Mandore Garden", img: "./Rajasthan-cities/Mandore.jpg" },
        { name: "Meera Temple", img: "./Rajasthan-cities/Meera-Temple.jpeg" },
        { name: "Mehrangarh Fort", img: "./Rajasthan-cities/mehrangarh-fort.jpg" },
        { name: "Nahargarh Biological Park", img: "./Rajasthan-cities/Nahargarh-Biological-park.jpg" },
        { name: "Nahargarh Fort", img: "./Rajasthan-cities/Nahargarh-fort.jpg" },
        { name: "Nathmal Ji Ki Haveli", img: "./Rajasthan-cities/Nathmal-ji-ki-Haveli.jpeg" },
        { name: "Nehru Garden", img: "./Rajasthan-cities/Nehru-Garden.jpeg" },
        { name: "Padmini's Palace", img: "./Rajasthan-cities/Padmini's-Palace.jpeg" },
        { name: "Patwon Ki Haveli", img: "./Rajasthan-cities/Patwon-ki-Haveli.jpeg" },
        { name: "Punjab Temple", img: "./Rajasthan-cities/PUNJAB_8.jpg" },
        { name: "Pushkar Bazaar", img: "./Rajasthan-cities/Pushkar_Bazaar_1.jpeg" },
        { name: "Pushkar Lake", img: "./Rajasthan-cities/Pushkar_Lake_1.jpeg" },
        { name: "Raisar Dunes", img: "./Rajasthan-cities/Raisar-Dunes.jpg" },
        { name: "Raita Hills", img: "./Rajasthan-cities/Raita-Hills.jpeg" },
        { name: "Rajasthan Heritage", img: "./Rajasthan-cities/RAJASTHAN_1.jpg" },
        { name: "Ramdevra Temple", img: "./Rajasthan-cities/Ramdevra-Temple.jpeg" },
        { name: "Ranisagar & Padamsar", img: "./Rajasthan-cities/Ranisagar&Padamsar.jpg" },
        { name: "Saheliyon Ki Bari", img: "./Rajasthan-cities/Saheliyon-ki-badi.jpeg" },
        { name: "Salim Singh Ki Haveli", img: "./Rajasthan-cities/Salim-Singh-ki-Haveli.jpeg" },
        { name: "Samode Palace", img: "./Rajasthan-cities/samode.png" },
        { name: "Savitri Mata Temple", img: "./Rajasthan-cities/Savitri_Mata_Temple_1.jpeg" },
        { name: "Sisodia Rani Palace", img: "./Rajasthan-cities/sisodia-rani-palace.jpg" }
    ];

    const container = document.getElementById("destinationContainer");
    const searchInput = document.getElementById("searchInput");

    if (!container) return;

    // DISPLAY FUNCTION
    function displayDestinations(data) {
        container.innerHTML = "";

        data.forEach(place => {

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${place.img}" alt="${place.name}">
                <div class="card-content">
                    
                    <h3>${place.name}</h3>
                   <button class="btn" onclick="goToView('${place.name}', '${place.img}')">
                       View
                         </button>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // RANDOM ORDER ON LOAD
    displayDestinations(destinations.sort(() => 0.5 - Math.random()));

    // SEARCH FUNCTION
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const filtered = destinations.filter(place =>
                place.name.toLowerCase().includes(value)
            );

            displayDestinations(filtered);
        });
    }

});


const guides = [
    {
        name: "Ramesh Sharma",
        rating: "4.8",
        experience: "8 Years",
        specialities: "Heritage Tours, Fort History",
        places: "Jaipur, Amber Fort, Nahargarh",
    },
    {
        name: "Imran Khan",
        rating: "4.6",
        experience: "5 Years",
        specialities: "Desert Safari, Cultural Tours",
        places: "Jaisalmer, Sam Sand Dunes",
    },
    {
        name: "Sunita Verma",
        rating: "4.9",
        experience: "10 Years",
        specialities: "Lake Tours, Temple Tours",
        places: "Udaipur, City Palace, Fateh Sagar",
    },
    {
        name: "Arjun Singh",
        rating: "4.7",
        experience: "6 Years",
        specialities: "Fort Tours, Local History",
        places: "Jodhpur, Mehrangarh Fort",
    }
];

const guideContainer = document.getElementById("guideContainer");
const guideSearchInput = document.getElementById("searchInput");

if (guideContainer && guideSearchInput) {

    function displayGuides(data) {
        guideContainer.innerHTML = "";

        if (data.length === 0) {
            guideContainer.innerHTML = "<p>No guides found.</p>";
            return;
        }

        data.forEach(guide => {
            const card = document.createElement("div");
            card.classList.add("guide-card");

            card.innerHTML = `
        <h2>${guide.name}</h2>
        <p>⭐ ${guide.rating}</p>
        <p><strong>Experience:</strong> ${guide.experience}</p>
        <p><strong>Specialities:</strong> ${guide.specialities}</p>
        <p><strong>Places:</strong> ${guide.places}</p>
        <button onclick="bookGuide('${guide.name}')">Book Now - ₹299</button>
      `;

            guideContainer.appendChild(card);
        });
    }

    guideSearchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();

        const filtered = guides.filter(guide =>
            guide.places.toLowerCase().includes(value)
        );

        displayGuides(filtered);
    });

    displayGuides(guides);
}

document.addEventListener("DOMContentLoaded", function () {

    // Sirf LocalSupport.html page pe chale
    if (!window.location.pathname.includes("LocalSupport.html")) return;

    const supports = [
        // { name: "Mewar Haveli", img: "./Rajasthan-cities/mewar-Haveli-gangur-ghar.jpg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Dreamyard Hotel", img: "./Rajasthan-cities/dreamyard-hotel.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Hadoti Palace Bundi", img: "./Rajasthan-cities/Hadoti-Palace-Bundi.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Zostel Bundi", img: "./Rajasthan-cities/Zostel-Bundi.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Dev Niwas Hotel", img: "./Rajasthan-cities/Dev-Niwas-Hotel.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        { name: "Royal  Art Emporium", img: "./Rajasthan-cities/ROyal-Art-Emporium.jpeg", desc: " Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        { name: "Raju's Fashion Mall", img: "./Rajasthan-cities/clothes.jpeg", desc: "Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Zostel Jodhpur", img: "./Rajasthan-cities/zostel-jodhpur.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "Kalinga Hotel", img: "./Rajasthan-cities/Kalinga-Hotel.jpg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "pushkar mantra resort", img: "./Rajasthan-cities/pushkar-mantra-resort.jpeg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        // { name: "The Sunrise Resort", img: "./Rajasthan-cities/the-Sunrise-Resort.jpg",desc:"Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        { name: "Pushkar Main Market", img: "./Rajasthan-cities/Pushkar-Main-Market.jpg", desc: "Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        { name: "Ram ji ki Dukaan", img: "./Rajasthan-cities/Ram-ji-ki-Dukaan.jpeg", desc: "Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" },
        { name: "Gulab Halwa Wala", img: "./Rajasthan-cities/Gulab-Halwa-Wala.jpeg", desc: "Location: 34-35 Lal Ghat Road Old City, Behind Jagdish Temple, Udaipur 313001 India" }
    ];

    const container = document.getElementById("localSupportWrapper");
    const searchInput = document.getElementById("localSearchBox");

    if (!container) {
        console.error("localSupportWrapper not found in HTML");
        return;
    }

    function displaySupports(data) {
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>No results found</p>";
            return;
        }

        data.forEach(place => {

            const card = document.createElement("div");
            card.classList.add("support-card");

            card.innerHTML = `
                <img src="${place.img}" alt="${place.name}">
                <div class="support-content">
                    <h3>${place.name}</h3>
                   <p>${place.desc}</p>
                    <button class="support-btn"
                        onclick="selectSupport('${place.name.toLowerCase()}')">
                        View
                    </button>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Random order on page load
    displaySupports([...supports].sort(() => 0.5 - Math.random()));

    // Search functionality (SAFE CHECK)
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const filtered = supports.filter(place =>
                place.name.toLowerCase().includes(value)
            );

            displaySupports(filtered);
        });
    } else {
        console.warn("localSearchBox not found in HTML");
    }

});

// ==============================
// NEXT BUTTON
// ==============================
function goToSummaryPage() {

    let selectedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];

    if (selectedCities.length === 0) {
        alert("Please select at least one city");
        return;
    }

    window.location.href = "summary.html";
}

// ==============================
// SUMMARY PAGE (UPDATED WORKING)
// ==============================
document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("summary.html")) return;

    const placesData = {

        jaipur: [
            { name: "SAMODE", img: "./Rajasthan-cities/samode.png" },
            { name: "Amber Palace", img: "./Rajasthan-cities/amber.jpg" },
            { name: "City Palace", img: "./Rajasthan-cities/city-palace.jpeg" },
            { name: "Jantar Mantar", img: "./Rajasthan-cities/jantar-mantar.jpg" },
            { name: "Hawa Mahal", img: "./Rajasthan-cities/Hawa-mahal.jpg" },
            { name: "Albert Hall Museum", img: "./Rajasthan-cities/Albert-Museum.jpg" },
            { name: "Nahargarh Fort", img: "./Rajasthan-cities/Nahargarh-fort.jpg" },
            { name: "Jaigarh Fort", img: "./Rajasthan-cities/Jaigarh-fort.jpg" },
            { name: "Birla Temple", img: "./Rajasthan-cities/Birla-Temple.jpg" },
            { name: "Gaitore", img: "./Rajasthan-cities/Gortire.jpg" },
            { name: "Sisodia Rani Palace And Garden", img: "./Rajasthan-cities/sisodia-rani-palace.jpg" },
            { name: "Galtaji", img: "./Rajasthan-cities/Galta-ji.jpg" },
            { name: "Amar Jawan Jyoti", img: "./Rajasthan-cities/Amar-Jawan-jyoti.jpg" },
            { name: "Jawahar Cicle", img: "./Rajasthan-cities/Jawahar-circle.jpg" },
            { name: "Jaipur Wax Museum", img: "./Rajasthan-cities/Jaipur-wax-museum.jpg" },
        ],

        jodhpur: [
            { name: "Mehrangarh Fort", img: "./Rajasthan-cities/mehrangarh-fort.jpg" },
            { name: "Umaid Bhawan Palace", img: "./Rajasthan-cities/Umaid-Bhawan.jpg" },
            { name: "Chamunda Mata ji Temple", img: "./Rajasthan-cities/chamunda-Mataji.jpg" },
            { name: "Ranisar & Padamsar", img: "./Rajasthan-cities/Ranisagar&Padamsar.jpg" },
            { name: "Ghanta Ghar", img: "./Rajasthan-cities/ghanta-ghar.jpg" },
            { name: "Mandore", img: "./Rajasthan-cities/Mandore.jpg" },
            { name: "Balsamand Lake", img: "./Rajasthan-cities/balsamand-lake.jpg" }
        ],

        bikaner: [
            { name: "Laxmi Niwas Palace", img: "./Rajasthan-cities/Laxmi-Niwas-palace.jpg" },
            { name: "Deshnok Karni Mata Temple", img: "./Rajasthan-cities/Karni-Mata-Temple.jpg" },
            { name: "Gajner Palace And Lake", img: "./Rajasthan-cities/Gajner-Palace-and-Lake.jpg" },
            { name: "Devi Kund", img: "./Rajasthan-cities/devi-Kund.jpg" },
            { name: "Raisar Dunes", img: "./Rajasthan-cities/Raisar-Dunes.jpg" }
        ],

        bundi: [
            { name: "Bundi Palace", img: "./Rajasthan-cities/Garh_Palace_1.jpg" },
            { name: "Sukh Mahal", img: "./Rajasthan-cities/Sukh_Mahal_1.jpeg" },
            { name: "Kshar Bagh", img: "./Rajasthan-cities/Kshar_Bagh_1.png" },
            { name: "Taragarh Fort", img: "./Rajasthan-cities/Taragarh_Fort_1.jpeg" },
            { name: "Pillared Cenotaph", img: "./Rajasthan-cities/84_Pillared_Cenotaph_1.jpeg" },
            { name: "Lake Jait Sagar", img: "./Rajasthan-cities/Lake_Jait_Sagar_1.jpeg" },
            { name: "Bhimlat Water Fall", img: "./Rajasthan-cities/Bhimlat_Waterfall_1.jpeg" },
            { name: "Lake Nawal Sagar", img: "./Rajasthan-cities/Lake_Nawal_Sagar_1.jpeg" }
        ],


        pushkar: [
            { name: "Brahma Temple", img: "./Rajasthan-cities/Brahma_Temple_1.jpeg" },
            { name: "Pushkar Lake", img: "./Rajasthan-cities/Pushkar_Lake_1.jpeg" },
            { name: "Gau Ghat", img: "./Rajasthan-cities/Gau_Ghat_1.jpeg" },
            { name: "Varaha Ghat", img: "./Rajasthan-cities/Varaha_Ghat_1.jpeg" },
            { name: "Gayatri Mata Temple", img: "./Rajasthan-cities/Gayatri_Mata_Temple_1.jpeg" },
            { name: "Man  Mahal", img: "./Rajasthan-cities/Man_Mahal_1.jpeg" },
            { name: "Pushkar Bazzer", img: "./Rajasthan-cities/Pushkar_Bazaar_1.jpeg" },
            { name: "Savitri Mata Temple", img: "./Rajasthan-cities/Savitri_Mata_Temple_1.jpeg" }
        ],

        chittorgarh: [
            { name: "Chittorgarh Fort", img: "./Rajasthan-cities/Chittorgrah-fort.jpeg" },
            { name: "Kirti Stambh", img: "./Rajasthan-cities/Kirti-Stambh.jpeg" },
            { name: "Rana Kumbha Palace", img: "./Rajasthan-cities/Rana_Kumbha_Palace.jpeg" },
            { name: "Vijay Stambh", img: "./Rajasthan-cities/Vijay-Stambh.jpeg" },
            { name: "Padmini's Palace", img: "./Rajasthan-cities/Padmini's-Palace.jpeg" },
            { name: "Fetch Prakash Palace", img: "./Rajasthan-cities/Fetch-Prakash-Palace.jpeg" },
            { name: "Kalika Mata Temple", img: "./Rajasthan-cities/Kalika-Mata-Temple.jpeg" },
            { name: "Meera Temple", img: "./Rajasthan-cities/Meera-Temple.jpeg" }
        ],


        udaipur: [
            { name: "Lake Palace", img: "./Rajasthan-cities/The-Lake-Palace.jpeg" },
            { name: "Fateh Sagar Lake", img: "./Rajasthan-cities/Fateh-Sagar-Lake.jpeg" },
            { name: "City Palace", img: "./Rajasthan-cities/City-Palace.jpeg" },
            { name: "Gulab Bagh and Zoo", img: "./Rajasthan-cities/Gulab-Bagh-and-zoo.jpeg" },
            { name: "Bada Mahal", img: "./Rajasthan-cities/Bada-Mahal.jpeg" },
            { name: "Ambrai Ghat", img: "./Rajasthan-cities/Ambrai-Ghat.jpeg" },
            { name: "Ganguar Ghat", img: "./Rajasthan-cities/Ganguar-Ghat.jpeg" },
            { name: "Udaipur Ghat", img: "./Rajasthan-cities/Udaipur_Ghat.jpeg" },
            { name: "Jagmandir Island Palace", img: "./Rajasthan-cities/The-Lake-Palace.jpeg" },
            { name: "Nehru Garden", img: "./Rajasthan-cities/Nehru-Garden.jpeg" },
            { name: "Bahubali Hills", img: "./Rajasthan-cities/Bahubli-Hills.jpeg" },
            { name: "Saheliyon Ki Badi", img: "./Rajasthan-cities/Saheliyon-ki-badi.jpeg" },
            { name: "Raita Hills", img: "./Rajasthan-cities/Raita-Hills.jpeg" },
            { name: "Hati pol bazzer", img: "./Rajasthan-cities/Hati-pol-bazzer.jpeg" },
        ],


        jaisalmer: [
            { name: "Jaisalmer Fort", img: "./Rajasthan-cities/Jaisalmer-Fort.jpeg" },
            { name: "Patwon Ki Haveli", img: "./Rajasthan-cities/Patwon-Ki-Haveli.jpeg" },
            { name: "Salim Singh Ki Haveli", img: "./Rajasthan-cities/Salim-Singh-Ki-Haveli.jpeg" },
            { name: "Nathmal Ji Ki Haveli", img: "./Rajasthan-cities/Nathmal-Ji-Ki-Haveli.jpeg" },
            { name: "Bada Bagh", img: "./Rajasthan-cities/Bada-Bagh.jpeg" },
            { name: "Tanot Mata Temple", img: "./Rajasthan-cities/Tanot-Mata-Temple.jpeg" },
            { name: "Ramdevra Temple", img: "./Rajasthan-cities/Ramdevra-Temple.jpeg" },
            { name: "Thar Desert", img: "./Rajasthan-cities/Thar-Desert.jpeg" },
            { name: "Jaisalmer War Museum", img: "./Rajasthan-cities/Jaisalmer_War_Museum.jpeg" }
        ]
    };

    let selectedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
    let container = document.getElementById("placesContainer");

    if (!container) return;

    container.innerHTML = "";

    let selectedPlaces = [];

    selectedCities.forEach(city => {

        if (!placesData[city]) return;

        placesData[city].forEach(place => {

            let card = document.createElement("div");
            card.classList.add("placecities");
            card.setAttribute("data-place", place.name);

            let img = document.createElement("img");
            img.src = place.img;
            img.alt = place.name;

            let title = document.createElement("h3");
            title.innerText = place.name;

            card.appendChild(img);
            card.appendChild(title);
            container.appendChild(card);

            // CLICK SELECTION SYSTEM
            card.addEventListener("click", function () {

                card.classList.toggle("selected-place");

                if (selectedPlaces.includes(place.name)) {
                    selectedPlaces = selectedPlaces.filter(p => p !== place.name);
                } else {
                    selectedPlaces.push(place.name);
                }

                localStorage.setItem("selectedPlaces", JSON.stringify(selectedPlaces));
            });

        });

    });

});


/* ================= HOTELS PAGE SCRIPT ================= */

document.addEventListener("DOMContentLoaded", function () {

    const hotelList = document.getElementById("hotel-list");

    if (hotelList) {   // sirf Hotels page pe hi chalega

        const hotels = [
            {
                name: "Dreamyard Hotel",
                location: "Lake Ghat Road Near Jagdish Temple,Udaipur 313001",
                price: "₹1,500 per night",
                image: "./Rajasthan-cities/dreamyard-hotel.jpeg"
            },
            {
                name: "Zostel Bundi",
                location: "Maaji Sahib ki Haveli,Opp. Purani Kotwali,Teerath,Bundi323001",
                price: "₹3,200 per night",
                image: "./Rajasthan-cities/Dev-Niwas-Hotel.jpeg"
            },
            {
                name: "Zostel jodhpur",
                location: "Airport road,Jodhpur,Rajasthan 3420011",
                price: "₹1,200 per night",
                image: "./Rajasthan-cities/zostel-jodhpur.jpeg"
            },

            {
                name: "Mewar Haveli",
                location: "Lal Ghat Road Old city,behind Jagdish Temple,Udaipur313001",
                price: "₹2,200 per night",
                image: "./Rajasthan-cities/mewar-Haveli-gangur-ghar.jpg"
            }
        ];

        hotels.forEach(hotel => {

            const hotelCard = document.createElement("div");
            hotelCard.classList.add("hotel-card");

            hotelCard.innerHTML = `
                <img src="${hotel.image}" alt="Hotel">
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p>${hotel.location}</p>
                    <p class="price">${hotel.price}</p>
                   
                </div>
            `;

            hotelList.appendChild(hotelCard);
        });

    }

});

function bookHotel(hotelName) {
    alert("You selected " + hotelName);
}

function goToHotels() {

    let selectedPlaces = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    if (selectedPlaces.length === 0) {
        alert("Please select at least one place");
        return;
    }

    window.location.href = "Hotels.html";
}



function goToView(name, img){
    const viewData = { name: name, img: img };
    localStorage.setItem("viewDestination", JSON.stringify(viewData));
    window.location.href = "View.html";
}
/* =========================
   VIEW PAGE SCRIPT (FINAL WORKING)
========================= */

document.addEventListener("DOMContentLoaded", function(){

    if(!window.location.pathname.includes("View.html")) return;

    const data = JSON.parse(localStorage.getItem("viewDestination"));

    if(!data){
        document.getElementById("viewTitle").innerText = "Destination Not Found";
        return;
    }

    // ===== BASIC DETAILS =====
    document.getElementById("viewTitle").innerText = data.name;
    document.getElementById("viewImage").src = data.img;

    // ===== DESCRIPTION DATA =====
   // ================= FULL RAJASTHAN DESCRIPTION DATA =================

const descriptionData = {

    // ================= JAIPUR =================
    "Samode Palace": "Samode Palace is a 475-year-old heritage palace located 40 km from Jaipur. It showcases royal Rajput architecture and offers cultural experiences like camel safaris and village tours.",

    "Amber Fort": "Amber Fort was built in 1592 by Raja Man Singh I. It is a UNESCO World Heritage Site known for its red sandstone structure, mirror work, carvings and views of Maota Lake.",

    "City Palace Jaipur": "City Palace Jaipur was built by Maharaja Sawai Jai Singh II and reflects Mughal-Rajput architecture. It houses royal museums displaying costumes, weapons and artifacts.",

    "Jantar Mantar": "Jantar Mantar is a UNESCO World Heritage astronomical observatory built by Sawai Jai Singh II. It consists of 16 large geometric instruments used for time and celestial measurements.",

    "Hawa Mahal": "Hawa Mahal was built in 1799 as a summer retreat for royal women. Its five-storey pink sandstone façade has 953 small windows called jharokhas.",

    "Albert Hall Museum": "Albert Hall Museum is Rajasthan’s oldest museum built in Indo-Saracenic style. It displays paintings, carpets, sculptures and historical artifacts.",

    "Nahargarh Fort": "Nahargarh Fort was built in 1734 and offers panoramic views of Jaipur. It includes Madhavendra Palace with royal suites.",

    "Jaigarh Fort": "Jaigarh Fort is famous for Jaiban, the world's largest cannon on wheels. It showcases strong military Rajput architecture.",

    "Birla Temple": "Birla Temple, built in 1988 using white marble, is dedicated to Lord Vishnu and Goddess Lakshmi. It looks stunning when illuminated at night.",

    "Jal Mahal": "Jal Mahal is a palace located in the middle of Man Sagar Lake. It appears to float on water and is one of Jaipur’s most scenic attractions.",

    "Galtaji": "Galtaji is an ancient pilgrimage site known as the Monkey Temple. It features sacred water tanks and natural springs.",

    "Jaipur Wax Museum": "Jaipur Wax Museum, located inside Nahargarh Fort, displays lifelike wax statues of Indian and international personalities.",


    // ================= BUNDI =================
    "Garh Palace": "Garh Palace in Bundi is a historic hilltop palace built between the 16th and 18th centuries. It is famous for Chitrashala miniature paintings and Rajput architecture.",

    "Sukh Mahal": "Sukh Mahal is a small summer retreat palace near a lake in Bundi. It is believed that Rudyard Kipling wrote part of his novel Kim here.",

    "Taragarh Fort": "Taragarh Fort, built in 1354, stands on a hilltop and offers panoramic views of Bundi. It reflects classic Rajput architecture.",

    "Pillared Cenotaph": "The 84 Pillared Cenotaph in Bundi was built by Rao Anirudh and is supported by 84 intricately carved pillars.",

    "Lake Jait Sagar": "Lake Jait Sagar is a scenic lake surrounded by hills in Bundi. It is famous for lotus blooms during monsoon.",

    "Lake Nawal Sagar": "Lake Nawal Sagar is an artificial lake in Bundi with a temple of Lord Varun Dev located in the center.",

    "Bhimlat Waterfall": "Bhimlat Waterfall is located 38 km from Bundi. The waterfall drops from 150 feet and is best visited during monsoon.",


    // ================= CHITTORGARH =================
    "Chittorgarh Fort": "Chittorgarh Fort is one of India’s largest forts built in the 7th century. It symbolizes Rajput bravery and sacrifice.",

    "Kirti Stambh": "Kirti Stambh is a 12th century Jain monument dedicated to Adinath. It features detailed stone carvings.",

    "Rana Kumbha Palace": "Rana Kumbha Palace is the largest palace inside Chittorgarh Fort and is associated with Rani Padmini and Meera Bai.",

    "Vijay Stambh": "Vijay Stambh was built in 1448 by Rana Kumbha to celebrate victory. It is 37 meters high and has nine storeys.",

    "Padmini's Palace": "Padmini’s Palace is associated with the legend of Rani Padmini and is located beside a lotus pool inside the fort.",

    "Kalika Mata Temple": "Kalika Mata Temple is an ancient temple dedicated to Goddess Durga inside Chittorgarh Fort.",

    "Meera Temple": "Meera Temple is dedicated to saint-poet Meera Bai and reflects simple Rajput architecture.",


    // ================= JAISALMER =================
    "Jaisalmer Fort": "Jaisalmer Fort, built in 1156 AD, is known as Sonar Quila. It is one of the few living forts in the world.",

    "Patwon Ki Haveli": "Patwon Ki Haveli is a complex of five havelis built in the 19th century with detailed sandstone carvings.",

    "Salim Singh Ki Haveli": "Salim Singh Ki Haveli is known for its peacock-shaped roof and beautiful balconies.",

    "Nathmal Ji Ki Haveli": "Nathmal Ji Ki Haveli was built in the 19th century and reflects Rajput and Islamic architecture.",

    "Bada Bagh": "Bada Bagh is a garden complex with royal cenotaphs built in memory of Jaisalmer rulers.",

    "Tanot Mata Temple": "Tanot Mata Temple is located near the India-Pakistan border and is associated with the 1965 and 1971 wars.",

    "Jaisalmer War Museum": "Jaisalmer War Museum showcases Indian Army history and displays tanks, weapons and war memorabilia.",

    "Thar Desert": "The Thar Desert offers camel safaris, desert camps, folk music and unforgettable sunset experiences.",


    // ================= JODHPUR =================
    "Mehrangarh Fort": "Mehrangarh Fort was built in 1459 by Rao Jodha and stands 400 feet above Jodhpur. It houses royal museums.",

    "Umaid Bhawan Palace": "Umaid Bhawan Palace is one of the largest private residences in the world and now functions as a luxury hotel and museum.",

    "Chamunda Mata Temple": "Chamunda Mata Temple is located inside Mehrangarh Fort and is dedicated to Goddess Durga.",

    "Mandore Garden": "Mandore was the ancient capital of Marwar and is famous for its red sandstone cenotaphs.",

    "Balsamand Lake": "Balsamand Lake was built in 1159 AD and is a scenic picnic and photography spot.",


    // ================= PUSHKAR =================
    "Brahma Temple": "Brahma Temple in Pushkar is one of the few temples dedicated to Lord Brahma and is an important pilgrimage site.",

    "Pushkar Lake": "Pushkar Lake is a sacred lake surrounded by 52 ghats where devotees perform rituals and holy baths.",

    "Gau Ghat": "Gau Ghat is a sacred ghat at Pushkar Lake associated with religious rituals.",

    "Varaha Ghat": "Varaha Ghat is named after Lord Vishnu’s Varaha avatar and is important for spiritual cleansing rituals.",

    "Gayatri Mata Temple": "Gayatri Mata Temple is located on a hilltop and offers panoramic views of Pushkar town.",

    "Man Mahal": "Man Mahal was built in the 17th century by Raja Man Singh as a royal guest house and now serves as a heritage property.",

    "Pushkar Bazaar": "Pushkar Bazaar is a vibrant market known for handicrafts, jewelry, leather items and souvenirs.",

    "Savitri Mata Temple": "Savitri Mata Temple is located on a hilltop and offers stunning sunrise and sunset views.",


    // ================= UDAIPUR =================
    "City Palace Udaipur": "City Palace Udaipur was begun in 1559 by Maharana Udai Singh II. It overlooks Lake Pichola and features marble balconies and courtyards.",

    "Fateh Sagar Lake": "Fateh Sagar Lake is surrounded by Aravalli Hills and is popular for boating and sunset views.",

    "Gulab Bagh and Zoo": "Gulab Bagh is the largest public garden in Udaipur and includes a zoo and historic library.",

    "Bada Mahal": "Bada Mahal is located within City Palace and is known for its elevated garden structure.",

    "Ambrai Ghat": "Ambrai Ghat offers stunning views of Lake Pichola, City Palace and Jag Mandir.",

    "Gangaur Ghat": "Gangaur Ghat is a historic lakeside ghat used for cultural festivals and rituals.",

    "Jagmandir Island Palace": "Jagmandir Palace is located on an island in Lake Pichola and served as a royal summer retreat.",

    "Nehru Garden": "Nehru Garden is an island garden located in Fateh Sagar Lake and is popular for relaxation and boating.",

    "Bahubali Hills": "Bahubali Hills is a scenic hilltop viewpoint near Badi Lake offering panoramic views.",

    "Saheliyon Ki Bari": "Saheliyon Ki Bari is an 18th century garden built for royal ladies featuring fountains and lotus pools.",

    "Raita Hills": "Raita Hills is a peaceful hill area near Udaipur known for sunrise and sunset views."
};

    document.getElementById("viewDescription").innerText =
        descriptionData[data.name] || "No description available for this destination.";

    // ===== GUIDE DATA =====
    const guidesData = {
        "Jaigarh Fort": [
            { name: "Arjun Singh", rating: "4.7" }
        ],
        "Amber Fort": [
            { name: "Ramesh Sharma", rating: "4.8" }
        ]
    };

    const guideContainer = document.querySelector(".placeview-guides");

    if(guideContainer){
        guideContainer.innerHTML = `<h2 class="placeview-subtitle">Verified Guides</h2>`;

        if(guidesData[data.name]){
            guidesData[data.name].forEach(guide => {

                const card = document.createElement("div");
                card.classList.add("placeview-guide-card");

                card.innerHTML = `
                    <div class="placeview-guide-top">
                        <strong>${guide.name}</strong>
                        <span class="placeview-rating">${guide.rating} ★</span>
                    </div>
                    <a href="#" class="placeview-request">Request</a>
                `;

                guideContainer.appendChild(card);
            });
        } else {
            guideContainer.innerHTML += "<p>No guides available.</p>";
        }
    }

    // ===== HOTEL DATA =====
    const hotelData = {

        "Jaigarh Fort": [
            { name: "Pink Palace Hotel", rating: "4.6", location: "Amer Road" }
        ],

        "Amber Fort": [
            { name: "Jaipur Heritage Stay", rating: "4.3", location: "Old City Jaipur" }
        ]
    };

    const hotelContainer = document.querySelector(".placeview-local");

    if(hotelContainer){
        hotelContainer.innerHTML = `<h2 class="placeview-subtitle">Available Hotels</h2>`;

        if(hotelData[data.name]){
            hotelData[data.name].forEach(hotel => {

                const card = document.createElement("div");
                card.classList.add("placeview-guide-card");

                card.innerHTML = `
                    <div class="placeview-guide-top">
                        <strong>${hotel.name}</strong>
                        <span class="placeview-rating">${hotel.rating} ★</span>
                    </div>
                    <p style="margin-top:8px;color:#4a5568;text-align:left;">
                        ${hotel.location}
                    </p>
                `;

                hotelContainer.appendChild(card);
            });
        } else {
            hotelContainer.innerHTML += "<p>No hotels available.</p>";
        }
    }

});