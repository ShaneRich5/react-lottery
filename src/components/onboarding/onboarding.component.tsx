import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import metamaskLogo from './metamask.svg';
import externalLinkSvg from './external-link-alt-solid.svg';

export const Onboarding = () => (
    <Accordion defaultActiveKey="1">
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Learn how to get started
                  </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <ol>
                        <li>Create a wallet <img height={30} src={metamaskLogo} alt="MetaMask logo" /></li>
                        <ol>
                            <li>Install the <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer"> Meta Mask <img alt="external link icon" height={15} src={externalLinkSvg} /></a> Chrome extension.</li>
                            <li>Use the chrome extension to create a new account.</li>
                            <li>After creating your account select the Rinkeby Test Network.</li>
                        </ol>
                        <li>Fund your test wallet</li>
                        <ol>
                            <li>
                                Visit <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">faucet.rinkeby.io <img alt="external link icon" height={15} src={externalLinkSvg} /></a> to receive free ether on the Rinkeby test network.<br />
                                The steps below are a summarized version of the instruction on how to receive the ether.
                            </li>
                            <li>Include your ethereum account address as in a tweet or post on facebook.</li>
                            <li>Copy the link of the post and submit it to the faucet website.</li>
                        </ol>
                    </ol>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion >
);