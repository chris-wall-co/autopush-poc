export class Poller {
    constructor(currentVersion, onVersionChanged, interval = 15) {
        this._current = currentVersion;
        this._pid = null;
        this._interval = (interval * 1000);
        this._notify = onVersionChanged;
        this._poll = async () => {

        }
    }

    async start() {
        console.log(`[Poller::start] watching version "${this._current}"`);

        if (this._pid !== null) {
            throw new Error('Poller is already running');
        }

        this._pid = setInterval(async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/version.json`);
            if (response.ok) {
                const vers = await response.json();
                if (vers.version !== this._current) {
                    console.log(`[Poller::start] versions out of sync. "${vers.version}" !== "${this._current}"`);

                    this._notify();
                    this.stop();
                }
            }
        }, this._interval);
    }

    stop() {
        console.log('[Poller::stop] stopping poller');
        
        if (this._pid !== null) {
            clearInterval(this._pid);
            this._pid = null;
        }
    }
}