document.addEventListener('DOMContentLoaded', function() {
    // 1. CSS Styling Injection
    const css = `
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            color: #333;
        }

        #transition-module {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s ease-in-out;
        }

        #transition-module.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        .module-content {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 450px;
            width: 90%;
        }

        h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 25px;
        }

        .input-group {
            margin-bottom: 20px;
        }

        #phone-number {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        #phone-number:focus {
            outline: none;
            border-color: #3498db;
        }

        #continue-btn {
            width: 100%;
            padding: 12px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
        }

        #continue-btn:hover {
            background-color: #2980b9;
            transform: translateY(-1px);
        }

        #continue-btn:active {
            transform: translateY(0);
        }

        .hidden {
            display: none;
        }

        /* Added for visual feedback on invalid input */
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // 2. Event Listeners and Logic
    const continueBtn = document.getElementById('continue-btn');
    const phoneNumberInput = document.getElementById('phone-number');
    const transitionModule = document.getElementById('transition-module');
    const mainContent = document.getElementById('main-content');

    continueBtn.addEventListener('click', function() {
        const phoneNumber = phoneNumberInput.value.trim();

        if (validatePhoneNumber(phoneNumber)) {
            // Fade out the module
            transitionModule.classList.add('fade-out');

            // Wait for the fade-out transition to complete (0.5s)
            setTimeout(() => {
                transitionModule.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 500);
        } else {
            alert('Please enter a valid phone number.');
            // Add a shake effect for bad input
            phoneNumberInput.classList.add('shake');
            setTimeout(() => {
                phoneNumberInput.classList.remove('shake');
            }, 500);
        }
    });
});

function validatePhoneNumber(number) {
    // A basic regex for phone number validation
    const phoneRegex = /^\+?[\d\s-]{8,20}$/;
    return phoneRegex.test(number);
}