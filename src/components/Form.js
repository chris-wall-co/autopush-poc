import React from 'react';
import styled from 'styled-components';
import TextInput from './common/TextInput';
import Button from './common/Button';
import { createSaveFormAction, createVersionChangedAction } from '../state/actions';
import { connect } from 'react-redux';

const FormContainer = styled.article`
    display: flex;
    flex-flow: column nowrap;
    border: solid 2px ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.formBg};
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
`;

const FormFields = styled.section`
    display: flex;
    flex-flow: column nowrap;
    padding: 1.25em;
    background-color: transparent;

    & > * {
        margin-bottom: 1em; 
    }

    overflow-y: scroll;
    overflow-x: hidden;
`;

const ButtonRow = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
    padding: 1.25em;
    background-color: ${({ theme }) => theme.buttonRowBg};
`;

const FormButtons = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-content: center;

    & > * {
        margin-left: 1em;
    }
`;

const blankRequest = Object.freeze({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
});

const FormComponent = ({ data = {}, saveForm, testUpdate }) => {

    const [request, setRequest] = React.useState({
        ...blankRequest,
        ...(data || {}),
    });

    const handleChanged = (evt) => {
        const { name, value } = evt.target;
        setRequest({ ...request, [name]: value });
    };

    const handleSubmit = () => {
        if (typeof saveForm === 'function') {
            saveForm(request);
            setRequest(blankRequest)
        }
    };

    const handleCancel = () => {
        setRequest(blankRequest);
    };

    const handleBlur = (evt) => {
        saveForm(request);
    };

    const handleTestVersionChange = () => {
        if (typeof testUpdate === 'function') {
            testUpdate(`1.0.1.${(new Date()).getMilliseconds()}`);
        }
    };

    return (
        <FormContainer>
            <FormFields>
                <TextInput id="name" value={request.name} label="Full Name" onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="email" value={request.email} label="Email Address" onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="phone" value={request.phone} maxLength={15} label="Phone Number" onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="street" value={request.street} label="Street Address" onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="city" value={request.city} label="City" onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="state" value={request.state} label="State" maxLength={2} onChange={handleChanged} onBlur={handleBlur} />
                <TextInput id="zip" value={request.zip} label="Postal Code" maxLength={10} onChange={handleChanged} onBlur={handleBlur} />
            </FormFields>
            <ButtonRow>
                <Button onClick={handleTestVersionChange}>Test Version Change</Button>
                <FormButtons>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </FormButtons>
            </ButtonRow>
        </FormContainer>
    );
};

const mapStateToProps = state => ({
    data: state.formData,
});

const mapDispatchToProps = dispatch => ({
    saveForm: data => dispatch(createSaveFormAction(data)),
    testUpdate: v => dispatch(createVersionChangedAction(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
