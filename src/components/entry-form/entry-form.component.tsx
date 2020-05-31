import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

type EntryFormProps = {
    value: string,
    isInputDisabled: boolean,
    isButtonDisabled: boolean,
    onSubmitHandler: (event: React.FormEvent) => void,
    onValueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const EntryForm: FunctionComponent<EntryFormProps> = ({ isInputDisabled, isButtonDisabled, onSubmitHandler, onValueChangeHandler, value }) => (
    <Form>
        <h4>Want to try your luck? <span role="img" aria-label="ether to enter">💸</span></h4>
        <Row>
            <Col xs={4}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Amount of ether to enter"
                        aria-label="Amount of ether to enter"
                        aria-describedby="ether-entry"
                        value={value}
                        disabled={isInputDisabled}
                        onChange={onValueChangeHandler}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="ether-entry">ether</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
            <Col xs={2}>
                <Button
                    variant="outline-primary"
                    disabled={isButtonDisabled}
                    onClick={onSubmitHandler}
                >Enter</Button>
            </Col>
        </Row>
    </Form>
);