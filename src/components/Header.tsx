"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery, contact } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

// Timezone to location mapping for better location display
// NOTE: This implementation uses 'tz-lookup' and 'city-timezones' for dynamic timezone and location lookup.
// Install with: npm install tz-lookup city-timezones

import tzLookup from "tz-lookup";
import * as cityTimezones from "city-timezones";

type LocationInfo = { city: string; state: string; country: string };

// Finds location info dynamically from coordinates or timezone string
const getLocationFromTimezone = async (
  timeZone: string,
  locale: string
): Promise<LocationInfo> => {
  // Try to get user's geolocation if available (browser)
  let lat: number | undefined;
  let lng: number | undefined;
  if (typeof window !== "undefined" && navigator.geolocation) {
    try {
      const position: GeolocationPosition = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 })
      );
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    } catch {
      // Fallback to timezone string lookup
    }
  }

  let location: LocationInfo = { city: "", state: "", country: "" };

  // If we have coordinates, determine timezone and then location
  if (lat !== undefined && lng !== undefined) {
    // Try to find timezone name from lat/lng
    try {
      const userTz = tzLookup(lat, lng);
      // Filter city-timezone data by timezone
      const cityMatches = cityTimezones.cityMapping.filter((city) => city.timezone === userTz);
      if (cityMatches && cityMatches.length > 0) {
        // Use the city with highest population (most likely the main city)
        const cityObj = cityMatches.reduce((prev, current) => 
          (prev.pop > current.pop) ? prev : current
        );

        async function reverseGeocode(lat: number, lon: number): Promise<LocationInfo> {
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
            const res = await fetch(url, {
              headers: { 'User-Agent': 'YourAppName/1.0' }
            });
            const data = await res.json();
            console.log(data);  
            return {
              city: data.address?.state_district || "",
              state: data.address?.state || "",
              country: data.address?.country || "",
            };
          } catch {
            return {
              city: "",
              state: "",
              country: "",
            };
          }
        }

        // If coordinates are available, do dynamic reverse geocoding
        if (lat !== undefined && lng !== undefined) {
          // Await here because this function is already async
          return await reverseGeocode(lat, lng);
        }
        location = {
          city: cityObj.city || cityObj.exactCity || "",
          state: cityObj.province || cityObj.exactProvince || "",
          country: cityObj.country || "",
        };
        return location;
      }
    } catch {
      // Fallback below
    }
  }

  // Fallback: Use city-timezones with the provided timeZone string
  try {
    const cityMatches = cityTimezones.cityMapping.filter((city) => city.timezone === timeZone);
    if (cityMatches && cityMatches.length > 0) {
      // Use the city with highest population (most likely the main city)
      const cityObj = cityMatches.reduce((prev, current) => 
        (prev.pop > current.pop) ? prev : current
      );
      location = {
        city: cityObj.city || cityObj.exactCity || "",
        state: cityObj.province || cityObj.exactProvince || "",
        country: cityObj.country || "",
      };
      return location;
    }
  } catch {
    // Fallback below
  }

  const parts = timeZone.split("/");
  const formattedCity =
    parts[parts.length - 1]?.replace(/_/g, " ") || timeZone;

  const localeParts = locale.split("-");
  const countryCode = localeParts[localeParts.length - 1];
  let country = countryCode;
  try {
    const regionNames = new Intl.DisplayNames([locale], { type: "region" });
    country = regionNames.of(countryCode) || countryCode;
  } catch {
    // fallback
  }

  return {
    city: formattedCity,
    state: formattedCity,
    country: country,
  };
};

// Detect if locale prefers 12-hour or 24-hour format
const detectHourFormat = (locale: string): boolean => {
  // Countries that typically use 12-hour format
  const twelveHourLocales = ['en-US', 'en-CA', 'es-ES', 'hi-IN', 'en-IN', 'ta-IN'];
  
  // Check if locale prefers 12-hour format
  if (twelveHourLocales.includes(locale)) {
    return true;
  }
  
  // Test with actual formatting
  try {
    const testDate = new Date();
    const formatted = testDate.toLocaleTimeString(locale, { hour: 'numeric' });
    // If it contains AM/PM indicators, it's 12-hour format
    return /[ap]m/i.test(formatted);
  } catch {
    // Default to 24-hour for most locales
    return false;
  }
};

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
  hour12?: boolean;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale, hour12 }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: hour12 !== undefined ? hour12 : false,
      };
      let timeString: string;
      try {
        timeString = new Intl.DateTimeFormat(locale, options).format(now);
      } catch (e) {
        // Fallback: Use system time as ISO string if timezone is invalid
        timeString = now.toLocaleTimeString(locale || 'en-US', { 
          hour12: hour12 !== undefined ? hour12 : false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale, hour12]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

// Component to get and display user's location dynamically
const LocationDisplay: React.FC = () => {
  const [location, setLocation] = useState<string>(person.location);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        // Get user's timezone and locale
        const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
        const timeZone = resolvedOptions.timeZone;
        const locale = resolvedOptions.locale;
        
        // Try geolocation API first (requires user permission)
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                  enableHighAccuracy: false,
                  timeout: 5000,
                  maximumAge: 300000, // Cache for 5 minutes
                }
              );
            });

            // Get location using coordinates via tz-lookup and city-timezones
            const locationInfo = await getLocationFromTimezone(timeZone, locale);
            
            // Format location as "City, State, Country" or "City, Country" if no state
            let formattedLocation = "";
            if (locationInfo.state) {
              formattedLocation = `${locationInfo.city}, ${locationInfo.state}, ${locationInfo.country}`;
            } else {
              formattedLocation = `${locationInfo.city}, ${locationInfo.country}`;
            }
            
            if (formattedLocation.trim()) {
              setLocation(formattedLocation);
              return;
            }
          } catch (geoError) {
            // Fall through to timezone-only lookup
          }
        }

        // Fallback: Use timezone-based location lookup
        const locationInfo = await getLocationFromTimezone(timeZone, locale);
        
        // Format location as "City, State, Country" or "City, Country" if no state
        let formattedLocation = "";
        if (locationInfo.state) {
          formattedLocation = `${locationInfo.city}, ${locationInfo.state}, ${locationInfo.country}`;
        } else {
          formattedLocation = `${locationInfo.city}, ${locationInfo.country}`;
        }
        
        if (formattedLocation.trim()) {
          setLocation(formattedLocation);
        }
      } catch (error) {
        // Keep the default person.location if all fails
        console.error("Error loading location:", error);
      }
    };

    loadLocation();
  }, []);

  return <>{location}</>;
};

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [userTimeZone, setUserTimeZone] = useState<string>("");
  const [userLocale, setUserLocale] = useState<string>("");
  const [use12Hour, setUse12Hour] = useState<boolean>(false);

  useEffect(() => {
    // Get user's timezone and locale dynamically
    try {
      const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
      const timeZone = resolvedOptions.timeZone;
      const locale = resolvedOptions.locale;
      
      setUserTimeZone(timeZone);
      setUserLocale(locale);
      
      // Detect hour format preference based on locale
      const hour12Format = detectHourFormat(locale);
      setUse12Hour(hour12Format);
    } catch (error) {
      // Fallback values
      setUserTimeZone("Asia/Kolkata");
      setUserLocale("en-IN");
      setUse12Hour(true); // India typically uses 12-hour format
    }
  }, []);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && (
            <Row s={{ hide: true }}>
              <LocationDisplay />
            </Row>
          )}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </Row>
                </>
              )}
              {routes["/contact"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="email"
                      href="/contact"
                      label={contact.label}
                      selected={pathname.startsWith("/contact")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="email"
                      href="/contact"
                      selected={pathname.startsWith("/contact")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && userTimeZone && (
                <TimeDisplay 
                  timeZone={userTimeZone} 
                  locale={userLocale || "en-US"}
                  hour12={use12Hour}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
