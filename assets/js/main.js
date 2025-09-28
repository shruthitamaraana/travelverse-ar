document.addEventListener("DOMContentLoaded", function() {

    // --- 1. SHARED COMPONENTS LOADER ---
    const loadHTML = (url, elementId, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok for " + url);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                    if (callback) callback();
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    };

    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#navbar-container .nav-link');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    };

    loadHTML('partials/navbar.html', 'navbar-container', setActiveNavLink);
    loadHTML('partials/footer.html', 'footer-container');
    // ... after loadHTML('partials/footer.html', 'footer-container'); ...
    

    // --- DYNAMIC HOMEPAGE FEATURES (for index.html) ---
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        // Animated Statistics Counter
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; 

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;

            const updateCount = () => {
                const increment = target / speed;
                count += increment;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };
        
        // Use Intersection Observer to trigger animation on scroll
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Newsletter Form Logic
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const feedbackEl = document.getElementById('newsletter-feedback');
            
            if (emailInput.value && emailInput.checkValidity()) {
                feedbackEl.innerHTML = `<div class="alert alert-success">Thank you for subscribing!</div>`;
                emailInput.value = '';
            } else {
                feedbackEl.innerHTML = `<div class="alert alert-danger">Please enter a valid email address.</div>`;
            }
        });
    }

// ... your other JavaScript logic for the map, quests, etc. continues here ...

    // --- MASTER DATA REPOSITORY ---
    const quests = [
        { 
            id: 1, 
            title: "The Mughal Marvel", 
            description: "Visit the Taj Mahal and solve the architect's riddle.", 
            points: 50, 
            difficulty: "Easy", 
            status: "active",
            url: "quest-detail.html",
            youtubeEmbedUrl: "https://www.youtube.com/embed/_bMyBoaHg5w?si=XcrkeAbTPdIdx3f_",
            story: "The Taj Mahal, an ivory-white marble mausoleum in Agra, was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. It is the jewel of Muslim art in India and a universally admired masterpiece of the world's heritage.",
            quiz: [
                { question: "Who is credited as the main architect of the Taj Mahal?", options: ["Shah Jahan", "Ustad Ahmed Lahori", "Mumtaz Mahal"], correctAnswer: "Ustad Ahmed Lahori" },
                { question: "The Taj Mahal is located on the bank of which river?", options: ["Ganges", "Jhelum", "Yamuna"], correctAnswer: "Yamuna" },
                { question: "What material is the Taj Mahal primarily built from?", options: ["Sandstone", "Ivory-white marble", "Granite"], correctAnswer: "Ivory-white marble" }
            ]
        },
        { 
            id: 2, 
            title: "Echoes of Hampi", 
            description: "Find 3 hidden symbols in the Virupaksha Temple virtual tour.", 
            points: 100, 
            difficulty: "Medium", 
            status: "active",
            url: "quest-detail.html",
            youtubeEmbedUrl: "https://www.youtube.com/embed/Ra3GuXXjAL8?si=DifsukBZy4n6UqhZ", 
            story: "Hampi, a UNESCO World Heritage Site, was the capital of the Vijayanagara Empire. The Virupaksha Temple, dedicated to Lord Shiva, is one of the oldest and most prominent structures in the complex, known for its intricate carvings and towering gopuram.",
            quiz: [
                { question: "The Virupaksha Temple is dedicated to which deity?", options: ["Vishnu", "Brahma", "Shiva"], correctAnswer: "Shiva" },
                { question: "Hampi is located on the banks of which river?", options: ["Tungabhadra", "Kaveri", "Krishna"], correctAnswer: "Tungabhadra" }
            ]
        },
        { 
            id: 3, 
            title: "Secrets of the Sun Temple", 
            description: "Explore the mysteries of the great chariot.", 
            points: 200, 
            difficulty: "Hard", 
            status: "active",
            url: "quest-detail.html",
            youtubeEmbedUrl: "https://www.youtube.com/embed/HpTKUTmV1WI?si=OS3_IkFlFLVtg2IT",
            story: "The Konark Sun Temple, a 13th-century CE Sun Temple at Konark in Odisha, is a UNESCO World Heritage Site. It is a monumental example of Kalinga architecture, also known as the Black Pagoda, built by King Narasimhadeva I of the Eastern Ganga Dynasty.",
            quiz: [
                { question: "Which deity is the Konark Sun Temple dedicated to?", options: ["Vishnu", "Surya (Sun God)", "Brahma"], correctAnswer: "Surya (Sun God)" }
            ]
        },
        { 
            id: 4, 
            title: "Hanging Pillar of Lepakshi", 
            description: "Discover the mystery behind the gravity-defying pillar at Lepakshi.", 
            points: 150, 
            difficulty: "Medium", 
            status: "active",
            url: "quest-detail.html",
            youtubeEmbedUrl: "https://www.youtube.com/embed/_bMyBoaHg5w",
            story: "The Veerabhadra Temple at Lepakshi in Andhra Pradesh is famous for its architectural and sculptural beauty, particularly the 'Hanging Pillar'. This pillar hangs from the ceiling without any support at its base, a marvel of ancient Indian engineering.",
            quiz: [
                { question: "What is special about the main pillar in the Lepakshi temple?", options: ["It is made of gold", "It sings ancient hymns", "It hangs without support"], correctAnswer: "It hangs without support" },
                { question: "In which Indian state is the Lepakshi temple located?", options: ["Karnataka", "Tamil Nadu", "Andhra Pradesh"], correctAnswer: "Andhra Pradesh" }
            ]
        }
    ];
    const leaderboard = [
        { rank: 1, name: "Explorer_Ravi", points: 1450 },
        { rank: 2, name: "Heritage_Priya", points: 1280 },
        { rank: 3, name: "History_Amit", points: 1100 },
        { rank: 4, name: "Wanderer_Anika", points: 950 },
        { rank: 5, name: "Culture_Leo", points: 870 }
    ];
    const puzzleData = {
        title: "The Hampi Treasure Hunt",
        intro: "Find the hidden details in the Virupaksha Temple complex. Click on the correct part of the image to solve each clue.",
        image: "assets/images/hampi-puzzle.jpg",
        completionMessage: "Congratulations! You've solved the puzzle and earned 150 points!",
        clues: [
            { id: 1, text: "Find the main tower, or Gopuram. It is the most prominent structure.", target: { top: '10%', left: '25%', width: '50%', height: '70%' } },
            { id: 2, text: "Find the group of pilgrims entering the temple's main gateway.", target: { top: '80%', left: '45%', width: '20%', height: '15%' } },
            { id: 3, text: "Find the smaller, less ornate structure to the left of the main entrance.", target: { top: '70%', left: '5%', width: '25%', height: '25%' } }
        ]
    };

    // --- 2. INTERACTIVE MAP LOGIC ---
    const mapElement = document.getElementById('india-map');
    if (mapElement) {
        // Data for all states is now restored
        const siteData = {
            "andaman_and_nicobar_1_": { title: "Heritage of Andaman & Nicobar", story: "Explore the colonial history of the Cellular Jail and the rich tribal heritage of these pristine islands.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "andhra_pradesh_1_": { title: "Heritage of Andhra Pradesh", story: "Home to sites like the Tirupati Temple and ancient Buddhist remains at Amaravati.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "arunachal_pradesh_1_": { title: "Heritage of Arunachal Pradesh", story: "Discover the 'Land of the Dawn-lit Mountains', with its diverse tribal cultures and the historic Tawang Monastery.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "assam_1_": { title: "Heritage of Assam", story: "Known for its lush tea gardens, the mighty Brahmaputra river, and the spiritual significance of the Kamakhya Temple.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "bihar_1_": { title: "Heritage of Bihar", story: "Discover the historic lands of Bihar, home to the ancient Nalanda University and the spiritual heartland of Buddhism.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "chandigarh_1_": { title: "Heritage of Chandigarh", story: "Explore the modernist architecture of Le Corbusier in India's first planned city.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "chhattisgarh_1_": { title: "Heritage of Chhattisgarh", story: "Known for its ancient caves, majestic waterfalls, and the rich traditions of its many indigenous communities.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "dadra_and_nagar_haveli_1_": { title: "Heritage of Dadra & Nagar Haveli and Daman & Diu", story: "A blend of Portuguese colonial charm and tribal culture, featuring historic forts and serene beaches.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "delhi_ncr_1_": { title: "Heritage of Delhi", story: "A city of cities, Delhi's heritage includes Mughal masterpieces like the Red Fort and Humayun's Tomb.", model: null,video: "https://www.youtube.com/embed/_bMyBoaHg5w" },
            "Goa_1_": { title: "Heritage of Goa", story: "Explore the historic churches and convents of Goa, a UNESCO World Heritage site.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "gujarat_1_": { title: "Heritage of Gujarat", story: "Discover the architectural wonders of the Rani ki vav stepwell and the ancient Harappan city of Lothal.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "haryana_1_": { title: "Heritage of Haryana", story: "The historic land of the Mahabharata, Haryana holds ancient archaeological sites like Rakhigarhi.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "himachal_pradesh_1_": { title: "Heritage of Himachal Pradesh", story: "Nestled in the Himalayas, its heritage is rich with colonial architecture in Shimla and ancient Tibetan monasteries.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "jammu_and_kashmir_1_": { title: "Heritage of Jammu & Kashmir", story: "Often called 'Paradise on Earth', its heritage shines through its Mughal gardens and houseboats on Dal Lake.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "jharkhand_1_": { title: "Heritage of Jharkhand", story: "Explore the rich tribal culture, ancient temples, and the natural beauty of the 'Land of Forests'.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "Karnataka_1_": { title: "Heritage of Karnataka", story: "From the grand ruins of Hampi to the majestic palaces of Mysuru, Karnataka is a treasure trove of ancient empires.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "Kerala_1_": { title: "Heritage of Kerala", story: "Known as 'God's Own Country', Kerala's heritage is rich with serene backwaters and vibrant Kathakali dance forms.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "ladakh_1_": { title: "Heritage of Ladakh", story: "The 'Land of High Passes' is famed for its breathtaking landscapes and ancient Buddhist monasteries (gompas).", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "lakshadweep_1_": { title: "Heritage of Lakshadweep", story: "A tropical archipelago with a unique heritage tied to the sea, featuring pristine coral reefs.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "madhya_pradesh_1_": { title: "Heritage of Madhya Pradesh", story: "The 'Heart of India', home to the Khajuraho temples and the Buddhist stupas of Sanchi.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "maharashtra_1_": { title: "Heritage of Maharashtra", story: "From the rock-cut Ajanta and Ellora Caves to the formidable sea forts of the Maratha Empire.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "manipur_1_": { title: "Heritage of Manipur", story: "The 'Jewel of India', known for its classical Manipuri dance and the unique floating islands of Loktak Lake.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "meghalaya_1_": { title: "Heritage of Meghalaya", story: "The 'Abode of Clouds', famed for its living root bridges and matrilineal societies.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "mizoram_1_": { title: "Heritage of Mizoram", story: "Experience the vibrant culture of the Mizo people through their traditional bamboo dance (Cheraw).", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "nagaland_1_": { title: "Heritage of Nagaland", story: "A land of vibrant festivals and diverse warrior tribes, celebrated at the annual Hornbill Festival.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "odisha_1_": { title: "Heritage of Odisha", story: "Discover the architectural brilliance of the Konark Sun Temple and the spiritual aura of the Jagannath Temple in Puri.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "puducherry_1_": { title: "Heritage of Puducherry", story: "Discover the unique Franco-Tamil culture of Puducherry, its serene ashrams, and charming colonial architecture.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "punjab_1_": { title: "Heritage of Punjab", story: "The land of five rivers, its heritage is defined by the spiritual sanctity of the Golden Temple.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "rajasthan_1_": { title: "Heritage of Rajasthan", story: "Explore the majestic forts, opulent palaces, and vibrant culture of Rajasthan, the land of kings.", model: null,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "sikkim_1_": { title: "Heritage of Sikkim", story: "A Himalayan wonderland with stunning views of Kangchenjunga and serene Buddhist monasteries.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "Tamil_Nadu_1_": { title: "Heritage of Tamil Nadu", story: "Home to ancient Dravidian civilization, boasting towering temple gopurams and the classical dance of Bharatanatyam.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "telangana_1_": { title: "Heritage of Telangana", story: "Discover Telangana's history through the Kakatiya dynasty's Thousand Pillar Temple and the iconic Charminar.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "tripura_1_": { title: "Heritage of Tripura", story: "A land of royal palaces like Ujjayanta Palace, ancient rock carvings, and rich bamboo craftsmanship.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "uttar_pradesh_1_": { title: "Heritage of Uttar Pradesh", story: "The heartland of India, home to the iconic Taj Mahal and the ancient city of Varanasi.", model: "assets/models/taj_mahal.glb",video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb" },
            "uttaranchal_1_": { title: "Heritage of Uttarakhand", story: "Known as 'Devbhumi' or the 'Land of the Gods', with pilgrimage sites like Haridwar and Rishikesh.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"},
            "west_bengal_1_": { title: "Heritage of West Bengal", story: "A land of poets and artists, its heritage spans from the colonial grandeur of Kolkata to the terracotta temples of Bishnupur.", model: null ,video: "https://www.youtube.com/embed/yyHRr-Seac8?si=3s-P_AN2r8PHzbxb"}
        };
        const siteModal = new bootstrap.Modal(document.getElementById('siteModal'));
        const modalTitle = document.getElementById('modalTitle');
        const modalStory = document.querySelector('#siteModal .modal-body p');
        const arLink = document.getElementById('ar-link');
        const allStates = mapElement.querySelectorAll('.state');

        allStates.forEach(state => {
            const stateId = state.id;
    const data = siteData[stateId];

    if (data) {
        // --- ADD THIS PART ---
        // This tells Bootstrap to create a tooltip for this state
        state.setAttribute('data-bs-toggle', 'tooltip');
        state.setAttribute('data-bs-placement', 'top'); // Position of the tooltip
        state.setAttribute('title', data.title); // The text inside the tooltip
            state.addEventListener('click', () => {
                const stateId = state.id;
                const data = siteData[stateId];
                if (data) {
                    modalTitle.innerText = data.title;
                    modalStory.innerText = data.story;

// 🔽 Add video injection here
const videoWrapper = document.getElementById('modalVideoWrapper');
if (data.video) {
  if (data.video.includes("youtube") || data.video.includes("vimeo")) {
    videoWrapper.innerHTML = `<iframe src="${data.video}" 
                                 frameborder="0" allowfullscreen 
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
  } else {
    videoWrapper.innerHTML = `<video controls style="width:100%; border-radius:8px;">
                                <source src="${data.video}" type="video/mp4">
                                Your browser does not support the video tag.
                              </video>`;
  }
} else {
  videoWrapper.innerHTML = `<div class="bg-light d-flex align-items-center justify-content-center" 
                               style="height:300px; border-radius:8px;">
                               <span class="text-muted">No video available</span>
                             </div>`;
}

                    if (data.model && arLink) {
                        arLink.classList.remove('disabled');
                        sessionStorage.setItem('selectedMonument', JSON.stringify(data));
                    } else if (arLink) {
                        arLink.classList.add('disabled');
                    }
                    siteModal.show();
                } else {
                    modalTitle.innerText = "Data Not Available";
                    modalStory.innerText = "Information for this state is coming soon!";
                    if (arLink) arLink.classList.add('disabled');
                    siteModal.show();
                }
            });
     } });
    }
    new bootstrap.Tooltip(document.body, { selector: "[data-bs-toggle='tooltip']" });

    // --- AR VIEWER PAGE LOGIC ---
    const monumentViewer = document.getElementById('monument-viewer');
    if (monumentViewer) {
        const monumentData = JSON.parse(sessionStorage.getItem('selectedMonument'));
        if (monumentData && monumentData.model) {
            document.getElementById('monument-title').innerText = `AR View: ${monumentData.title}`;
            monumentViewer.setAttribute('src', monumentData.model);
        } else {
            document.getElementById('monument-title').innerText = "No monument selected or model available.";
        }
    }

    // --- GAMIFICATION ZONE LOGIC ---
    const gamificationPage = document.getElementById('myTabContent');
    if (gamificationPage) {
        let currentClueIndex = 0;

        const renderQuests = () => {
            const container = document.getElementById('quests-tab-pane');
            if (!container) return;
            let content = `<h4 class="mt-2">Active Quests</h4><p>Complete these quests to earn points and unlock badges.</p><div class="list-group">`;
            quests.forEach(quest => {
                let statusClass = quest.status === 'locked' ? 'disabled' : '';
                let icon = quest.status === 'locked' ? '🔒' : '⚔️';
                content += `<a href="${quest.url || '#'}" class="list-group-item list-group-item-action ${statusClass}" data-quest-id="${quest.id}"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${icon} ${quest.title}</h5><small>+${quest.points} Points</small></div><p class="mb-1">${quest.description}</p><small>Difficulty: ${quest.difficulty}</small></a>`;
            });
            content += `</div>`;
            container.innerHTML = content;
            addQuestListeners();
        };

        const renderPuzzles = () => {
    const container = document.getElementById('puzzle-container');
    if (!container) return;
    
    container.innerHTML = `
      <h4 class="mt-2">🧩 Monument Puzzle Challenge</h4>
      <p>Test your skills by assembling a monument puzzle.</p>
      <a href="puzzle.html" class="btn btn-primary mt-2">Play Puzzle</a>
    `;
};


        const renderClue = (index) => {
            const cluesList = document.getElementById('clues-list');
            const imageWrapper = document.getElementById('puzzle-image-wrapper');
            if (!cluesList || !imageWrapper) return;
            if (index >= puzzleData.clues.length) {
                cluesList.innerHTML = `<div class="alert alert-success">${puzzleData.completionMessage}</div>`;
                imageWrapper.innerHTML = `<img src="${puzzleData.image}" alt="${puzzleData.title}">`;
                return;
            }
            const clue = puzzleData.clues[index];
            cluesList.innerHTML = `<p><strong>Clue ${index + 1}/${puzzleData.clues.length}:</strong></p><p>${clue.text}</p>`;
            imageWrapper.innerHTML = `<img src="${puzzleData.image}" alt="${puzzleData.title}">`;
            const hotspot = document.createElement('div');
            hotspot.className = 'hotspot';
            hotspot.style.top = clue.target.top;
            hotspot.style.left = clue.target.left;
            hotspot.style.width = clue.target.width;
            hotspot.style.height = clue.target.height;
            hotspot.addEventListener('click', () => {
                currentClueIndex++;
                renderClue(currentClueIndex);
            });
            imageWrapper.appendChild(hotspot);
        };

        const renderLeaderboard = () => {
            const container = document.getElementById('leaderboard-tab-pane');
            if (!container) return;
            let content = `<h4 class="mt-2">Top Explorers</h4><ul class="list-group">`;
            leaderboard.forEach(user => {
                content += `<li class="list-group-item d-flex justify-content-between align-items-center">${user.rank}. ${user.name}<span class="badge bg-primary rounded-pill">${user.points} pts</span></li>`;
            });
            content += `</ul>`;
            container.innerHTML = content;
        };

        const addQuestListeners = () => {
            document.querySelectorAll('a[data-quest-id]').forEach(item => {
                item.addEventListener('click', function(e) {
                    if (this.classList.contains('disabled')) {
                        e.preventDefault();
                        alert("This quest is locked! Complete other quests to increase your level.");
                        return;
                    }
                    const questId = this.getAttribute('data-quest-id');
                    sessionStorage.setItem('activeQuestId', questId);
                });
            });
        };

        const tabs = document.querySelectorAll('#myTab button');
        tabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', event => {
                const targetId = event.target.getAttribute('data-bs-target');
                if (targetId === '#quests-tab-pane') renderQuests();
                if (targetId === '#puzzles-tab-pane') renderPuzzles();
                if (targetId === '#leaderboard-tab-pane') renderLeaderboard();
            });
        });
        renderQuests();
    }

    // --- QUEST DETAIL PAGE LOGIC ---
    const questDetailPage = document.getElementById('quest-title');
    if (questDetailPage) {
        const activeQuestId = sessionStorage.getItem('activeQuestId');
        if (activeQuestId) {
            const questData = quests.find(q => q.id == activeQuestId);
            if (questData) renderQuestDetail(questData);
        }
    }

    function renderQuestDetail(quest) {
        let currentQuestionIndex = 0;
        document.getElementById('quest-title').innerText = quest.title;
        const arPlaceholder = document.getElementById('quest-ar-placeholder');
        if (quest.youtubeEmbedUrl) {
            arPlaceholder.innerHTML = `<div class="ratio ratio-16x9"><iframe src="${quest.youtubeEmbedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        } else {
            arPlaceholder.innerHTML = `<div class="ar-placeholder"></div>`;
        }
        document.getElementById('quest-story').innerHTML = `<p>${quest.story}</p>`;

        const renderQuizQuestion = (index) => {
            const quizContainer = document.getElementById('quiz-content');
            const currentQuiz = quest.quiz[index];
            if (!quizContainer || !currentQuiz) return;
            let quizHTML = `<h5>Quiz: ${currentQuiz.question}</h5>`;
            currentQuiz.options.forEach(option => {
                quizHTML += `<div class="quiz-option" data-answer="${option}">${option}</div>`;
            });
            quizHTML += `<div id="quiz-feedback" class="mt-3"></div>`;
            quizContainer.innerHTML = quizHTML;
            addQuizDetailListeners(quest, index);
        };

        const addQuizDetailListeners = (quest, index) => {
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    const selectedAnswer = this.getAttribute('data-answer');
                    const feedbackEl = document.getElementById('quiz-feedback');
                    const isCorrect = selectedAnswer === quest.quiz[index].correctAnswer;
                    if (isCorrect) {
                        if (index < quest.quiz.length - 1) {
                            feedbackEl.innerHTML = `<div class="alert alert-success">Correct! <button id="next-question" class="btn btn-sm btn-success float-end">Next Question</button></div>`;
                            document.getElementById('next-question').addEventListener('click', () => {
                                currentQuestionIndex++;
                                renderQuizQuestion(currentQuestionIndex);
                            });
                        } else {
                            feedbackEl.innerHTML = `<div class="alert alert-success">Quest Complete! You've earned ${quest.points} points and the "${quest.title}" badge!</div>`;
                        }
                    } else {
                        feedbackEl.innerHTML = `<div class="alert alert-danger">Not quite, try again!</div>`;
                    }
                });
            });
        };
        renderQuizQuestion(currentQuestionIndex);
    }

    // --- CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

