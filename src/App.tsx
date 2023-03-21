import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import theme from './styles/theme';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { useAppSelector } from './store/hooks';
import NotFound from './pages/NotFound/NotFound';
import React from 'react';
import Student from './pages/Student/Student';
import RoleProtectedRoute from './components/RoleProtectedRoute/RoleProtectedRoute';
import PublicOnlyRoute from './components/PrivateRoute/PublicOnlyRoute';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import RoleViewSwitch from './components/RoleSpecificRoute/RoleViewSwitch';
import Teacher from './pages/Teacher/Teacher';

function App() {
    // False when the app has done all necessary processing before painting a route to the user.
    const isInitialising = useAppSelector((state) => state.init.init);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                {isInitialising ? (
                    <Flex
                        w='100vw'
                        h='100vh'
                    >
                        <Spinner />
                    </Flex>
                ) : (
                    <Routes>
                        <Route
                            path='/'
                            element={<Layout />}
                        >
                            <Route
                                path='accueil'
                                element={
                                    <RoleViewSwitch
                                        views={[
                                            {
                                                role: 'ROLE_ELEVE',
                                                view: <Student />,
                                            },
                                            {
                                                role: 'ROLE_FORMATEUR',
                                                view: <Teacher />,
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path='/accueil/student'
                                element={
                                    <RoleProtectedRoute
                                        allowedRoles={['ROLE_FORMATEUR']}
                                        component={<Student />}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path='/login'
                            element={<PublicOnlyRoute component={<Login />} />}
                        />
                        <Route
                            path='*'
                            element={<NotFound />}
                        />
                    </Routes>
                )}
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
