import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const newSocket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
                withCredentials: true
            });
            setSocket(newSocket);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
