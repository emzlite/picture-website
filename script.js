document.addEventListener('DOMContentLoaded', function() {
    // 1. CSS Styling Injection
    const css = `
       
      i{
      font-size:1.5rem;
      }

        #transition-module {
            position: fixed;
            z-index: 3;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
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
           position: absolute;
            top:15%;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 450px;
            width: 90%;
        }

        .major{
    border-color: #2980b9;
    padding-left: 0.5rem;
    border-radius: 5px;
    border: 1px solid black ;
    cursor: pointer;
    z-index: 200;
}
    .blos , .blas {
    outline: none;
    height:2.5rem ;
    text-align: center;
    font-size:1.6rem;
    
    width: 4rem;
    border: none;
    z-index: -100;
}
     

        .input-group {
            margin-bottom: 20px;
        }

        #phone-number {
            width: 89%;
            font-size:20px;
            padding: 12px 15px;
            border: 2px solid #ddd;
            margin:0rem 0.5rem;
            border-radius: 8px;
            letter-spacing: 1px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
            
        }

        h2 {
    font-size: 1.8 rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 2rem;
    color: #2c3e50;
    }

        #phone-number:focus {
            outline: none;
            border-color: #cdaef9;
        }

        #continue-btn {
            width: 100%;
            padding: 12px;
            background-color: #cdaef9;
            color: white;
            border: none;
            margin:1rem 0rem;
            
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
            #main-content{
          
            color: white;
            position: fixed; 
            top: 0px; 
            left: 50%; 
            transform: translateX(-50%);
            width: auto;
            max-width: 400px;
            background-color: #28a745; 
            color: white;
            padding: 15px 30px;
            border-radius: 0 0 10px 10px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: top 0.5s ease-in-out; 
             
            }
            
            .show-notification {
                top: 0;
              }

              #notification-message p {
                margin: 0;
                font-size: 16px;
                font-weight: bold;
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
            mainContent.classList.add('show-notification');
            // Wait for the fade-out transition to complete (0.5s)
            setTimeout(() => {
                transitionModule.style.display = 'none';
                mainContent.classList.remove('hidden');
                mainContent.classList.remove('show-notification');

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

//
document.getElementById('continue-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/.netlify/functions/log-ip', {
      method: 'POST'
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error logging IP:', error);
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // Select all links with the 'data-trackable' attribute
    const trackableLinks = document.querySelectorAll('[data-trackable]');

    trackableLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkId = link.id;
            const destination = link.href;

            // This is the data we will send to our logging service
            const logData = {
                clicked_element_id: linkId,
                destination_url: destination,
                timestamp: new Date().toISOString()
            };

            // Send the data to our backend function
            // The URL '/.netlify/functions/track-click' is special for Netlify
            fetch('/.netlify/functions/track-click', {
                method: 'POST',
                body: JSON.stringify(logData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Log successful:', data))
            .catch(error => console.error('Error logging click:', error));
        });
    });
});

