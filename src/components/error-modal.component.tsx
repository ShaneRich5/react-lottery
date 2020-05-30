import React, { FunctionComponent } from "react";
import Modal from 'react-bootstrap/Modal';

type ErrorModalProps = {
    shouldShow: boolean,
    title: string,
    onCloseHandler?: Function,
};

export const ErrorModal: FunctionComponent<ErrorModalProps> = ({ shouldShow, title, onCloseHandler }) => (
    <Modal show={shouldShow}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
    </Modal>
);