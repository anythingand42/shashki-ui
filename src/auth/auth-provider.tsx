import React, { useState, PropsWithChildren } from 'react';
import update from 'immutability-helper';
import AuthContext, { IAuthContext } from './auth-context';

function AuthProvider({ children }: PropsWithChildren<any>) {
    const [authContext, setAuthContext] = useState<IAuthContext>({
        state: {
            authorized: false,
            userData: {},
        },
        async signIn(userName, password) {
            if (userName === 'lalala' && password === 'lalala') {
                setAuthContext((prev: IAuthContext) =>
                    update(prev, {
                        state: {
                            authorized: { $set: true },
                            userData: { userName: { $set: 'lalala' } },
                        },
                    }),
                );
                return {
                    success: true,
                    errorMessage: null,
                };
            }

            return {
                success: false,
                errorMessage: 'Invalid username or password',
            };
        },
        signOut() {
            setAuthContext((prev: IAuthContext) =>
                update(prev, {
                    state: {
                        authorized: { $set: false },
                        userData: { $set: {} },
                    },
                }),
            );
        },
    });

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
