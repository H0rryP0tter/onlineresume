export const authorizeAdmin = (req, res) => {
    const user = req.user?.email || 'authenticated user';
    const message = 'Welcome to Admin Setting Page';
    res.json({
        user,
        message,
    });
};

export const getDashboard = (req, res) => {
    res.send('Welcome to the protected dashboard!');
};
