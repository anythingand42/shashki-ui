import React from 'react';

interface IUserData {
    userName?: string;
}

export interface IAuthContextState {
    authorized: boolean;
    userData: IUserData;
}

export interface IAuthContext {
    state: IAuthContextState;
    signIn(
        userName: string,
        password: string,
    ): Promise<{
        success: boolean;
        errorMessage: string | null;
    }>;
    signOut(): void;
}

const AuthContext = React.createContext<IAuthContext>({
    state: {
        authorized: false,
        userData: {},
    },
    async signIn() {
        return {
            success: false,
            errorMessage: '',
        };
    },
    signOut() {},
});

export default AuthContext;
