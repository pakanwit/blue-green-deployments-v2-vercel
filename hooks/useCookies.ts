import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

const useCookies = () => {
  const [cookies, setCookies] = useState(() => {
    // Initialize the state with all existing cookies
    return Cookies.get();
  });

  const [isCanary, setIsCanary] = useState(false);

  useEffect(() => {
    // Check if the hostname cookie includes 'canary'
    const hostname = Cookies.get("hostname");
    setIsCanary(hostname && hostname.includes("canary"));
  }, []);

  // Get a cookie value
  const getCookie = useCallback(
    (name) => {
      // Check if the cookie exists
      if (cookies === undefined || !Cookies.get(name)) {
        return null;
      }
      // Return the cookie value if it exists
      return Cookies.get(name);
    },
    [cookies]
  );

  // Set a cookie
  const setCookie = useCallback((name, value, options = {}) => {
    Cookies.set(name, value, options);
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: value,
    }));

    // Update isCanary if setting the hostname cookie
    if (name === "hostname") {
      setIsCanary(value.includes("canary"));
    }
  }, []);

  // Remove a cookie
  const removeCookie = useCallback((name, options = {}) => {
    Cookies.remove(name, options);
    setCookies((prevCookies) => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });

    // Update isCanary if removing the hostname cookie
    if (name === "hostname") {
      setIsCanary(false);
    }
  }, []);

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    isCanary,
  };
};

export default useCookies;
