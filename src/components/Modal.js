import React from 'react';
import { connect } from 'react-redux';
import { createVersionChangedAction } from '../state/actions';
import { Poller } from '../state/poller';
import { stash } from '../state/stash';
import Dialog from './common/Dialog';

const ModalComponent = ({ data, version, versionChanged, onVersionChanged }) => {

    const poller = new Poller(version, onVersionChanged);

    console.log('[Modal::init] versionChanged:', versionChanged);

    const [modalOpen, setModalOpen] = React.useState(versionChanged === true);

    React.useEffect(() => {
        poller.start();
        return () => poller.stop();
    }, []);

    React.useEffect(() => {
        if (versionChanged === true) {
            console.log('[Modal::useEffect] setting modal to open and starting countdown');

            setModalOpen(true);
            poller.stop();

            setTimeout(() => {
                console.log(`[Modal::countdown] reloading in 10s`);
                stash(data);
                window.location.reload();
            }, 10000);
        }
    }, [versionChanged]);

    return (
        <Dialog open={modalOpen}>
            <h1>Application Updated</h1>
            <p>
                The application has been updated on the server.  Your browser will refresh to 
                update to the newest version.  A draft of your work has been saved so you will not lose 
                any progress.
            </p>
            <p>
                Restarting in <strong>10 seconds</strong>...
            </p>
        </Dialog>
    );
}

const mapStateToProps = state => ({
    data: state.formData,
    version: state.version,
    versionChanged: state.versionChanged,
});

const mapDispatchToProps = dispatch => ({
    onVersionChanged: () => dispatch(createVersionChangedAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
