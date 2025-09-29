
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarCollapse.addEventListener('show.bs.collapse', () => {
    document.body.classList.add('menu-open');
});

navbarCollapse.addEventListener('hidden.bs.collapse', () => {
    document.body.classList.remove('menu-open');
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("showq");
        } else {
            entry.target.classList.remove('showq');
        }
    });
});


const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    // },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});
document.querySelectorAll('.ashish').forEach((el) => observer.observe(el));





//   form 
        // Calculator Functions
        function calculateBMI() {
            const height = document.getElementById('height').value;
            const weight = document.getElementById('weight').value;
            const result = document.getElementById('bmi-result');

            if (height && weight) {
                const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
                let category = '';
                let color = '';
                let recommendation = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    color = '#3b82f6';
                    recommendation = 'Consider consulting a nutritionist for healthy weight gain strategies.';
                } else if (bmi < 25) {
                    category = 'Normal';
                    color = '#10b981';
                    recommendation = 'Great! Maintain your healthy lifestyle with regular exercise and balanced diet.';
                } else if (bmi < 30) {
                    category = 'Overweight';
                    color = '#f59e0b';
                    recommendation = 'Consider a balanced diet and regular exercise. Consult our nutritionist for personalized plans.';
                } else {
                    category = 'Obese';
                    color = '#ef4444';
                    recommendation = 'We recommend consulting our specialists for a comprehensive health assessment and weight management plan.';
                }

                result.innerHTML = `
                    <strong style="color: ${color};">BMI: ${bmi} (${category})</strong><br>
                    <small style="margin-top: 4px; display: block;">${recommendation}</small>
                `;
                result.style.display = 'block';
            }
        }

        function calculateHeartRate() {
            const age = document.getElementById('age-hr').value;
            const fitness = document.getElementById('fitness-level').value;
            const result = document.getElementById('hr-result');

            if (age) {
                const maxHR = 220 - parseInt(age);
                let modifier = 1;

                switch (fitness) {
                    case 'beginner': modifier = 0.9; break;
                    case 'intermediate': modifier = 1.0; break;
                    case 'advanced': modifier = 1.1; break;
                    case 'athlete': modifier = 1.15; break;
                }

                const fatBurn = Math.round((maxHR * 0.5) * modifier);
                const cardio = Math.round((maxHR * 0.7) * modifier);
                const peak = Math.round((maxHR * 0.85) * modifier);

                result.innerHTML = `
                    <strong>Heart Rate Zones:</strong><br>
                    <small>Fat Burn: ${fatBurn - 10}-${fatBurn} bpm</small><br>
                    <small>Cardio: ${cardio - 10}-${cardio} bpm</small><br>
                    <small>Peak: ${peak - 15}-${peak} bpm</small><br>
                    <small style="color: var(--secondary-green);">Max HR: ${maxHR} bpm</small>
                `;
                result.style.display = 'block';
            }
        }

        function calculateCalories() {
            const gender = document.getElementById('gender').value;
            const age = document.getElementById('age-cal').value;
            const activity = parseFloat(document.getElementById('activity').value);
            const height = document.getElementById('height').value || 170;
            const weight = document.getElementById('weight').value || 70;
            const result = document.getElementById('calorie-result');

            if (age) {
                let bmr;
                if (gender === 'male') {
                    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                } else {
                    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                }

                const tdee = Math.round(bmr * activity);
                const weightLoss = Math.round(tdee - 500);
                const weightGain = Math.round(tdee + 300);

                result.innerHTML = `
                    <strong>Daily Calorie Needs:</strong><br>
                    <small>Maintenance: ${tdee} calories</small><br>
                    <small>Weight Loss: ${weightLoss} calories</small><br>
                    <small>Weight Gain: ${weightGain} calories</small><br>
                    <small style="color: var(--secondary-green);">BMR: ${Math.round(bmr)} calories</small>
                `;
                result.style.display = 'block';
            }
        }

        function calculateWater() {
            const weight = document.getElementById('weight-water').value;
            const climate = document.getElementById('climate').value;
            const exercise = document.getElementById('exercise-mins').value || 0;
            const result = document.getElementById('water-result');

            if (weight) {
                let baseWater = weight * 35; // ml per kg
                let climateMultiplier = 1;

                switch (climate) {
                    case 'hot': climateMultiplier = 1.3; break;
                    case 'dry': climateMultiplier = 1.2; break;
                    case 'cold': climateMultiplier = 0.9; break;
                }

                const exerciseWater = exercise * 12; // 12ml per minute of exercise
                const totalWater = Math.round((baseWater * climateMultiplier) + exerciseWater);
                const glasses = Math.round(totalWater / 250);

                result.innerHTML = `
                    <strong>Daily Water Intake:</strong><br>
                    <small>${totalWater}ml (${(totalWater / 1000).toFixed(1)} liters)</small><br>
                    <small>≈ ${glasses} glasses (250ml each)</small><br>
                    <small style="color: var(--secondary-green);">Set reminders every 2 hours</small>
                `;
                result.style.display = 'block';
            }
        }

        function calculateSleep() {
            const wakeTime = document.getElementById('wake-time').value;
            const sleepHours = parseFloat(document.getElementById('sleep-hours').value);
            const result = document.getElementById('sleep-result');

            if (wakeTime) {
                const wake = new Date(`2024-01-01T${wakeTime}`);
                const bedtime = new Date(wake.getTime() - (sleepHours * 60 * 60 * 1000));
                const fallAsleep = new Date(bedtime.getTime() - (15 * 60 * 1000)); // 15 min to fall asleep

                const bedtimeStr = bedtime.toTimeString().slice(0, 5);
                const fallAsleepStr = fallAsleep.toTimeString().slice(0, 5);

                result.innerHTML = `
                    <strong>Optimal Sleep Schedule:</strong><br>
                    <small>Bedtime: ${bedtimeStr}</small><br>
                    <small>Lights out: ${fallAsleepStr}</small><br>
                    <small>Wake up: ${wakeTime}</small><br>
                    <small style="color: var(--secondary-green);">Total sleep: ${sleepHours} hours</small>
                `;
                result.style.display = 'block';
            }
        }

        function calculateStress() {
            const sleep = parseInt(document.getElementById('sleep-quality').value);
            const work = parseInt(document.getElementById('work-stress').value);
            const energy = parseInt(document.getElementById('energy-level').value);
            const result = document.getElementById('stress-result');

            const stressScore = Math.round(((work * 2) + (6 - sleep) + (6 - energy)) / 4 * 20);
            let level = '';
            let color = '';
            let recommendation = '';

            if (stressScore <= 30) {
                level = 'Low Stress';
                color = '#10b981';
                recommendation = 'Great! Keep maintaining your healthy lifestyle.';
            } else if (stressScore <= 60) {
                level = 'Moderate Stress';
                color = '#f59e0b';
                recommendation = 'Consider stress management techniques like meditation or yoga.';
            } else {
                level = 'High Stress';
                color = '#ef4444';
                recommendation = 'We recommend speaking with our mental health counselors.';
            }

            result.innerHTML = `
                <strong style="color: ${color};">Stress Level: ${stressScore}% (${level})</strong><br>
                <small style="margin-top: 4px; display: block;">${recommendation}</small>
            `;
            result.style.display = 'block';
        }

        // Form Management
        function openForm(formId) {
            document.getElementById(formId + '-modal').style.display = 'flex';
        }

        function closeForm(formId) {
            document.getElementById(formId + '-modal').style.display = 'none';
        }



        // Form submission handlers
        document.addEventListener('DOMContentLoaded', function () {
            // Add form submission handlers
            const forms = ['symptom-form', 'risk-form', 'consultation-form', 'login-form', 'register-form', 'corporate-form', 'test-form'];

            forms.forEach(formId => {
                const form = document.getElementById(formId);
                if (form) {
                    form.addEventListener('submit', function (e) {
                        e.preventDefault();
                        alert('Form submitted successfully! We will contact you soon.');
                        // Close the modal
                        const modalId = formId.replace('-form', '');
                        closeForm(modalId);
                    });
                }
            });


            // Close modals when clicking outside
            document.querySelectorAll('.form-modal').forEach(modal => {
                modal.addEventListener('click', function (e) {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            });
        });

        // Voice functionality placeholder
        function startVoiceInput() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onresult = function (event) {
                    const transcript = event.results[0][0].transcript;
                    document.getElementById('chat-input').value = transcript;
                };

                recognition.start();
            } else {
                alert('Voice recognition not supported in your browser.');
            }
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add animation to elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer1 = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // Observe all tool cards and sections
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.tool-card, .ai-tool-card, .section').forEach(el => {
                observer1.observe(el);
            });
        });

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
