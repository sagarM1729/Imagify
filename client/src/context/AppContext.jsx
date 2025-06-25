import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [credit, setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Load user from localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem('imagify_token');
        const userData = localStorage.getItem('imagify_user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
            getUserCredits(token);
        }
    }, []);

    // API function to register user
    const registerUser = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store token and user data
                localStorage.setItem('imagify_token', data.token);
                localStorage.setItem('imagify_user', JSON.stringify(data.user));
                
                setUser(data.user);
                setCredit(data.user.credits);
                setShowLogin(false);
                
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // API function to login user
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store token and user data
                localStorage.setItem('imagify_token', data.token);
                localStorage.setItem('imagify_user', JSON.stringify(data.user));
                
                setUser(data.user);
                setCredit(data.user.credits);
                setShowLogin(false);
                
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }        } catch (error) {
            console.error('Login error:', error);
            console.error('Backend URL:', backendUrl);
            console.error('Full error details:', error.message);
            return { success: false, message: `Connection failed. Make sure server is running on ${backendUrl}` };
        } finally {
            setLoading(false);
        }
    };

    // API function to get user credits
    const getUserCredits = async (token = null) => {
        try {
            const authToken = token || localStorage.getItem('imagify_token');
            if (!authToken) return;

            const response = await fetch(`${backendUrl}/api/user/credits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                setCredit(data.user.credits);
                setUser(data.user);
                // Update localStorage with latest user data
                localStorage.setItem('imagify_user', JSON.stringify(data.user));
            }
        } catch (error) {
            console.error('Error fetching credits:', error);
        }
    };    // API function to generate image
    const generateImage = async (prompt, size = "1024x1024") => {
        try {
            setLoading(true);
            const token = localStorage.getItem('imagify_token');
            
            if (!token || !user) {
                setShowLogin(true);
                return { success: false, message: 'Please login first' };
            }

            const response = await fetch(`${backendUrl}/api/image/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                    prompt,
                    size,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update credits after successful generation
                setCredit(data.remainingCredits);
                
                // Update user data in localStorage
                const updatedUser = { ...user, credits: data.remainingCredits };
                setUser(updatedUser);
                localStorage.setItem('imagify_user', JSON.stringify(updatedUser));
                
                return {
                    success: true,
                    imageUrl: data.imageUrl,
                    creditsUsed: data.creditsUsed,
                    remainingCredits: data.remainingCredits,
                };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Image generation error:', error);
            return { success: false, message: 'Failed to generate image. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // API function to get credit plans
    const getCreditPlans = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/payment/plans`);
            const data = await response.json();
            
            if (data.success) {
                return { success: true, plans: data.plans };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error fetching credit plans:', error);
            return { success: false, message: 'Failed to fetch credit plans' };
        }
    };

    // API function to purchase credits with Razorpay
    const purchaseCredits = async (planId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('imagify_token');
            
            if (!token || !user) {
                setShowLogin(true);
                return { success: false, message: 'Please login first' };
            }

            // Create Razorpay order
            const orderResponse = await fetch(`${backendUrl}/api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ planId }),
            });

            const orderData = await orderResponse.json();

            if (!orderData.success) {
                return { success: false, message: orderData.message };
            }            // Initialize Razorpay payment
            return new Promise((resolve) => {
                const options = {
                    key: orderData.razorpayKeyId,
                    amount: orderData.order.amount,
                    currency: orderData.order.currency,
                    name: "Imagify",
                    description: `Purchase ${orderData.planDetails.credits} credits - ${orderData.planDetails.planId} plan`,
                    order_id: orderData.order.id,                    handler: async (response) => {
                        console.log('💳 Processing real Razorpay payment');
                        
                        // Payment successful, verify it
                        const verifyResult = await verifyPayment(response);
                        resolve(verifyResult);
                    },
                    modal: {
                        ondismiss: () => {
                            resolve({ success: false, message: 'Payment cancelled by user' });
                        }
                    },
                    theme: {
                        color: "#3399cc"
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                    }
                };                if (window.Razorpay) {
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                } else {
                    resolve({ success: false, message: 'Razorpay not loaded. Please refresh the page.' });
                }
            });

        } catch (error) {
            console.error('Purchase error:', error);
            return { success: false, message: 'Failed to initiate payment. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // API function to verify payment
    const verifyPayment = async (paymentData) => {
        try {
            const token = localStorage.getItem('imagify_token');
            
            const response = await fetch(`${backendUrl}/api/payment/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            if (result.success) {
                // Update credits in state
                setCredit(result.user.credits);
                
                // Update user data
                const updatedUser = { ...user, credits: result.user.credits };
                setUser(updatedUser);
                localStorage.setItem('imagify_user', JSON.stringify(updatedUser));
                
                return { 
                    success: true, 
                    message: `Payment successful! ${result.transaction.creditsAdded} credits added to your account.`,
                    creditsAdded: result.transaction.creditsAdded,
                    newBalance: result.user.credits
                };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Verification error:', error);
            return { success: false, message: 'Payment verification failed. Please contact support.' };
        }
    };

    // API function to get transaction history
    const getTransactionHistory = async (limit = 10, skip = 0) => {
        try {
            const token = localStorage.getItem('imagify_token');
            
            if (!token) {
                return { success: false, message: 'Please login first' };
            }

            const response = await fetch(`${backendUrl}/api/payment/history?limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            
            if (data.success) {
                return { 
                    success: true, 
                    transactions: data.transactions,
                    pagination: data.pagination 
                };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error fetching transaction history:', error);
            return { success: false, message: 'Failed to fetch transaction history' };
        }
    };

    const login = (userData) => {
        setUser(userData);
        setShowLogin(false);
    };

    const logout = () => {
        setUser(null);
        setCredit(0);
        localStorage.removeItem('imagify_token');
        localStorage.removeItem('imagify_user');
    };

    const openLogin = () => {
        setShowLogin(true);
    };

    const closeLogin = () => {
        setShowLogin(false);
    };    const value = {
        user, 
        setUser,
        showLogin,
        setShowLogin,
        loading,
        setLoading,
        credit,
        setCredit,
        backendUrl,
        login,
        logout,
        openLogin,
        closeLogin,
        registerUser,
        loginUser,
        getUserCredits,
        generateImage,
        getCreditPlans,
        purchaseCredits,
        verifyPayment,
        getTransactionHistory,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;