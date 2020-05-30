import React, { FunctionComponent } from "react";
import Modal from 'react-bootstrap/Modal';
import { isNullOrUndefined } from "util";

type ErrorModalProps = {
    shouldShow: boolean,
    title: string,
    onCloseHandler?: Function,
    onRetryClickedHandler?: Function,
};

export const ErrorModal: FunctionComponent<ErrorModalProps> = ({ shouldShow, title, onCloseHandler }) => (
    <Modal show={shouldShow}>
        <Modal.Header closeButton={!isNullOrUndefined(onCloseHandler)}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
    </Modal>
);