import React, { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children, userId: propUserId }) => {
  const [userId, setUserId] = useState("userId",propUserId || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState([]);
  const [image, setImage] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveLinks = async () => {
    try {
      await User.findOneAndUpdate({ email }, { links }, { new: true });
    } catch (error) {
      console.error("Error saving links:", error);
    }
  };

  const getUserInfoFromDB = async () => {
    try {
      setIsLoading(true)
      
      const endpoint = userId ? `/api/user?user_id=${userId}` : "/api/profile";
      
      const res = await fetch(endpoint);

      if (!res.ok) {
        setError("Failed to fetch user profile.");
        throw new Error(`Failed to fetch user profile: ${res.statusText}`);
      }

      const data = await res.json();

      if (!data.user) {
        setError("User data is not available");
        throw new Error("User data is not available");
      }

      const user = data.user;
      setUserId(user._id || "");
      setLinks(user.links || []);
      setEmail(user.email || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setImage(user.image || "");
      setCustomUrl(user.customUrl || "")
      setColor(user.color || "")
      setError("");
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError("Failed to fetch user profile. Please check the user ID.");
    }
  };

  useEffect(() => {
      getUserInfoFromDB();
  }, [userId]);

  const validateCustomUrl = (customUrl) => {
    const validPattern = /^[a-zA-Z0-9-_]+$/;
    
    if (!validPattern.test(customUrl)) {
      return false;
    }
    
    try {
      const url = new URL(customUrl);
      return false;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    if (!validateCustomUrl(customUrl)) {
      return setError("Custom URL must only contain letters, numbers, hyphens, or underscores.");
    }
    
    setError("");
  }, [customUrl]);
  

  const addLink = () => {
    setLinks((oldLinks) => [
      ...oldLinks,
      {
        _id: generateId(),
        platform: "",
        url: "",
      },
    ]);
  };

  const handleLinkChange = (id, fieldName, value) => {
    setLinks((oldLinks) =>
      oldLinks.map((link) => {
        if (link._id === id) {
          return {
            ...link,
            [fieldName]: value,
          };
        }
        return link;
      }),
    );
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
    setLinks((oldLinks) => oldLinks.filter((link) => link._id !== id));
  };

  const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const updateInfo = async (data) => {
    return await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data
      }),
    })
  }

  return (
    <ProfileContext.Provider
      value={{
        userId,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        links,
        addLink,
        handleLinkChange,
        removeLink,
        image,
        setImage,
        swapLinksPosition,
        saveLinks,
        customUrl,
        setCustomUrl,
        color,
        setColor,
        error,
        setError,
        isLoading,
        updateInfo
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
