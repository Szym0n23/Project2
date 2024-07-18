document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const workoutDataDiv = document.getElementById('workout-data');
    const dataDisplay = document.getElementById('data-display');
    const disconnectButton = document.getElementById('disconnect');
    const planDiv = document.getElementById('personalized-plan');
    const planDisplay = document.getElementById('plan-display');
    const historyDiv = document.getElementById('history');
    const historyDisplay = document.getElementById('history-display');
    const notificationsDiv = document.getElementById('notifications');
    const notificationsDisplay = document.getElementById('notifications-display');
    const addWorkoutForm = document.getElementById('add-workout-form');
    const addPlanForm = document.getElementById('add-plan-form');
    const addNotificationForm = document.getElementById('add-notification-form');

    let workoutHistory = [];
    let plans = [];
    let notifications = [];

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginUser();
    });

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        registerUser();
    });

    addWorkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addWorkoutData();
    });

    addPlanForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addPlan();
    });

    addNotificationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addNotification();
    });

    disconnectButton.addEventListener('click', function () {
        logoutUser();
    });

    async function loginUser() {
        alert('Logowanie udane');
        await connectToDevice();
        showWorkoutData();
        showPersonalizedPlan();
        showHistory();
        getNotifications();
    }

    async function registerUser() {
        alert('Rejestracja udana');
        await connectToDevice();
        showWorkoutData();
        showPersonalizedPlan();
        showHistory();
        getNotifications();
    }

    async function connectToDevice() {
        const status = await DeviceSimulator.connect();
        alert(status);
    }

    async function getWorkoutData() {
        const data = await DeviceSimulator.getWorkoutData();
        const exampleData = `
            <p>Czas treningu: ${data.time}</p>
            <p>Liczba powtorzen: ${data.repetitions}</p>
            <p>Spalone kalorie: ${data.calories}</p>
            <p>Tetno: ${data.heartRate}</p>
        `;
        dataDisplay.innerHTML = exampleData;
    }

    async function getPersonalizedPlan() {
        const data = await DeviceSimulator.getPersonalizedPlan();
        planDisplay.innerHTML = `<p>${data.plan}</p>`;
    }

    async function getHistory() {
        const history = await DeviceSimulator.getHistory();
        workoutHistory = history;
        historyDisplay.innerHTML = workoutHistory.map(item => `
            <p>Data: ${item.date}, Czas: ${item.time}, Kalorie: ${item.calories}</p>
        `).join('');
    }

    async function getNotifications() {
        const notifications = await DeviceSimulator.getNotifications();
        notificationsDisplay.innerHTML = notifications.map(item => `
            <p>${item.message}</p>
        `).join('');
    }

    async function logoutUser() {
        const status = await DeviceSimulator.disconnect();
        alert(status);
        hideAllData();
    }

    function showWorkoutData() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        workoutDataDiv.style.display = 'block';
        getWorkoutData();
    }

    function showPersonalizedPlan() {
        planDiv.style.display = 'block';
        getPersonalizedPlan();
    }

    function showHistory() {
        historyDiv.style.display = 'block';
        getHistory();
    }

    function showNotifications() {
        notificationsDiv.style.display = 'block';
        getNotifications();
    }

    function hideAllData() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'block';
        workoutDataDiv.style.display = 'none';
        planDiv.style.display = 'none';
        historyDiv.style.display = 'none';
        notificationsDiv.style.display = 'none';
        dataDisplay.innerHTML = '';
        planDisplay.innerHTML = '';
        historyDisplay.innerHTML = '';
        notificationsDisplay.innerHTML = '';
    }

    function addWorkoutData() {
        const time = document.getElementById('workout-time').value.trim();
        const repetitions = document.getElementById('workout-repetitions').value.trim();
        const calories = document.getElementById('workout-calories').value.trim();
        const heartRate = document.getElementById('workout-heartRate').value.trim();

        if (time && repetitions && calories && heartRate) {
            const newWorkout = {
                date: new Date().toISOString().slice(0, 10),
                time: time,
                repetitions: repetitions,
                calories: calories,
                heartRate: heartRate
            };

            workoutHistory.push(newWorkout);
            alert('Dane treningowe zostaly dodane');
            addWorkoutForm.reset();
            getHistory();
        } else {
            alert('Proszê wype³nic wszystkie pola.');
        }
    }

    function addPlan() {
        const planContent = document.getElementById('plan-content').value.trim();

        if (planContent) {
            plans.push(planContent);
            alert('Plan treningowy zostal dodany');
            addPlanForm.reset();
            showPersonalizedPlan();
        } else {
            alert('Proszê wype³niæ pole z planem treningowym.');
        }
    }

    function addNotification() {
        const notificationContent = document.getElementById('notification-content').value.trim();

        if (notificationContent) {
            notifications.push({ message: notificationContent });
            alert('Powiadomienie zosta³o dodane');
            addNotificationForm.reset();
            getNotifications();
        } else {
            alert('Proszê wpisaæ treœæ powiadomienia.');
        }
    }
});
