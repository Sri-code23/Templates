document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const popupBody = document.getElementById('popup-body');
    const closePopup = document.getElementById('close-popup');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    }

    // Mobile menu toggle
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Popup functionality
    const projectItems = document.querySelectorAll('.project-item');
    const blogItems = document.querySelectorAll('.blog-item');

    function showPopup(content) {
        popupBody.innerHTML = content;
        popupOverlay.classList.remove('hidden');
        popupContent.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closePopupHandler() {
        popupOverlay.classList.add('hidden');
        popupContent.classList.add('hidden');
        document.body.style.overflow = '';
    }

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const content = getProjectContent(projectId);
            showPopup(content);
        });
    });

    blogItems.forEach(item => {
        item.addEventListener('click', () => {
            const blogId = item.getAttribute('data-blog');
            const content = getBlogContent(blogId);
            showPopup(content);
        });
    });

    closePopup.addEventListener('click', closePopupHandler);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopupHandler();
        }
    });

    // Sample content for projects and blog posts
    function getProjectContent(projectId) {
        const projectContents = {
            project1: `
                <div class="popupcontent">
                <img src="assets/library_py.jpg" alt="Project 1" class="popup-image">
                <h2>QuotesEngine - Python library</h2>
                <p>Created a Python library for generating quotes,
                            providing features like random quote generation.
                            published on PyPI and used by multiple users.
                            The library includes features like quote categories and more.
                            This project demonstrates expertise in Python development, 
                            library creation and object-oriented design.
                    <div class="popup-links">
                        <a href="https://github.com/Sri-code23/PROJECT/tree/master/Library_project" style="color: rgb(6, 48, 42); text-decoration: none; text-align:center;" target="_blank">
                        <button class="view_button"><b>GitHub Repository</b><button></a>
                    </div>
                </div>
            `,
            project2: `
            <div class="popupcontent">
                <img src="assets/factory.jpeg" alt="Project 2" class="popup-image">
                <h2>Smart Air Quality Management System</h2>
                <p>Developed an IoT- based solution to monitor air quality in industrial environments.
                            The system collects and analyzes data from various sensors, 
                            including temperature, humidity, and air quality, to provide real-time insights and display the information locally and remotely through the Blynk app.
                            This project demonstrates expertise in IoT development, data analysis, and communication.
                <div class="popup-links">
                    <a href="" style="color: rgb(6, 48, 42);text-decoration: none;" style="text-align: center;" target="_blank">
                    <button class="view_button" ><b>GitHub Repository</b><button></a>
                </div>
            </div>
            `,
            project3: `
            <div class="popupcontent">
                <img src="assets/blog_safety.jpg" alt="Project 3" class="popup-image">
                <h2>Counter with overload Alert System</h2>
                <p>Designed and implemented an automated system to monitor item counts in real-time. 
                            The system triggers an alert when the count exceeds a predefined threshold, 
                            ensuring operational efficiency and safety. 
                            This project demonstrates expertise in hardware integration and automation.
                <div class="popup-links">
                    <a href="" style="color: rgb(6, 48, 42); text-decoration: none; text-align: center;" target="_blank">
                    <button class="view_button" ><b>GitHub Repository</b><button></a>
                </div>
            </div>
            `
        };
        return projectContents[projectId] || '<p>Project details not found.</p>';
    }

    function getBlogContent(blogId) {
        const blogContents = {
            blog1: `
            <div class="popup-links">
                <img src="assets/python_blog.jpg" alt="Blog 1" class="popup-image">
                <h2>The Journey of Building My First Python Library – QuotesEngine</h2>
                <p>As a passionate programmer, I have always sought opportunities to create something unique and useful. This drive led me to develop QuotesEngine, my very first Python library. The journey was challenging yet incredibly fulfilling, as it allowed me to combine creativity with technical expertise.

                <h3>Development Process:</h3>
                The idea for QuotesEngine stemmed from my love for inspirational quotes. I envisioned a library that could generate, manage, and retrieve quotes programmatically. Using Python's robust features, I focused on making the library intuitive and versatile for developers. Publishing it on PyPI was a significant milestone, ensuring accessibility to a broader audience.

                <h3>Reflection:</h3>
                This project was more than just coding; it was about perseverance and learning. It introduced me to the world of open-source development and inspired me to contribute more in the future.
                </p>
            </div>
            `,
            blog2: `
            <div class="popup-links">
                <img src="assets/blog_board.jpg" alt="Blog 2" class="popup-image">
                <h2>Innovating Safety in Industries – The Counter with Overload Alert System</h2>
                <p><h3>Introduction:</h3>
                Industrial safety is a critical concern, and I wanted to address it through an innovative project during my academic journey. This led to the creation of the Counter with Overload Alert System, a solution aimed at improving efficiency and safety in industrial operations.

                <h3>How It Works:</h3>
                The system automatically tracks the count of items and triggers an alert when an overload is detected. It leverages sensors and a microcontroller to ensure precision and reliability. This project taught me the importance of integrating software and hardware seamlessly.

                <h3>Impact:</h3>
                The project was well-received by external evaluators for its practicality and potential real-world applications. It remains a testament to my problem-solving abilities and passion for developing impactful solutions.
                </p>
                    
                </div>
            `,
            blog3: `
            <div class="popup-links">
                <img src="assets/iot_board.jpg" alt="Blog 3" class="popup-image">
                <h2>Embracing IoT – The Smart Air Quality Management System</h2>
                <p><h3>Introduction:</h3>
                The rise of IoT has opened doors to countless possibilities, and I wanted to explore this realm through a meaningful project. The Smart Air Quality Management System is one of my proudest achievements, addressing the need for real-time environmental monitoring in industries.
                <h3>The Solution:</h3>
                Using an ESP32 microcontroller and sensors like MQ4, I developed a system to monitor air quality and temperature. The data is displayed locally and remotely through the Blynk app, enabling users to take proactive measures to ensure safety.
                <h3>The Experience:</h3>
                This project expanded my knowledge of IoT, sensor integration, and remote monitoring. It also reinforced the importance of technology in creating sustainable and safe environments.
                </p>
                </div>
            `
        };
        return blogContents[blogId] || '<p>Blog post not found.</p>';
    }
});

