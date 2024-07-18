const DeviceSimulator = {
    connect() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Device connected');
            }, 1000);
        });
    },
    getWorkoutData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    time: '45 minut',
                    repetitions: 30,
                    calories: 400,
                    heartRate: 120
                });
            }, 2000);
        });
    },
    disconnect() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Device disconnected');
            }, 1000);
        });
    },
    getPersonalizedPlan() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    plan: 'Plan: 3 dni treningu silowego, 2 dni cardio, 1 dzien odpoczynku'
                });
            }, 1000);
        });
    },
    getHistory() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { date: '2024-07-01', time: '30 minut', calories: 300 },
                    { date: '2024-06-30', time: '45 minut', calories: 450 },
                    { date: '2024-06-29', time: '40 minut', calories: 400 }
                ]);
            }, 1000);
        });
    },
    getNotifications() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { message: 'Czas na trening! Nie zapomnij siê rozgrzac.' },
                    { message: 'Gratulacje! Ukoñczy³eœ dzisiejszy plan treningowy.' }
                ]);
            }, 1000);
        });
    }
};
