import React, { createContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();
const ProjectContext = createContext();
const AboutContext = createContext();

const AboutProvider = ({ children }) => {
  const [members, setMembers] = useState({ management: [], techhead: [], operation: [] });
  const [aboutLoading, setAboutLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/core`, { method: 'GET' });
      const data = await response.json();
      const categorizedMembers = {
        management: data.members.filter(member => member.subPosition === 'management'),
        techhead: data.members.filter(member => member.subPosition === 'techhead'),
        operation: data.members.filter(member => member.subPosition === 'operation'),
      };
      sessionStorage.setItem('members', JSON.stringify(categorizedMembers));
      setMembers(categorizedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setAboutLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedMembers = sessionStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
      setAboutLoading(false);
    } else {
      fetchMembers();
    }
  }, [fetchMembers]);

  return (
    <AboutContext.Provider value={{ members, setMembers, aboutLoading, fetchMembers }}>
      {children}
    </AboutContext.Provider>
  );
};

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });
  const [projectLoading, setProjectLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      const categorizedProjects = {
        onGoing: data.filter(project => !project.status),
        completed: data.filter(project => project.status),
      };
      sessionStorage.setItem('projectsData', JSON.stringify(categorizedProjects));
      setProjects(categorizedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setProjectLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, projectLoading, setProjectLoading, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        setUser(null);
      } else if (response.status === 200) {
        const data = await response.json();
        setUser(data.member);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, ProjectContext, ProjectProvider, AboutContext, AboutProvider };
