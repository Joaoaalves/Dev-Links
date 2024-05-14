import React, { createContext, useContext, useEffect, useState } from "react";

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const res = await fetch("/api/platforms");
      const data = await res.json();
      setPlatforms(data.platforms);
    };

    fetchPlatforms();
  }, []);

  const validateUrl = (platformId, url) => {
    const platform = getPlatform(platformId);
    const regex = new RegExp(platform.regex);
    return regex.test(url);
  };

  const getPlatform = (platformId) => {
    return platforms.find((platform) => platform._id === platformId);
  };

  return (
    <PlatformContext.Provider value={{ platforms, getPlatform, validateUrl }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatforms = () => useContext(PlatformContext);
