import React, { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState([]);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const saveLinks = async () => {
    try {
      await User.findOneAndUpdate({ email }, { links }, { new: true });
    } catch (error) {
      console.error("Erro ao salvar links:", error);
    }
  };

  const getUserInfoFromDB = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      const user = data.user

      setLinks(user?.links || [])
      setEmail(user?.email || '')
      setFirstName(user?.firstName || '')
      setLastName(user?.lastName || '')
      setImage(user?.image || '')
    } catch (error) {
      console.error("Erro ao buscar links do banco de dados:", error);
    }
  };

  useEffect(() => {
    getUserInfoFromDB();
  }, []);

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

  return (
    <ProfileContext.Provider
      value={{
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
        error, 
        setError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
