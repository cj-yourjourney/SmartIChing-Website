// src/shared/constants/routes.js

/**
 * Application route constants
 * Central place to manage all route URLs in the application
 */

export const ROUTES = {
  HOME: '/'
}

// Helper function to check if a route is active
export const isRouteActive = (currentPath, targetPath) => {
  return currentPath === targetPath
}

// Helper function to check if route belongs to a specific section
export const isInSection = (currentPath, sectionPrefix) => {
  return currentPath.startsWith(sectionPrefix)
}

export default ROUTES
