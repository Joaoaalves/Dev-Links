import { Regex } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        const fetchPlatforms = async () => {
            const res = await fetch('/platforms.json')
            const data = await res.json()
            setPlatforms(data)
        }

        fetchPlatforms()
    }, [])

    const getPlatformName = (platform) => {
        return platforms[platform].name
    }

    const validateUrl = (platform, url) => {
        const regex = new RegExp(platforms[platform].regex)
        console.log(platforms[platform].regex)
        return regex.test(url)
    }

    return (
        <PlatformContext.Provider value={{ platforms, getPlatformName, validateUrl }}>
            {children}
        </PlatformContext.Provider>
    );
};

export const usePlatforms = () => useContext(PlatformContext);