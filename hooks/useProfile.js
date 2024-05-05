import React, { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [links, setLinks] = useState([]);
    const [image, setImage] = useState('');

    const addLink = () => {        
        setLinks(oldLinks => [...oldLinks, {
            id: generateId(),
            platform: "", 
            url: ""
        }]);
    };

    const handleLinkChange = (id, fieldName, value) => {
        setLinks(oldLinks => oldLinks.map(link => {
            if (link.id === id) {
                return {
                    ...link,
                    [fieldName]: value
                };
            }
            return link;
        }));
    };

    const swapLinksPosition = (source, destination) => {
        const newLinks = [...links];

        if (source !== -1 && destination !== -1) {
            const temp = newLinks[source];
            newLinks[source] = newLinks[destination];
            newLinks[destination] = temp;

            setLinks(newLinks);
        }
    };
    const removeLink = (id) => {
        setLinks(oldLinks => oldLinks.filter(link => link.id !== id));
    };

    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    return (
        <ProfileContext.Provider value={{ name, setName, email, setEmail, links, addLink, handleLinkChange, removeLink, image, setImage, swapLinksPosition }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);