import React from 'react';
import {
    Button,
    IconButton,
} from '@material-ui/core';
import RelIcon from './RelIcon';
import { withAuthorization } from './AuthorizationProvider';
import { rels } from '../stream-store';
import { preventDefault } from '../utils';

const feedNavigation = [
    'first',
    'previous',
    'self',
    'next',
    'last',
    'metadata',
    'feed',
].map(key => rels[key]);

const feedNavigationSet = new Set(feedNavigation);

const FeedNavigationLink = ({ disabled, onClick, rel }) => (
    <IconButton
        variant={'raised'}
        disabled={disabled}
        onClick={onClick}
    >
        <RelIcon rel={rel} />
    </IconButton>);

const NavigationLink = ({ onClick, rel }) => (
    <Button
        variant={'text'}
        onClick={onClick}
    >
        <RelIcon rel={rel} />
        {rel}
    </Button>
);

const NavigationLinks = ({ onNavigate, links, authorization }) => (
    <div>
        <nav>
            {[...feedNavigation].map(rel => (
                <FeedNavigationLink
                    disabled={!links[rel]}
                    key={rel}
                    onClick={preventDefault(() => onNavigate(links[rel].href, authorization))}
                    link={links[rel]}
                    rel={rel}
                />))}
        </nav>
        <nav>
            {Object
                .keys(links)
                .filter(rel => !feedNavigationSet.has(rel))
                .map(rel => (
                    <NavigationLink
                        key={rel}
                        onClick={preventDefault(() => onNavigate(links[rel].href, authorization))}
                        link={links[rel]}
                        rel={rel}
                    >
                        {rel}
                    </NavigationLink>))}
        </nav>
    </div>);

export default withAuthorization(NavigationLinks);