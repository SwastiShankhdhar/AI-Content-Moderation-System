
// import React from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//     const navigate = useNavigate();

//     return (
//         <div className="home-container">
//             <h1>AI Content Moderation System</h1>
//             <p>
//                 Our system uses AI to detect and remove inappropriate, harmful, or copyrighted content 
//                 from your platform in real-time.
//             </p>

//             <div className="card">
//                 <h3>Ready to Moderate?</h3>
//                 <p>Navigate to the moderation panel to start moderating content.</p>
//                 <button onClick={() => navigate('/moderate')}>Go to Moderation</button>
//             </div>

//             <div className="card">
//                 <h3>View Reports</h3>
//                 <p>Check out flagged content reports and take necessary actions.</p>
//                 <button onClick={() => navigate('/reports')}>View Reports</button>
//             </div>
//         </div>
//     );
// }

//  export default Home;

/*import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="header">
                <h1 className="title">AI Content Moderation System</h1>
                <p className="subtitle">
                    Our system uses AI to detect and remove inappropriate, harmful, or copyrighted content 
                    from your platform in real-time.
                </p>
            </header>

            <section className="section">
                <div className="card" onClick={() => navigate('/moderate')}>
                    <h3>Ready to Moderate?</h3>
                    <p>Navigate to the moderation panel to start moderating content.</p>
                </div>

                <div className="card" onClick={() => navigate('/reports')}>
                    <h3>View Reports</h3>
                    <p>Check out flagged content reports and take necessary actions.</p>
                </div>
            </section>

            <footer className="footer">
                <p>© 2025 AI Content Moderation System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;*/


import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
    const navigate = useNavigate();

    return (
        <motion.div className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h1
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.05 }}
            >
                AI Content Moderation System
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                whileHover={{ scale: 1.05 }}
            >
                Our system uses AI to detect and remove inappropriate, harmful, or copyrighted content
                from your platform in real-time.
            </motion.p>

            <motion.div className="card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <h3>Ready to Moderate?</h3>
                <p>Navigate to the moderation panel to start moderating content.</p>
                <button onClick={() => navigate('/moderate')}>Go to Moderation</button>
            </motion.div>

            <motion.div className="card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <h3>View Reports</h3>
                <p>Check out flagged content reports and take necessary actions.</p>
                <button onClick={() => navigate('/reports')}>View Reports</button>
            </motion.div>
        </motion.div>
    );
}

export default Home;
