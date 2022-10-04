const timeout1 = () => {
    let _reject;
    let timeout;
	const promise = new Promise((resolve, reject) => {
        _reject = reject;
        console.log('timeout 1 runs');
		timeout = setTimeout(() => {
            console.log('timeout 1 has completed');
			resolve({
			code: 200,
                response: {
                    followupEventInput: {
                        name: 'quicker',
                        languageCode: 'en-US',
                        parameters: {
                            timeoutBufferTextResponse: `<speak>failed</speak>`,
                        },
                    },
                    outputContexts: []
                },
			});
		}, 500);
	});

    return {
        promise,
        cancel() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
                _reject();
                _reject = null;
            }
        }
    }
}

const timeout2 = () => {
    let _reject;
    let timeout;
    const promise = new Promise((resolve, reject) => {
        _reject = reject;
        console.log('timeout 2 runs');
		timeout = setTimeout(() => {
            console.log('timeout 2 has completed');
			resolve({
			code: 200,
                response: {
                    followupEventInput: {
                        name: 'timeout-buffer',
                        languageCode: 'en-US',
                        parameters: {
                            timeoutBufferTextResponse: `<speak>failed</speak>`,
                        },
                    },
                    outputContexts: []
                },
			});
		}, 5000);
	});
    return {
        promise,
        cancel() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
                _reject();
                _reject = null;
            }
        }
    }
}

const promise1 = timeout1();
const promise2 = timeout2();

// race promises.
Promise.race([
    promise1.promise, promise2.promise
])
    .then(resp => {
        // do what you want with the response.
        console.log(resp)
        // cancel the promises after set timeout period.
        setTimeout(() => {
            promise1.cancel();
            promise2.cancel();
        }, 3000)
    })